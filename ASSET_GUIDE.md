# 📂 Asset Placement Guide — Delta Agrimech

## Where to place your files

Once you have your images and videos ready, place them in these **exact locations**:

---

## 🖼️ Images → `public/assets/images/`

| Filename | Purpose |
|---|---|
| `hero-machine.jpg` | **Hero section background** — large machine photo (min 1920×1080 px recommended) |
| `product-delta-9-pro-100hp.jpg` | Product card for Delta 9 Pro 100HP |
| `product-delta-9-pro-102hp.jpg` | Product card for Delta 9 Pro 102HP |
| `product-delta-baler.jpg` | Product card for Delta Baler |
| `thumb-video-1.jpg` | Thumbnail for Video 1 |
| `thumb-video-2.jpg` | Thumbnail for Video 2 |
| `thumb-video-3.jpg` | Thumbnail for Video 3 |
| `thumb-video-4.jpg` | Thumbnail for Video 4 |
| `thumb-video-5.jpg` | Thumbnail for Video 5 |
| `thumb-video-6.jpg` | Thumbnail for Video 6 |
| `thumb-video-7.jpg` | Thumbnail for Video 7 |
| `thumb-video-8.jpg` | Thumbnail for Video 8 |

---

## 🎬 Videos → `public/assets/videos/`

| Filename | Purpose |
|---|---|
| `video-1.mp4` | Video 1 |
| `video-2.mp4` | Video 2 |
| `video-3.mp4` | Video 3 |
| `video-4.mp4` | Video 4 |
| `video-5.mp4` | Video 5 |
| `video-6.mp4` | Video 6 |
| `video-7.mp4` | Video 7 |
| `video-8.mp4` | Video 8 |

---

## ✏️ Updating Video Titles

Open `src/data/siteData.js` and edit the `title` field for each video entry.

## 🎞️ Using YouTube Videos Instead of Local Files

In `src/data/siteData.js`, set `youtubeId` to the YouTube video ID (e.g. `dQw4w9WgXcQ`)
and leave `src` as `''`. The thumbnail will be auto-fetched from YouTube.

## 📝 Updating Product Descriptions

Open `src/data/siteData.js` and edit the `description` field for each product.

---

## 🚀 Running Locally

```bash
npm run dev
```

## 🏗️ Building for Production

```bash
npm run build
```
