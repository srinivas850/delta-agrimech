// ============================================================
// Delta Agrimech — Central Site Data
// Edit this file to update products, videos, and contact info
// ============================================================

export const BRAND = {
  name: 'Delta Agrimech',
  tagline: 'Powering India\'s Fields',
  phone: '9912000499',
  email: '',
  // Cleanly cropped Cloudinary logo (top navy bar and bottom purple gradient removed)
  logoUrl: 'https://res.cloudinary.com/dhge37es8/image/upload/c_crop,h_600,w_1910,x_0,y_95/e_trim/v1793172908/Delta_Agrimech_Logo.png',
  localLogoUrl: '/assets/images/delta-agrimech-logo.png',
  // Hero section background image — Golden Hour Fieldwork
  heroBgUrl: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793174571/Golden_Hour_Fieldwork.png',
  localHeroBgUrl: '/assets/images/hero-machine.png',
};

// ── Products ─────────────────────────────────────────────────
// Replace imagePath values with actual filenames once you have them.
// Place images in: public/assets/images/
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
    imagePath: 'https://res.cloudinary.com/dhge37es8/image/upload/v1793181323/Orange_Shaktiman_Delta_Baler_Showcase.png',
    localImagePath: '/assets/images/product-delta-baler.png',
    imageAlt: 'Delta Baler agricultural machinery',
  },
];

// ── Videos ───────────────────────────────────────────────────
// Add up to 8 videos. Each entry can be:
//   - A local file: set src to '/assets/videos/your-video.mp4'
//   - A YouTube embed: set youtubeId to the video ID (e.g. 'dQw4w9WgXcQ')
// Set thumbnail to '/assets/images/thumb-video-N.jpg' for custom thumbnails.
export const VIDEOS = [
  {
    id: 'video-1',
    title: 'Delta Agrimech — Machine Demo 1',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-2',
    title: 'Delta Agrimech — Field Operation 2',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-3',
    title: 'Delta Agrimech — Machine Demo 3',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-4',
    title: 'Delta Agrimech — Field Operation 4',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-5',
    title: 'Delta Agrimech — Machine Demo 5',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-6',
    title: 'Delta Agrimech — Company Footage 6',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-7',
    title: 'Delta Agrimech — Agricultural Demo 7',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
  {
    id: 'video-8',
    title: 'Delta Agrimech — Company Showcase 8',
    src: '',
    youtubeId: '',
    thumbnail: '',
  },
];

// ── Contact Information ───────────────────────────────────────
export const CONTACT = {
  headOffice: {
    label: 'Head Office',
    address:
      'Shop No.2, Block No.C7, Plot No.215, 2nd Cross Road, New Autonagar, Vijayawada-520007',
    phone: '9912000499',
  },
  branchOffice: {
    label: 'Branch Office',
    address:
      '3-414, Beside GIET College, Velugubanda, Rajanagaram Mandal, Rajahmundry Rural, East Godavari District-533294',
    phone: '',
  },
  distributor: {
    label: 'Distributor',
    name: 'Green Fields Agro',
    address:
      'Shop No.1, Block No.C7, Plot No.215, 2nd Cross Road, New Autonagar, Vijayawada-520007',
    phone: '',
  },
};
