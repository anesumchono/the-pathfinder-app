# PathFinder App Icons

## Generate Icons

You need to create app icons in these sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## Quick Way to Generate Icons:

### Option 1: Use Online Tool (Easiest)
1. Go to: https://www.pwabuilder.com/imageGenerator
2. Upload a 512x512 image (your logo/icon)
3. Download all generated icons
4. Place them in this folder

### Option 2: Use Figma/Canva
1. Create a 512x512 design with your logo
2. Export in all required sizes
3. Save as PNG files

### Option 3: Use ImageMagick (Command Line)
If you have a 512x512 source image:

```bash
magick icon-512x512.png -resize 72x72 icon-72x72.png
magick icon-512x512.png -resize 96x96 icon-96x96.png
magick icon-512x512.png -resize 128x128 icon-128x128.png
magick icon-512x512.png -resize 144x144 icon-144x144.png
magick icon-512x512.png -resize 152x152 icon-152x152.png
magick icon-512x512.png -resize 192x192 icon-192x192.png
magick icon-512x512.png -resize 384x384 icon-384x384.png
```

## Design Guidelines:

- Use the graduation cap icon from your app
- Background: Gradient from indigo to purple (#6366f1 to #9333ea)
- Keep it simple and recognizable
- Ensure it looks good at small sizes
- Use PNG format with transparency

## Temporary Solution:

For now, you can use a simple colored square with the graduation cap emoji or text "PF" until you create proper icons.
