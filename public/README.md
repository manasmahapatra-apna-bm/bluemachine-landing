# Public Assets Directory

This directory contains all static assets served by Next.js.

## Structure

```
public/
├── Images/     # Photos, illustrations, hero images
├── Icons/      # Favicons, app icons, manifest icons
├── SVGs/       # SVG graphics and logos
└── Fonts/      # Custom font files (if not using npm packages)
```

## Asset Strategy

### Current Approach: Public Folder
- ✅ **Standard Next.js pattern** - Works seamlessly with static export
- ✅ **Easy CDN migration** - Just set `NEXT_PUBLIC_CDN_URL` environment variable
- ✅ **No build-time processing** - Assets copied as-is to output directory
- ✅ **Simple paths** - Use `/Images/hero.jpg` directly in code

### Future: CDN Migration
When ready to move to CDN:

1. Upload all assets from `public/` to your CDN (e.g., Cloudflare, AWS CloudFront, Vercel Blob)
2. Set environment variable: `NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com`
3. Assets will automatically use CDN URLs via `AssetPaths` constants
4. **No code changes needed** - The abstraction layer handles it

### Image Optimization

**For Static Export (current):**
- Images are served as-is (`unoptimized: true` in next.config.ts)
- Pre-optimize images before adding to `public/Images/`
- Use tools like: ImageOptim, Squoosh, or Sharp

**For Future (if removing static export):**
- Remove `unoptimized: true` from next.config.ts
- Next.js Image component will automatically optimize
- Enable lazy loading and responsive images

## Usage Examples

### Images
```tsx
import Image from 'next/image';
import { getImagePath, IMAGE_SIZES } from '@/lib/utils/ImageUtils';

// Using Next.js Image component (recommended)
<Image
    src={getImagePath('hero-background.jpg')}
    alt="Hero background"
    width={IMAGE_SIZES.hero.width}
    height={IMAGE_SIZES.hero.height}
    priority // For above-the-fold images
/>
```

### SVGs
```tsx
// Option 1: Import as React component (better optimization)
import Logo from '@/public/SVGs/logo.svg';

// Option 2: Serve statically
import { getSvgPath } from '@/lib/utils/ImageUtils';
<img src={getSvgPath('logo.svg')} alt="Logo" />
```

### Icons
```tsx
// In layout.tsx
<link rel="icon" href="/Icons/favicon.ico" />
<link rel="apple-touch-icon" href="/Icons/apple-touch-icon.png" />
```

## Best Practices

1. **Optimize before upload**: Compress images, use appropriate formats (WebP when possible)
2. **Descriptive filenames**: `hero-background.jpg` not `img1.jpg`
3. **Organize by feature**: `Images/hero/`, `Images/products/`, etc.
4. **Use Next.js Image**: Automatic lazy loading and responsive images
5. **SVG for icons**: Use SVGs for icons/logos when possible (scalable, small file size)
6. **CDN-ready**: All paths use `AssetPaths` constants for easy CDN migration

## File Size Guidelines

- **Hero images**: Max 500KB (compress aggressively)
- **Product images**: Max 200KB per image
- **Icons**: Max 50KB (prefer SVG)
- **SVGs**: Keep under 100KB (optimize with SVGO)

## Migration to CDN

When ready:

1. Upload `public/` contents to CDN
2. Set `NEXT_PUBLIC_CDN_URL` in production environment
3. Test that all assets load correctly
4. Monitor CDN performance and caching

No code changes required thanks to `AssetPaths` abstraction!
