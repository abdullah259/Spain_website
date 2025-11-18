import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { sanityClient, queries } from '@/lib/sanity';
import type { SanityProperty, SanityProject, SanityTestimonial } from '@/lib/sanity';

/**
 * Custom hook for fetching data from Sanity
 */
export function useSanityQuery<T>(
  queryKey: string[],
  query: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const data = await sanityClient.fetch<T>(query);
      return data;
    },
    ...options,
  });
}

// Convenience hooks for common queries
export function useProperties(type?: string, limit?: number) {
  return useSanityQuery<SanityProperty[]>(
    ['properties', type || 'all', limit?.toString() || 'all'],
    queries.getAllProperties(type, limit)
  );
}

export function useFeaturedProperties(limit: number = 4) {
  return useSanityQuery<SanityProperty[]>(
    ['properties', 'featured', limit.toString()],
    queries.getFeaturedProperties(limit)
  );
}

export function usePropertyById(id: string) {
  return useSanityQuery<SanityProperty>(
    ['property', id],
    queries.getPropertyById(id)
  );
}

export function useProjects(category?: string, limit?: number) {
  return useSanityQuery<SanityProject[]>(
    ['projects', category || 'all', limit?.toString() || 'all'],
    queries.getAllProjects(category, limit)
  );
}

export function useFeaturedProjects(limit: number = 3) {
  return useSanityQuery<SanityProject[]>(
    ['projects', 'featured', limit.toString()],
    queries.getFeaturedProjects(limit)
  );
}

export function useTestimonials(limit?: number) {
  return useSanityQuery<SanityTestimonial[]>(
    ['testimonials', limit?.toString() || 'all'],
    queries.getAllTestimonials(limit)
  );
}

export function useFeaturedTestimonials(limit: number = 4) {
  return useSanityQuery<SanityTestimonial[]>(
    ['testimonials', 'featured', limit.toString()],
    queries.getFeaturedTestimonials(limit)
  );
}

