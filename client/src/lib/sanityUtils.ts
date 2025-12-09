import { urlFor, PROJECT_ID, DATASET } from './sanity';
import type { SanityProperty, SanityProject, SanityTestimonial } from './sanity';
import type { Property, Project, Testimonial } from '../../../drizzle/schema';

/**
 * Convert Sanity Property to component Property format
 */
export function convertSanityProperty(sanityProp: SanityProperty): Property {
  // Helper to resolve many possible Sanity image shapes into a URL
  const resolveImageUrl = (imgSource: any): string | null => {
    if (!imgSource) return null;

    // If it's already a string URL, return it
    if (typeof imgSource === 'string') {
      try {
        return urlFor(imgSource).width(800).url();
      } catch {
        return imgSource; // maybe it's a direct URL
      }
    }

    // If it's an array, try the first valid element
    if (Array.isArray(imgSource) && imgSource.length > 0) {
      for (const item of imgSource) {
        const resolved = resolveImageUrl(item);
        if (resolved) return resolved;
      }
      return null;
    }

    // If it's an object, prefer asset._ref or _ref
    try {
      const asAny = imgSource as any;
      // If there is an explicit 'url' field (external image), use it
      if (asAny.url && typeof asAny.url === 'string') return asAny.url;

      // If asset._ref exists, check whether it's an image or file
      if (asAny.asset && typeof asAny.asset._ref === 'string') {
        const ref: string = asAny.asset._ref;
        if (ref.startsWith('image-')) {
          // image asset - let builder handle it
          return urlFor(asAny).width(800).url();
        }
        if (ref.startsWith('file-')) {
          // file asset (could be video) - build direct CDN file URL
          // format: file-<assetId>-<ext>
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }

      // If this object itself is a reference with _ref
      if (asAny._ref && typeof asAny._ref === 'string') {
        const ref: string = asAny._ref;
        if (ref.startsWith('image-')) {
          return urlFor({ asset: { _ref: ref } }).width(800).url();
        }
        if (ref.startsWith('file-')) {
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }

      // If it's an image object that the builder can process, try it
      return urlFor(asAny).width(800).url();
    } catch (err) {
      // If builder fails, return null
      return null;
    }
  };

  let imageUrl: string | null = null;
  try {
    imageUrl = resolveImageUrl(sanityProp.image as any);
  } catch (error) {
    console.warn('Error resolving property image URL', sanityProp._id, error);
    imageUrl = null;
  }
  // If we couldn't resolve but there was an image value, log it for debugging
  if (!imageUrl && sanityProp.image) {
    // Only log in non-production to avoid noisy logs
    try {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Unable to resolve image URL for property (likely missing asset._ref). Image source:', sanityProp._id, sanityProp.image);
      }
    } catch {}
  }

  // Map Sanity type values to component type values
  const typeMap: Record<string, 'venta' | 'alquiler' | 'inversion'> = {
    'sale': 'venta',
    'rent': 'alquiler',
    'venta': 'venta',
    'alquiler': 'alquiler',
    'inversion': 'inversion',
  };
  const mappedType = typeMap[sanityProp.type] || 'venta';

  return {
    id: parseInt(sanityProp._id.replace(/[^0-9]/g, '')) || 0, // Extract numbers from _id or use 0
    titleEs: sanityProp.titleEs,
    titleEn: sanityProp.titleEn,
    titleFr: sanityProp.titleFr || null,
    titleDe: sanityProp.titleDe || null,
    titleAr: sanityProp.titleAr || null,
    descriptionEs: sanityProp.descriptionEs || null,
    descriptionEn: sanityProp.descriptionEn || null,
    descriptionFr: sanityProp.descriptionFr || null,
    descriptionDe: sanityProp.descriptionDe || null,
    descriptionAr: sanityProp.descriptionAr || null,
    type: mappedType,
    price: sanityProp.price || null,
    currency: sanityProp.currency || 'EUR',
    location: sanityProp.location || null,
    imageUrl: imageUrl,
    imageKey: null,
    bedrooms: sanityProp.bedrooms || null,
    bathrooms: sanityProp.bathrooms || null,
    squareMeters: sanityProp.squareMeters || null,
    squareFeet: sanityProp.squareFeet || null,
    yearBuilt: sanityProp.yearBuilt || null,
    propertyType: sanityProp.propertyType || null,
    featured: sanityProp.featured || false,
    active: sanityProp.active !== false, // Default to true
    createdAt: new Date(sanityProp._createdAt),
    updatedAt: new Date(sanityProp._createdAt),
  };
}

/**
 * Convert Sanity Project to component Project format
 */
export function convertSanityProject(sanityProject: SanityProject): Project {
  const resolveImageUrlProject = (imgSource: any): string | null => {
    if (!imgSource) return null;
    try {
      if (typeof imgSource === 'string') return urlFor(imgSource).width(800).url();
      if (Array.isArray(imgSource) && imgSource.length > 0) return resolveImageUrlProject(imgSource[0]);
      const asAny = imgSource as any;
      if (asAny.url && typeof asAny.url === 'string') return asAny.url;
      if (asAny.asset && typeof asAny.asset._ref === 'string') {
        const ref: string = asAny.asset._ref;
        if (ref.startsWith('image-')) return urlFor(asAny).width(800).url();
        if (ref.startsWith('file-')) {
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }
      if (asAny._ref && typeof asAny._ref === 'string') {
        const ref: string = asAny._ref;
        if (ref.startsWith('image-')) return urlFor({ asset: { _ref: ref } }).width(800).url();
        if (ref.startsWith('file-')) {
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }
      return urlFor(asAny).width(800).url();
    } catch (err) {
      return null;
    }
  };

  const imageUrl = resolveImageUrlProject(sanityProject.image as any);

  return {
    id: parseInt(sanityProject._id.replace(/[^0-9]/g, '')) || 0,
    titleEs: sanityProject.titleEs,
    titleEn: sanityProject.titleEn,
    titleFr: sanityProject.titleFr || null,
    titleDe: sanityProject.titleDe || null,
    titleAr: sanityProject.titleAr || null,
    descriptionEs: sanityProject.descriptionEs || null,
    descriptionEn: sanityProject.descriptionEn || null,
    descriptionFr: sanityProject.descriptionFr || null,
    descriptionDe: sanityProject.descriptionDe || null,
    descriptionAr: sanityProject.descriptionAr || null,
    category: sanityProject.category,
    imageUrl: imageUrl,
    imageKey: null,
    featured: sanityProject.featured || false,
    active: sanityProject.active !== false,
    createdAt: new Date(sanityProject._createdAt),
    updatedAt: new Date(sanityProject._createdAt),
  };
}

/**
 * Convert Sanity Testimonial to component Testimonial format
 */
export function convertSanityTestimonial(sanityTestimonial: SanityTestimonial): Testimonial {
  const resolveImageUrlTestimonial = (imgSource: any): string | null => {
    if (!imgSource) return null;
    try {
      if (typeof imgSource === 'string') return urlFor(imgSource).width(400).url();
      const asAny = imgSource as any;
      if (asAny.url && typeof asAny.url === 'string') return asAny.url;
      if (asAny.asset && typeof asAny.asset._ref === 'string') {
        const ref: string = asAny.asset._ref;
        if (ref.startsWith('image-')) return urlFor(asAny).width(400).url();
        if (ref.startsWith('file-')) {
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }
      if (asAny._ref && typeof asAny._ref === 'string') {
        const ref: string = asAny._ref;
        if (ref.startsWith('image-')) return urlFor({ asset: { _ref: ref } }).width(400).url();
        if (ref.startsWith('file-')) {
          const parts = ref.split('-');
          if (parts.length >= 3) {
            const ext = parts.pop();
            const assetId = parts.slice(1).join('-');
            return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${ext}`;
          }
        }
      }
      return urlFor(asAny).width(400).url();
    } catch (err) {
      return null;
    }
  };

  const imageUrl = resolveImageUrlTestimonial(sanityTestimonial.image as any);

  return {
    id: parseInt(sanityTestimonial._id.replace(/[^0-9]/g, '')) || 0,
    clientName: sanityTestimonial.clientName,
    contentEs: sanityTestimonial.contentEs,
    contentEn: sanityTestimonial.contentEn,
    contentFr: sanityTestimonial.contentFr || null,
    contentDe: sanityTestimonial.contentDe || null,
    contentAr: sanityTestimonial.contentAr || null,
    clientTitle: sanityTestimonial.clientTitle || null,
    rating: sanityTestimonial.rating || 5,
    imageUrl: imageUrl,
    imageKey: null,
    featured: sanityTestimonial.featured || false,
    active: sanityTestimonial.active !== false,
    createdAt: new Date(sanityTestimonial._createdAt),
    updatedAt: new Date(sanityTestimonial._createdAt),
  };
}

