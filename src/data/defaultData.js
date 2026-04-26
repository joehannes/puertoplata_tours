export const defaultData = {
  tours: [
    {
      id: 'tour_waterfalls',
      title: 'Damajagua Waterfalls Adventure',
      shortDescription: 'Jump, slide and swim in natural pools',
      description: 'Perfect for cruise visitors wanting adrenaline and nature in under 6 hours.',
      durationHours: 4,
      price: { adult: 65, child: 45 },
      maxGroupSize: 12,
      images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200'],
      tags: ['nature', 'adventure'],
      availability: true
    },
    {
      id: 'tour_city_food',
      title: 'Puerto Plata City + Local Food',
      shortDescription: 'Historic streets, rum, and local lunch',
      description: 'A safe half-day route balancing culture, shopping and authentic Dominican flavors.',
      durationHours: 5,
      price: { adult: 55, child: 35 },
      maxGroupSize: 10,
      images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200'],
      tags: ['culture', 'food', 'shopping'],
      availability: true
    }
  ],
  customOptions: {
    basePricePerHour: 25,
    maxHours: 6,
    options: [
      { id: 'nature', label: 'Nature & Waterfalls' },
      { id: 'food', label: 'Local Food' },
      { id: 'shopping', label: 'Shopping Streets' },
      { id: 'culture', label: 'Local Culture' }
    ]
  },
  transfers: [
    {
      id: 'airport_transfer_pop',
      title: 'Puerto Plata Airport Transfer',
      price: 35,
      capacity: 4,
      description: 'Private pickup from POP airport to city/cruise area.'
    }
  ],
  settings: {
    paypalEmail: import.meta.env.VITE_PAYPAL_EMAIL || 'owner@email.com',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '18091234567',
    currency: 'USD'
  }
};
