import { OPENING_HOURS } from '../data/boutiqueData';

/**
 * Format a number to PKR currency format: "PKR 1,800"
 */
export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

/**
 * Calculate whether Noor Boutique is currently open based on Pakistan Standard Time (PKT, UTC+5)
 */
export function getStoreCurrentStatus(): {
  isOpen: boolean;
  statusText: string;
  nextChange: string;
  currentDayName: string;
  currentPktTime: string;
} {
  // Compute Pakistan Time (UTC + 5 hours)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const pktDate = new Date(utc + 5 * 3600000);

  const dayIndex = pktDate.getDay(); // 0 is Sunday, 1 is Monday, ... 6 is Saturday
  const currentHour = pktDate.getHours();
  const currentMin = pktDate.getMinutes();
  const currentTimeDecimal = currentHour + currentMin / 60;

  // Day mapping: 0=Sunday, 1=Monday...
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[dayIndex];

  const todaySchedule = OPENING_HOURS.find((h) => h.day === todayName);

  if (!todaySchedule) {
    return {
      isOpen: false,
      statusText: 'Closed Today',
      nextChange: 'Opens tomorrow',
      currentDayName: todayName,
      currentPktTime: pktDate.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }),
    };
  }

  const isOpen =
    currentTimeDecimal >= todaySchedule.openHour &&
    currentTimeDecimal < todaySchedule.closeHour;

  let statusText = isOpen ? 'Open Now' : 'Closed Now';
  let nextChange = '';

  if (isOpen) {
    const closesAt = todaySchedule.closeHour > 12 
      ? `${todaySchedule.closeHour - 12}:00 PM` 
      : `${todaySchedule.closeHour}:00 AM`;
    nextChange = `Closes today at ${closesAt}`;
  } else {
    if (currentTimeDecimal < todaySchedule.openHour) {
      const opensAt = todaySchedule.openHour > 12 
        ? `${todaySchedule.openHour - 12}:00 PM` 
        : `${todaySchedule.openHour}:00 AM`;
      nextChange = `Opens today at ${opensAt}`;
    } else {
      nextChange = `Opens tomorrow morning`;
    }
  }

  return {
    isOpen,
    statusText,
    nextChange,
    currentDayName: todayName,
    currentPktTime: pktDate.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Generate a WhatsApp chat URL with encoded custom message
 */
export function createWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
