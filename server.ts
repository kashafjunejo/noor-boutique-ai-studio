import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK on server-side only
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Noor Boutique Catalog context for Gemini
const BOUTIQUE_CATALOG_CONTEXT = `
You are the official Senior AI Fashion Stylist at Noor Boutique in Hyderabad, Sindh, Pakistan.
Tagline: "Traditional Elegance, Modern Style. Style That Feels Like You."
Boutique Location: Shop 12, Fashion Street, Hyderabad, Sindh, Pakistan.

Current Catalog & Pricing (in PKR):
1. Casual Kurti - PKR 1,800: Breathable premium lawn cotton, pre-washed, subtle collar/neckline embroidery. Ideal for university, office, daily errands, casual get-togethers.
2. Printed Two-Piece Suit - PKR 2,800: Printed shirt and matching cambric trousers, modern floral and geometric motifs. Great for semi-formal daywear, office, afternoon tea, family lunch.
3. Embroidered Three-Piece Suit - PKR 5,500: Cotton-silk blend shirt & trousers with lightweight scalloped organza dupatta and delicate threadwork. Perfect for festive celebrations, Eid, dinners, pre-wedding events (Dholki/Mayun).
4. Festive Dress - PKR 8,500: Pure raw silk kalidar/anarkali with delicate zari, dabka, sequin handwork and embroidered chiffon/organza dupatta. Regal choice for Barat, Walima, engagement, grand festive gatherings.
5. Custom Stitching Service - PKR 1,200 (basic): Tailored to exact measurements by master stitching specialist Maryam Khan. Neckline custom cuts, straight pants, tulip shalwar, or culottes.
6. Premium Gift Packaging - PKR 350: Textured blush pink box with satin ribbon, personalized handwritten card, and wax seal.

Your job:
Give personalized, culturally nuanced, elegant, and practical outfit recommendations in Pakistani fashion context.
Recommend which Noor Boutique product or custom stitching package best aligns with their occasion, style, and budget.
Include specific styling advice:
- Primary outfit recommendation with price in PKR
- Why it matches their occasion and silhouette
- Color recommendations and fabric choice
- Dupatta draping style
- Footwear (e.g. Khussa, block heels, kolhapuris) & jewelry accessories (jhumkas, pearl studs, choker, bangles)
- Budget feasibility assessment (whether their budget fits ready-to-wear, custom stitching, or festive wear).
`;

// API endpoint for AI Fashion Recommendations
app.post('/api/fashion-advisor', async (req: Request, res: Response) => {
  try {
    const { occasion, style, budget, additionalNotes } = req.body;

    if (!occasion && !style && !budget) {
      return res.status(400).json({
        error: 'Please provide at least an occasion, preferred style, or budget.',
      });
    }

    if (!ai) {
      // Check if API key is configured
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.status(503).json({
          error: 'Gemini API key is not configured on the server. Please check your environment variables or Secrets panel.',
        });
      }
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }

    const userPrompt = `
Customer Request:
- Occasion: ${occasion || 'Not specified (general versatile wear)'}
- Preferred Style: ${style || 'Traditional Pakistani Pret'}
- Budget: ${budget || 'Flexible'}
- Additional Preferences / Color notes: ${additionalNotes || 'None'}

Please provide a personalized fashion recommendation tailored to Noor Boutique's catalog.
`;

    // Use gemini-3.5-flash and gemini-flash-lite-latest as primary models to avoid 503 high-demand spikes
    const modelsToTry = [
      'gemini-3.5-flash',
      'gemini-flash-lite-latest',
      'gemini-3.8-flash',
      'gemini-flash-latest',
    ];
    let lastError: any = null;
    let responseText: string | undefined = undefined;

    for (const modelName of modelsToTry) {
      // Allow up to 2 attempts per model for transient spikes
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
              systemInstruction: BOUTIQUE_CATALOG_CONTEXT,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  headline: {
                    type: Type.STRING,
                    description: 'Catchy, elegant title for the recommended look (e.g., "Graceful Mint Embroidered Look for Daytime Eid")',
                  },
                  recommendedProduct: {
                    type: Type.STRING,
                    description: 'The best matching Noor Boutique catalog item (Casual Kurti, Printed Two-Piece, Embroidered Three-Piece, Festive Dress, or Custom Stitching)',
                  },
                  estimatedPrice: {
                    type: Type.STRING,
                    description: 'Estimated price formatted in PKR (e.g. "PKR 5,500")',
                  },
                  fabricAndPalette: {
                    type: Type.STRING,
                    description: 'Recommended fabric type and color harmony (e.g. "Pastel Sage Green Lawn with Ivory Scalloped Embroidery")',
                  },
                  outfitDescription: {
                    type: Type.STRING,
                    description: 'Detailed description of the recommended ensemble and why it flatters the occasion',
                  },
                  dupattaStyle: {
                    type: Type.STRING,
                    description: 'How to drape the dupatta (e.g. "Single-shoulder pin with scalloped pallu draped over arm")',
                  },
                  accessoriesAndFootwear: {
                    type: Type.STRING,
                    description: 'Recommended jewelry, bag, and shoes (e.g. "Antique gold jhumkas, delicate pearls, embellished pointed khussas")',
                  },
                  budgetGuidance: {
                    type: Type.STRING,
                    description: 'How this recommendation fits their stated budget, plus any add-on options like custom stitching (PKR 1,200) or gift wrapping (PKR 350)',
                  },
                  stylistTip: {
                    type: Type.STRING,
                    description: 'A pro styling secret from Noor Boutique creative team for this specific event',
                  },
                },
                required: [
                  'headline',
                  'recommendedProduct',
                  'estimatedPrice',
                  'fabricAndPalette',
                  'outfitDescription',
                  'dupattaStyle',
                  'accessoriesAndFootwear',
                  'budgetGuidance',
                  'stylistTip',
                ],
              },
            },
          });

          if (response.text) {
            responseText = response.text;
            break;
          }
        } catch (err: any) {
          lastError = err;
          // Wait briefly before retrying or switching models
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      if (responseText) {
        break;
      }
    }

    if (!responseText) {
      throw lastError || new Error('No response received from Gemini API models.');
    }

    const parsedData = JSON.parse(responseText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini Fashion Advisor error:', error);
    let userMsg = 'Failed to generate fashion recommendation. Please try again.';
    if (error?.message) {
      if (error.message.includes('503') || error.message.includes('high demand')) {
        userMsg = 'The AI Fashion Advisor is experiencing temporary high demand. Please try again in a few moments, or chat directly with our stylist on WhatsApp.';
      } else if (error.message.includes('API key')) {
        userMsg = 'Gemini API key is not configured properly. Please check your settings.';
      } else {
        userMsg = error.message;
      }
    }
    return res.status(500).json({ error: userMsg });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Noor Boutique full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
