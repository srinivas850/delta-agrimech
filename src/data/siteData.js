// ============================================================
// Sreshta Impex LLP — Central Site Data
// Products & Logo retain Delta Agrimech brand identity
// ============================================================

export const BRAND = {
  name: 'Sreshta Impex LLP',
  tagline: "Powering India's Fields",
  phone: '9912000499',
  email: '',
  location: 'Vijayawada',
  // Cleanly cropped Cloudinary logo (top navy bar and bottom purple gradient removed)
  logoUrl: 'https://res.cloudinary.com/dhge37es8/image/upload/c_crop,h_600,w_1910,x_0,y_95/e_trim/v1793172908/Delta_Agrimech_Logo.png',
  localLogoUrl: '/assets/images/delta-agrimech-logo.png',
  // Hero section background image — Golden Hour Fieldwork
  heroBgUrl: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793188328/Delta_Harvester_at_Golden_Hour.png',
  localHeroBgUrl: '/assets/images/hero-machine.png',
};

// ── Products ─────────────────────────────────────────────────
// Product names and machine images remain Delta Agrimech
export const PRODUCTS = [
  {
    id: 'delta-9-pro-100hp',
    name: 'Delta 9 Pro 100HP',
    description:
      'Built for maximum field performance, the Delta 9 Pro 100HP delivers unmatched power and durability across all terrains. Engineered for Indian farming conditions — dependable, efficient, and ready for every season.',
    imagePath: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793173877/2f2647d1-642c-4982-beb8-ae9c60a6af42.png',
    localImagePath: '/assets/images/product-delta-9-pro-100hp.png',
    imageAlt: 'Delta 9 Pro 100HP combine harvester machine',
  },
  {
    id: 'delta-9-pro-102hp',
    name: 'Delta 9 Pro 102HP',
    description:
      'The Delta 9 Pro 102HP raises the bar with enhanced torque and advanced hydraulics. Designed for heavy-duty agricultural tasks that demand precision and reliability day after day.',
    imagePath: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793173877/2f2647d1-642c-4982-beb8-ae9c60a6af42.png',
    localImagePath: '/assets/images/product-delta-9-pro-100hp.png',
    imageAlt: 'Delta 9 Pro 102HP combine harvester machine',
  },
  {
    id: 'delta-baler',
    name: 'Delta Baler',
    description:
      'The Delta Baler streamlines crop collection and baling operations with outstanding efficiency. Purpose-built to handle high volumes quickly, reducing labour costs and post-harvest losses.',
    imagePath: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793186967/Delta_Baler_in_Golden_Fields.png',
    localImagePath: '/assets/images/product-delta-baler.png',
    imageAlt: 'Delta Baler agricultural machinery',
  },
];

// ── Videos ───────────────────────────────────────────────────
export const VIDEOS = [
  {
    id: 'video-1',
    title: 'Delta Machinery Demo 1',
    src: 'https://res.cloudinary.com/dhge37es8/video/upload/v1793189690/WhatsApp_Video_2026-10-28_at_5.36.42_PM.mp4',
    youtubeId: '',
    thumbnail: 'https://res.cloudinary.com/dhge37es8/video/upload/so_1/v1793189690/WhatsApp_Video_2026-10-28_at_5.36.42_PM.jpg',
  },
  {
    id: 'video-2',
    title: 'Field Harvesting Operation 2',
    src: 'https://res.cloudinary.com/dhge37es8/video/upload/v1793189677/WhatsApp_Video_2026-10-28_at_5.36.41_PM.mp4',
    youtubeId: '',
    thumbnail: 'https://res.cloudinary.com/dhge37es8/video/upload/so_1/v1793189677/WhatsApp_Video_2026-10-28_at_5.36.41_PM.jpg',
  },
  {
    id: 'video-3',
    title: 'Agricultural Equipment in Action 3',
    src: 'https://res.cloudinary.com/dhge37es8/video/upload/v1793189676/WhatsApp_Video_2026-10-28_at_5.35.36_PM.mp4',
    youtubeId: '',
    thumbnail: 'https://res.cloudinary.com/dhge37es8/video/upload/so_1/v1793189676/WhatsApp_Video_2026-10-28_at_5.35.36_PM.jpg',
  },
  {
    id: 'video-4',
    title: 'Harvester Field Performance 4',
    src: 'https://res.cloudinary.com/dhge37es8/video/upload/v1793189675/WhatsApp_Video_2026-10-28_at_5.36.02_PM.mp4',
    youtubeId: '',
    thumbnail: 'https://res.cloudinary.com/dhge37es8/video/upload/so_1/v1793189675/WhatsApp_Video_2026-10-28_at_5.36.02_PM.jpg',
  },
  {
    id: 'video-5',
    title: 'Delta Machinery Showcase 5',
    src: 'https://res.cloudinary.com/dhge37es8/video/upload/v1793189674/WhatsApp_Video_2026-10-28_at_5.36.43_PM.mp4',
    youtubeId: '',
    thumbnail: 'https://res.cloudinary.com/dhge37es8/video/upload/so_1/v1793189674/WhatsApp_Video_2026-10-28_at_5.36.43_PM.jpg',
  },
];

