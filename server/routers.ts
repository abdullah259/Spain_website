import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getFeaturedProperties,
  getProperties,
  getPropertyById,
  getFeaturedProjects,
  getProjects,
  getFeaturedTestimonials,
  getTestimonials,
} from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  properties: router({
    /**
     * Get featured properties for homepage
     */
    getFeatured: publicProcedure.query(async () => {
      return await getFeaturedProperties(4);
    }),

    /**
     * Get all properties with optional filtering
     */
    getAll: publicProcedure
      .input(
        z.object({
          type: z.enum(["venta", "alquiler", "inversion"]).optional(),
          limit: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        return await getProperties(input.type, input.limit);
      }),

    /**
     * Get property by ID
     */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getPropertyById(input.id);
      }),
  }),

  projects: router({
    /**
     * Get featured projects for homepage
     */
    getFeatured: publicProcedure.query(async () => {
      return await getFeaturedProjects(3);
    }),

    /**
     * Get all projects with optional filtering
     */
    getAll: publicProcedure
      .input(
        z.object({
          category: z.enum(["interior_design", "renovation", "investment", "passive_house"]).optional(),
          limit: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        return await getProjects(input.category, input.limit);
      }),
  }),

  testimonials: router({
    /**
     * Get featured testimonials for homepage
     */
    getFeatured: publicProcedure.query(async () => {
      return await getFeaturedTestimonials(4);
    }),

    /**
     * Get all testimonials
     */
    getAll: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await getTestimonials(input.limit);
      }),
  }),
});

export type AppRouter = typeof appRouter;

