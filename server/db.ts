import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, properties, projects, testimonials, Property, Project, Testimonial } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get featured properties for homepage
 */
export async function getFeaturedProperties(limit: number = 4): Promise<Property[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(properties)
      .where(and(eq(properties.featured, true), eq(properties.active, true)))
      .orderBy(desc(properties.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get featured properties:", error);
    return [];
  }
}

/**
 * Get all properties with optional filtering
 */
export async function getProperties(type?: string, limit?: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    const conditions = type 
      ? and(eq(properties.active, true), eq(properties.type, type as any))
      : eq(properties.active, true);

    let query = db
      .select()
      .from(properties)
      .where(conditions)
      .orderBy(desc(properties.createdAt));

    if (limit) {
      return await query.limit(limit);
    }

    return await query;
  } catch (error) {
    console.error("[Database] Failed to get properties:", error);
    return [];
  }
}

/**
 * Get property by ID
 */
export async function getPropertyById(id: number): Promise<Property | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get property:", error);
    return undefined;
  }
}

/**
 * Get featured projects for homepage
 */
export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(projects)
      .where(and(eq(projects.featured, true), eq(projects.active, true)))
      .orderBy(desc(projects.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get featured projects:", error);
    return [];
  }
}

/**
 * Get all projects with optional filtering
 */
export async function getProjects(category?: string, limit?: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    const conditions = category
      ? and(eq(projects.active, true), eq(projects.category, category as any))
      : eq(projects.active, true);

    let query = db
      .select()
      .from(projects)
      .where(conditions)
      .orderBy(desc(projects.createdAt));

    if (limit) {
      return await query.limit(limit);
    }

    return await query;
  } catch (error) {
    console.error("[Database] Failed to get projects:", error);
    return [];
  }
}

/**
 * Get featured testimonials for homepage
 */
export async function getFeaturedTestimonials(limit: number = 4): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(testimonials)
      .where(and(eq(testimonials.featured, true), eq(testimonials.active, true)))
      .orderBy(desc(testimonials.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get featured testimonials:", error);
    return [];
  }
}

/**
 * Get all testimonials
 */
export async function getTestimonials(limit?: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db
      .select()
      .from(testimonials)
      .where(eq(testimonials.active, true))
      .orderBy(desc(testimonials.createdAt));

    if (limit) {
      return await query.limit(limit);
    }

    return await query;
  } catch (error) {
    console.error("[Database] Failed to get testimonials:", error);
    return [];
  }
}

