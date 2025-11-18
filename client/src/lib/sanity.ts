import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const sanityClient = createClient({
  projectId: "cy0xkdgi",
  dataset: 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or using the Studio
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries
export const queries = {
  // Get all properties with optional filtering
  // Note: type can be 'sale' or 'rent' from Sanity, but we map 'venta' -> 'sale' and 'alquiler' -> 'rent'
  getAllProperties: (type?: string, limit?: number) => {
    // Map Spanish type values to English values used in Sanity
    const typeMap: Record<string, string> = {
      'venta': 'sale',
      'alquiler': 'rent',
      'inversion': 'sale', // Default investment to sale
    };
    const sanityType = type ? typeMap[type] || type : undefined;
    const typeFilter = sanityType ? `&& type == "${sanityType}"` : '';
    const limitClause = limit ? `[0...${limit}]` : '';
    return `*[_type == "property" && (active == true || !defined(active)) ${typeFilter}] | order(_createdAt desc) ${limitClause} {
      _id,
      _createdAt,
      titleEs,
      titleEn,
      titleFr,
      titleDe,
      titleAr,
      descriptionEs,
      descriptionEn,
      descriptionFr,
      descriptionDe,
      descriptionAr,
      type,
      price,
      currency,
      location,
      image,
      bedrooms,
      bathrooms,
      squareMeters,
      squareFeet,
      yearBuilt,
      propertyType,
      featured,
      active
    }`;
  },

  // Get featured properties
  getFeaturedProperties: (limit: number = 4) => {
    return `*[_type == "property" && featured == true && (active == true || !defined(active))] | order(_createdAt desc) [0...${limit}] {
      _id,
      _createdAt,
      titleEs,
      titleEn,
      titleFr,
      titleDe,
      titleAr,
      descriptionEs,
      descriptionEn,
      descriptionFr,
      descriptionDe,
      descriptionAr,
      type,
      price,
      currency,
      location,
      image,
      bedrooms,
      bathrooms,
      squareMeters,
      squareFeet,
      yearBuilt,
      propertyType,
      featured,
      active
    }`;
  },

  // Get property by ID
  getPropertyById: (id: string) => {
    return `*[_type == "property" && _id == "${id}"][0] {
      _id,
      _createdAt,
      titleEs,
      titleEn,
      titleFr,
      titleDe,
      titleAr,
      descriptionEs,
      descriptionEn,
      descriptionFr,
      descriptionDe,
      descriptionAr,
      type,
      price,
      currency,
      location,
      image,
      bedrooms,
      bathrooms,
      squareMeters,
      squareFeet,
      yearBuilt,
      propertyType,
      featured,
      active
    }`;
  },

  // Get featured projects
  getFeaturedProjects: (limit: number = 3) => {
    return `*[_type == "project" && featured == true && active == true] | order(_createdAt desc) [0...${limit}] {
      _id,
      _createdAt,
      titleEs,
      titleEn,
      titleFr,
      titleDe,
      titleAr,
      descriptionEs,
      descriptionEn,
      descriptionFr,
      descriptionDe,
      descriptionAr,
      category,
      image,
      featured,
      active
    }`;
  },

  // Get all projects with optional filtering
  getAllProjects: (category?: string, limit?: number) => {
    const categoryFilter = category ? `&& category == "${category}"` : '';
    const limitClause = limit ? `[0...${limit}]` : '';
    return `*[_type == "project" && active == true ${categoryFilter}] | order(_createdAt desc) ${limitClause} {
      _id,
      _createdAt,
      titleEs,
      titleEn,
      titleFr,
      titleDe,
      titleAr,
      descriptionEs,
      descriptionEn,
      descriptionFr,
      descriptionDe,
      descriptionAr,
      category,
      image,
      featured,
      active
    }`;
  },

  // Get featured testimonials
  getFeaturedTestimonials: (limit: number = 4) => {
    return `*[_type == "testimonial" && featured == true && active == true] | order(_createdAt desc) [0...${limit}] {
      _id,
      _createdAt,
      clientName,
      contentEs,
      contentEn,
      contentFr,
      contentDe,
      contentAr,
      clientTitle,
      rating,
      image,
      featured,
      active
    }`;
  },

  // Get all testimonials
  getAllTestimonials: (limit?: number) => {
    const limitClause = limit ? `[0...${limit}]` : '';
    return `*[_type == "testimonial" && active == true] | order(_createdAt desc) ${limitClause} {
      _id,
      _createdAt,
      clientName,
      contentEs,
      contentEn,
      contentFr,
      contentDe,
      contentAr,
      clientTitle,
      rating,
      image,
      featured,
      active
    }`;
  },
};

// Type definitions for Sanity data
export interface SanityProperty {
  _id: string;
  _createdAt: string;
  titleEs: string;
  titleEn: string;
  titleFr?: string;
  titleDe?: string;
  titleAr?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  descriptionDe?: string;
  descriptionAr?: string;
  type: 'sale' | 'rent' | 'venta' | 'alquiler' | 'inversion'; // Sanity uses 'sale' and 'rent'
  price?: number;
  currency?: string;
  location?: string;
  image?: SanityImageSource | SanityImageSource[]; // Can be single image or array
  bedrooms?: number;
  bathrooms?: number;
  squareMeters?: number;
  squareFeet?: number;
  yearBuilt?: number;
  propertyType?: string;
  featured?: boolean;
  active?: boolean;
}

export interface SanityProject {
  _id: string;
  _createdAt: string;
  titleEs: string;
  titleEn: string;
  titleFr?: string;
  titleDe?: string;
  titleAr?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  descriptionDe?: string;
  descriptionAr?: string;
  category: 'interior_design' | 'renovation' | 'investment' | 'passive_house';
  image?: SanityImageSource;
  featured?: boolean;
  active?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  _createdAt: string;
  clientName: string;
  contentEs: string;
  contentEn: string;
  contentFr?: string;
  contentDe?: string;
  contentAr?: string;
  clientTitle?: string;
  rating?: number;
  image?: SanityImageSource;
  featured?: boolean;
  active?: boolean;
}