// ── Contact Information ───────────────────────────────────────
// Location: Vijayawada | Contact: 9912000499
export const CONTACT = {
  city: 'Vijayawada',
  state: 'Andhra Pradesh',
  phone: '9912000499',
  displayPhone: '+91 9912000499',
};

// ── Dealer & Service Network Locations ─────────────────────────
export const NETWORK_LOCATIONS = [
  // Andhra Pradesh (AP)
  { id: 'ap-srikakulam', name: 'Srikakulam', state: 'Andhra Pradesh', stateCode: 'AP', isHub: false, x: 73, y: 44 },
  { id: 'ap-rajahmundry', name: 'Rajahmundry', state: 'Andhra Pradesh', stateCode: 'AP', isHub: false, x: 65, y: 50 },
  { id: 'ap-tadepalligudem', name: 'Tadepalligudem', state: 'Andhra Pradesh', stateCode: 'AP', isHub: false, x: 62, y: 52 },
  { id: 'ap-vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', stateCode: 'AP', isHub: true, x: 57, y: 55 },
  { id: 'ap-guntur', name: 'Guntur', state: 'Andhra Pradesh', stateCode: 'AP', isHub: false, x: 55, y: 58 },

  // Telangana
  { id: 'ts-bodhan', name: 'Bodhan', state: 'Telangana', stateCode: 'TS', isHub: false, x: 44, y: 39 },
  { id: 'ts-medak', name: 'Medak', state: 'Telangana', stateCode: 'TS', isHub: false, x: 47, y: 45 },
  { id: 'ts-bhuvanagiri', name: 'Bhuvanagiri', state: 'Telangana', stateCode: 'TS', isHub: false, x: 50, y: 48 },
  { id: 'ts-suryapet', name: 'Suryapet', state: 'Telangana', stateCode: 'TS', isHub: false, x: 53, y: 51 },
  { id: 'ts-miryalaguda', name: 'Miryalaguda', state: 'Telangana', stateCode: 'TS', isHub: false, x: 51, y: 54 },
  { id: 'ts-pebbair', name: 'Pebbair', state: 'Telangana', stateCode: 'TS', isHub: false, x: 46, y: 58 },

  // Karnataka
  { id: 'ka-sindhanur', name: 'Sindhanur', state: 'Karnataka', stateCode: 'KA', isHub: false, x: 39, y: 60 },

  // Tamil Nadu
  { id: 'tn-arani', name: 'Arani', state: 'Tamil Nadu', stateCode: 'TN', isHub: false, x: 50, y: 76 },
  { id: 'tn-villupuram', name: 'Villupuram', state: 'Tamil Nadu', stateCode: 'TN', isHub: false, x: 52, y: 81 },
  { id: 'tn-tiruvarur', name: 'Tiruvarur', state: 'Tamil Nadu', stateCode: 'TN', isHub: false, x: 53, y: 87 },
];

export const NETWORK_STATES = [
  { code: 'ALL', name: 'All Network Hubs', count: 15 },
  { code: 'AP', name: 'Andhra Pradesh', count: 5, cities: ['Vijayawada (Main Hub)', 'Tadepalligudem', 'Rajahmundry', 'Guntur', 'Srikakulam'] },
  { code: 'TS', name: 'Telangana', count: 6, cities: ['Bodhan', 'Miryalaguda', 'Suryapet', 'Medak', 'Pebbair', 'Bhuvanagiri'] },
  { code: 'TN', name: 'Tamil Nadu', count: 3, cities: ['Arani', 'Tiruvarur', 'Villupuram'] },
  { code: 'KA', name: 'Karnataka', count: 1, cities: ['Sindhanur'] },
];
