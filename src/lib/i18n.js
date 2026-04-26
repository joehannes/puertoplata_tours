export const t = {
  en: {
    exploreTours: 'Explore Tours',
    planMyDay: 'Plan My Day',
    transfer: 'Airport Transfers',
    hoursWarning: 'Designed for cruise visitors with only 4–6 hours ashore.'
  },
  es: {
    exploreTours: 'Explorar Tours',
    planMyDay: 'Planificar Mi Día',
    transfer: 'Traslados Aeropuerto',
    hoursWarning: 'Diseñado para cruceristas con solo 4–6 horas en tierra.'
  }
};

export const buildWhatsAppMessage = ({ lang = 'en', booking }) => {
  const isCustom = booking.type === 'custom';
  const en = isCustom
    ? `Hello! I want to book:\n\nCustom Tour Preferences:\n${booking.preferences.map((p) => `- ${p}`).join('\n')}\n\nDuration: ${booking.hours} hours\nGroup: ${booking.groupSize} people\nDate: ${booking.date}\nPickup: ${booking.pickup}`
    : `Hello! I want to book:\n\nTour: ${booking.title}\nDate: ${booking.date}\nAdults: ${booking.adults}\nChildren: ${booking.children}\nPickup: ${booking.pickup}`;

  const es = isCustom
    ? `¡Hola! Quiero reservar:\n\nPreferencias del tour personalizado:\n${booking.preferences.map((p) => `- ${p}`).join('\n')}\n\nDuración: ${booking.hours} horas\nGrupo: ${booking.groupSize} personas\nFecha: ${booking.date}\nRecogida: ${booking.pickup}`
    : `¡Hola! Quiero reservar:\n\nTour: ${booking.title}\nFecha: ${booking.date}\nAdultos: ${booking.adults}\nNiños: ${booking.children}\nRecogida: ${booking.pickup}`;

  return lang === 'es' ? `${es}\n\n---\n\n${en}` : `${en}\n\n---\n\n${es}`;
};
