export const t = {
  en: {
    nav: { tours: 'Tours', custom: 'Custom', transfers: 'Transfers', checkout: 'Checkout' },
    common: {
      adults: 'Adults',
      children: 'Children',
      date: 'Date',
      reserve: 'Reserve',
      continue: 'Continue',
      save: 'Save All Changes',
      whatsapp: 'WhatsApp',
      admin: 'Admin'
    },
    landing: {
      heroTitle: 'A tropical shore day that feels local, safe and unforgettable.',
      heroTag: 'Puerto Plata • Dominican Republic',
      heroSub: 'We design every route with cruise return buffers, local flavor, and less waiting.',
      exploreTours: 'Explore Tours',
      planMyDay: 'Plan My Day',
      hoursWarning: 'Designed for cruise visitors with only 4–6 hours ashore.',
      fastTitle: 'Fast Shore Excursions',
      fastDesc: 'Choose pre-planned tours for waterfalls, city highlights, culture and beach in 4–6 hours.',
      customTitle: 'Private Build-Your-Day',
      customDesc: 'Go flexible with your own guide. Decide in real time: nature, food, shopping, history, beaches.',
      transferTitle: 'Trusted transfer support',
      transferDesc: 'Airport and cruise-connected transfers with punctual pickup, luggage support and WhatsApp coordination.'
    },
    tours: {
      heading: 'Shore Tours Crafted for 4–6 Hours',
      subtitle: 'Every itinerary is optimized for cruise timing from Amber Cove and Taíno Bay.',
      open: 'Open Tour',
      flow: 'Typical Flow',
      includes: 'Included',
      notes: 'Good To Know',
      notFound: 'Tour not found.',
      cruiseSafe: 'Cruise-safe duration'
    },
    custom: {
      title: 'Private “Build Your Day” Guide',
      desc: 'Tell us your mood, then improvise on the go. Perfect when your group wants mixed experiences without rigid schedules.',
      choose: 'Choose your tropical mix',
      hours: 'Hours',
      group: 'Group'
    },
    transfers: {
      title: 'Reliable Transfers',
      desc: 'From Gregorio Luperón (POP) to cruise port, hotel, or private pickup point.',
      capacity: 'Capacity',
      from: 'From'
    },
    checkout: {
      title: 'Checkout',
      empty: 'No active booking in session.',
      total: 'Total',
      confirm: 'Confirm on WhatsApp',
      item: 'Item',
      clear: 'Clear cart'
    },
    footer: {
      years: 'years guiding cruise visitors in Puerto Plata.',
      trust: 'Local semi-professional service • Timed for cruise return windows • English & Spanish assistance.'
    },
    admin: {
      login: 'Admin Login',
      enter: 'Enter Dashboard',
      tours: 'Tours',
      custom: 'Custom',
      transfers: 'Transfers',
      settings: 'Settings',
      addTour: '+ Add Tour',
      addTransfer: '+ Add Transfer',
      del: 'Delete',
      upload: 'Upload image',
      saved: 'Saved to local + JSONBin'
    }
  },
  es: {
    nav: { tours: 'Tours', custom: 'Privado', transfers: 'Traslados', checkout: 'Pago' },
    common: {
      adults: 'Adultos',
      children: 'Niños',
      date: 'Fecha',
      reserve: 'Reservar',
      continue: 'Continuar',
      save: 'Guardar cambios',
      whatsapp: 'WhatsApp',
      admin: 'Admin'
    },
    landing: {
      heroTitle: 'Un día tropical de crucero que se siente local, seguro e inolvidable.',
      heroTag: 'Puerto Plata • República Dominicana',
      heroSub: 'Diseñamos cada ruta con margen de regreso al crucero, sabor local y menos esperas.',
      exploreTours: 'Explorar Tours',
      planMyDay: 'Planificar Mi Día',
      hoursWarning: 'Diseñado para cruceristas con solo 4–6 horas en tierra.',
      fastTitle: 'Excursiones rápidas',
      fastDesc: 'Elige tours planificados de cascadas, ciudad, cultura y playa en 4–6 horas.',
      customTitle: 'Guía privado a medida',
      customDesc: 'Plan flexible con tu guía. Decide en tiempo real: naturaleza, comida, compras, historia y playa.',
      transferTitle: 'Traslados confiables',
      transferDesc: 'Traslados aeropuerto/puerto con puntualidad, ayuda con equipaje y coordinación por WhatsApp.'
    },
    tours: {
      heading: 'Tours de 4–6 horas para crucero',
      subtitle: 'Cada itinerario está optimizado para tiempos de Amber Cove y Taíno Bay.',
      open: 'Ver Tour',
      flow: 'Recorrido típico',
      includes: 'Incluye',
      notes: 'Información útil',
      notFound: 'Tour no encontrado.',
      cruiseSafe: 'Duración segura para crucero'
    },
    custom: {
      title: 'Guía privado “Diseña tu día”',
      desc: 'Cuéntanos tu estilo y adaptamos todo sobre la marcha. Ideal para grupos con intereses distintos.',
      choose: 'Elige tu mezcla tropical',
      hours: 'Horas',
      group: 'Grupo'
    },
    transfers: {
      title: 'Traslados confiables',
      desc: 'Desde Gregorio Luperón (POP) a puerto de cruceros, hotel o punto privado.',
      capacity: 'Capacidad',
      from: 'Desde'
    },
    checkout: {
      title: 'Pago',
      empty: 'No hay reservas en la sesión.',
      total: 'Total',
      confirm: 'Confirmar por WhatsApp',
      item: 'Servicio',
      clear: 'Vaciar carrito'
    },
    footer: {
      years: 'años guiando visitantes de crucero en Puerto Plata.',
      trust: 'Servicio local semi-profesional • Rutas con margen de regreso al crucero • Soporte en inglés y español.'
    },
    admin: {
      login: 'Ingreso Admin',
      enter: 'Entrar al panel',
      tours: 'Tours',
      custom: 'Personalizado',
      transfers: 'Traslados',
      settings: 'Ajustes',
      addTour: '+ Agregar tour',
      addTransfer: '+ Agregar traslado',
      del: 'Eliminar',
      upload: 'Subir imagen',
      saved: 'Guardado local + JSONBin'
    }
  }
};

