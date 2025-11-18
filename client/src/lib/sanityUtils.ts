import { urlFor } from './sanity';
import type { SanityProperty, SanityProject, SanityTestimonial } from './sanity';
import type { Property, Project, Testimonial } from '../../../drizzle/schema';

/**
 * Convert Sanity Property to component Property format
 */
export function convertSanityProperty(sanityProp: SanityProperty): Property {
  // Handle image array - use first image if available
  let imageUrl: string | null = null;
  if (sanityProp.image) {
    if (Array.isArray(sanityProp.image) && sanityProp.image.length > 0) {
      // Image is an array, get the first one
      imageUrl = urlFor(sanityProp.image[0]).width(800).url();
    } else if (typeof sanityProp.image === 'object') {
      // Single image object
      imageUrl = urlFor(sanityProp.image).width(800).url();
    }
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
    imageUrl: sanityProject.image ? urlFor(sanityProject.image).width(800).url() : null,
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
    imageUrl: sanityTestimonial.image ? urlFor(sanityTestimonial.image).width(400).url() : null,
    imageKey: null,
    featured: sanityTestimonial.featured || false,
    active: sanityTestimonial.active !== false,
    createdAt: new Date(sanityTestimonial._createdAt),
    updatedAt: new Date(sanityTestimonial._createdAt),
  };
}

