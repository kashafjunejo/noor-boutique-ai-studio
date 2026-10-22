import React from 'react';
import { Heart, Award, Sparkles, Users, Scissors, MessageSquare } from 'lucide-react';
import { TEAM_MEMBERS, BUSINESS_INFO } from '../data/boutiqueData';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            About Noor Boutique
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Where Tradition Meets Modern Fashion
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Welcome to Noor Boutique, your premier fashion destination in Hyderabad, Sindh. 
            We offer a carefully selected collection of elegant women&apos;s clothing, casual wear, 
            festive outfits, and beautifully embroidered designs tailored for the modern Pakistani woman.
          </p>
        </div>

        {/* Narrative & Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Goal & Philosophy</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our goal is to help every customer find an outfit that reflects their personality, 
              comfort, and style. We believe clothing should feel as comfortable as it looks graceful.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Quality Fabrics & Craft</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From everyday lawn essentials to opulent festive silks and chiffon dupattas, 
              we focus on premium pre-washed fabrics, attractive prints, and durable hand-embroidery.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Memorable Shopping</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you&apos;re shopping for yourself or selecting a thoughtful gift for a loved one, 
              Noor Boutique ensures your shopping journey is simple, enjoyable, and genuinely memorable.
            </p>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                The Artisans Behind Your Style
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Our Team
              </h3>
            </div>
            <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 inline-block self-start sm:self-auto">
              *All team profiles are demonstration records
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.name}
                className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-blue-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-lg mb-4 border border-slate-200">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs font-semibold text-blue-600 mb-3">{member.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">Specialty: </span>
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Banner in About Section */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">Visit Us in Hyderabad</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {BUSINESS_INFO.address}
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="btn-pink px-5 py-2.5 text-xs sm:text-sm shrink-0"
          >
            Get In Touch
          </button>
        </div>

      </div>
    </section>
  );
};
