export const defaultData = {
  tours: [
    {
      id: 'tour_damajagua_signature',
      title: '27 Charcos Damajagua Signature',
      shortDescription: 'Waterfall slides, cliff jumps, tropical canyon and Dominican lunch.',
      description: 'Our signature half-day adventure for cruise guests who want maximum nature in minimum time. You hike through a lush canyon, then descend natural limestone slides and pools with professional guides and safety gear.',
      durationHours: 5,
      price: { adult: 79, child: 59 },
      maxGroupSize: 12,
      images: [
        'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
        'https://images.pexels.com/photos/1732278/pexels-photo-1732278.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.unsplash.com/photo-1536750405018-36f963d6b548?auto=format&fit=crop&w=1200&q=80'
      ],
      tags: ['nature', 'adventure', 'waterfalls'],
      itinerary: ['Port pickup (Amber Cove or Taíno Bay)', 'Damajagua park briefing + equipment', 'Guided waterfall route', 'Dominican lunch stop', 'Return before all-aboard'],
      includes: ['Helmet and life vest', 'Bottled water', 'Roundtrip transport', 'Bilingual guide'],
      notes: ['Not recommended for guests with mobility limitations', 'Water shoes strongly recommended'],
      availability: true
    },
    {
      id: 'tour_city_flavors',
      title: 'City Flavors: Rum, Chocolate & Umbrella Street',
      shortDescription: 'Historic center, local tastings, colorful streets, culture-first pace.',
      description: 'Explore Puerto Plata’s colorful Victorian core with a guide who adapts to cruise timing. Visit photogenic streets, taste local rum/chocolate, and hear stories that make the city come alive beyond a standard bus stop.',
      durationHours: 4,
      price: { adult: 58, child: 38 },
      maxGroupSize: 14,
      images: [
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=80',
        'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      tags: ['culture', 'food', 'shopping'],
      itinerary: ['Port pickup', 'Fortaleza San Felipe photo stop', 'Umbrella Street + Pink Alley', 'Rum & cacao tasting', 'Souvenir time + return'],
      includes: ['Guide storytelling', 'Tasting stops', 'Bottled water'],
      notes: ['Very family friendly', 'Best for guests preferring less physical activity'],
      availability: true
    },
    {
      id: 'tour_isabel_cablecar',
      title: 'Isabel de Torres Viewpoint & Botanical Escape',
      shortDescription: 'Panoramic city views, mountaintop gardens, peaceful tropical air.',
      description: 'A scenic option focused on mountain breeze, panoramic photos and relaxed pacing. Ideal for travelers who want striking visuals and Dominican context without high-adrenaline sections.',
      durationHours: 4,
      price: { adult: 62, child: 44 },
      maxGroupSize: 10,
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80'
      ],
      tags: ['views', 'nature', 'culture'],
      itinerary: ['Port pickup', 'Isabel de Torres route', 'Garden/photo walk', 'Local snack stop', 'Back to port'],
      includes: ['Transport', 'Guide', 'Water'],
      notes: ['Cable car availability can vary; scenic road alternative used when needed'],
      availability: true
    },
    {
      id: 'tour_beach_relax',
      title: 'Sosúa Beach + Snorkel Chill',
      shortDescription: 'Clear water bay, optional snorkel, laid-back beach club comfort.',
      description: 'For cruise guests who want Caribbean beach time done right. Swim, snorkel, or simply relax under palms while your guide handles timing and logistics so you return stress-free.',
      durationHours: 5,
      price: { adult: 68, child: 48 },
      maxGroupSize: 12,
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      tags: ['beach', 'snorkel', 'relax'],
      itinerary: ['Port pickup', 'Drive to beach bay', 'Snorkel or free time', 'Lunch near sea', 'Return window with buffer'],
      includes: ['Roundtrip transport', 'Beach host support', 'Water'],
      notes: ['Bring towel and dry clothes for return ride'],
      availability: true
    },
    {
      id: 'tour_atv_jungle',
      title: 'Jungle Trails ATV + Dominican Countryside',
      shortDescription: 'Mud, trails, river crossings and local village photo stops.',
      description: 'A tropical off-road route that combines action and local scenery. Great for adventurous couples or friends wanting energy, dirt, and authentic countryside landscapes near Puerto Plata.',
      durationHours: 4,
      price: { adult: 74, child: 52 },
      maxGroupSize: 8,
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      tags: ['adventure', 'atv', 'jungle'],
      itinerary: ['Port pickup', 'Safety orientation', 'ATV route with stops', 'Fresh fruit break', 'Return transfer'],
      includes: ['Helmet', 'ATV fuel', 'Guide'],
      notes: ['Driver minimum age policy applies'],
      availability: true
    }
  ],
  customOptions: {
    basePricePerHour: 25,
    maxHours: 6,
    options: [
      { id: 'nature', label: 'Nature & Waterfalls' },
      { id: 'food', label: 'Local Food Tastings' },
      { id: 'shopping', label: 'Shopping Streets & Crafts' },
      { id: 'culture', label: 'History & Dominican Culture' },
      { id: 'beach', label: 'Beach Time & Coves' },
      { id: 'photography', label: 'Instagram / Photo Spots' }
    ]
  },
  transfers: [
    {
      id: 'airport_transfer_pop_cruise',
      title: 'POP Airport → Amber Cove / Taíno Bay',
      price: 38,
      capacity: 4,
      description: 'Private pickup with luggage assistance and cruise-time buffer.',
      durationMinutes: 45,
      availability: true
    },
    {
      id: 'airport_transfer_pop_hotel',
      title: 'POP Airport → Puerto Plata Hotels',
      price: 35,
      capacity: 4,
      description: 'Comfort sedan transfer for Playa Dorada and central hotels.',
      durationMinutes: 30,
      availability: true
    },
    {
      id: 'group_minivan_transfer',
      title: 'Group Minivan Transfer (up to 10)',
      price: 75,
      capacity: 10,
      description: 'Best-value group transfer for families and friend groups.',
      durationMinutes: 45,
      availability: true
    },
    {
      id: 'vip_express_transfer',
      title: 'VIP Express Meet & Ride',
      price: 55,
      capacity: 3,
      description: 'Priority meet point, chilled water, and fast departure service.',
      durationMinutes: 35,
      availability: true
    }
  ],
  settings: {
    paypalEmail: import.meta.env.VITE_PAYPAL_EMAIL || 'owner@email.com',
    paypalMeUsername: import.meta.env.VITE_PAYPAL_ME_USERNAME || 'ownerusername',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '18091234567',
    currency: 'USD',
    guideName: 'Rafael de la Cruz',
    guideYears: 14,
    guideBio: 'Puerto Plata local guide. Cruise-time specialist, bilingual support, and practical recommendations for families, couples, and first-time DR visitors.'
  }
};