export const tr = (lang, path) => path.split('.').reduce((acc, key) => (acc ? acc[key] : ''), t[lang] || t.en) || path;

export const buildWhatsAppMessage = ({ lang = 'en', items, total }) => {
  const enHeader = 'Hello! I want to book these services:';
  const esHeader = '¡Hola! Quiero reservar estos servicios:';
  const linesEn = items.map((item, idx) => {
    if (item.type === 'custom') {
      return `${idx + 1}. Custom Day (${item.hours}h, ${item.groupSize} pax)\n   Preferences: ${item.preferences.join(', ')}\n   Date: ${item.date}`;
    }
    return `${idx + 1}. Tour: ${item.title}\n   Date: ${item.date}\n   Adults: ${item.adults}, Children: ${item.children}`;
  }).join('\n\n');

  const linesEs = items.map((item, idx) => {
    if (item.type === 'custom') {
      return `${idx + 1}. Día Personalizado (${item.hours}h, ${item.groupSize} pax)\n   Preferencias: ${item.preferences.join(', ')}\n   Fecha: ${item.date}`;
    }
    return `${idx + 1}. Tour: ${item.title}\n   Fecha: ${item.date}\n   Adultos: ${item.adults}, Niños: ${item.children}`;
  }).join('\n\n');

  const en = `${enHeader}\n\n${linesEn}\n\nTotal estimate: $${total}`;
  const es = `${esHeader}\n\n${linesEs}\n\nTotal estimado: $${total}`;
  return lang === 'es' ? `${es}\n\n---\n\n${en}` : `${en}\n\n---\n\n${es}`;
};
