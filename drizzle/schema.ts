import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Properties table for real estate listings
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  sanityId: varchar("sanityId", { length: 255 }).unique(),
  titleEs: varchar("titleEs", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }),
  titleDe: varchar("titleDe", { length: 255 }),
  titleAr: varchar("titleAr", { length: 255 }),
  descriptionEs: text("descriptionEs"),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  descriptionDe: text("descriptionDe"),
  descriptionAr: text("descriptionAr"),
  type: mysqlEnum("type", ["venta", "alquiler", "inversion"]).notNull(),
  price: int("price"),
  currency: varchar("currency", { length: 3 }).default("EUR"),
  location: varchar("location", { length: 255 }),
  imageUrl: text("imageUrl"),
  imageKey: text("imageKey"),
  videoUrl: text("videoUrl"),
  videoKey: text("videoKey"),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  squareMeters: int("squareMeters"),
  squareFeet: int("squareFeet"),
  yearBuilt: int("yearBuilt"),
  propertyType: varchar("propertyType", { length: 100 }),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Projects table for investment and technical service projects
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  titleEs: varchar("titleEs", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }),
  titleDe: varchar("titleDe", { length: 255 }),
  titleAr: varchar("titleAr", { length: 255 }),
  descriptionEs: text("descriptionEs"),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  descriptionDe: text("descriptionDe"),
  descriptionAr: text("descriptionAr"),
  category: mysqlEnum("category", ["interior_design", "renovation", "investment", "passive_house"]).notNull(),
  imageUrl: text("imageUrl"),
  imageKey: text("imageKey"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Testimonials table for client feedback
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  contentEs: text("contentEs").notNull(),
  contentEn: text("contentEn").notNull(),
  contentFr: text("contentFr"),
  contentDe: text("contentDe"),
  contentAr: text("contentAr"),
  clientTitle: varchar("clientTitle", { length: 255 }),
  rating: int("rating").default(5),
  imageUrl: text("imageUrl"),
  imageKey: text("imageKey"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Settings table for site configuration
 */
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

/**
 * Exchange rates table for currency conversion
 */
export const exchangeRates = mysqlTable("exchangeRates", {
  id: int("id").autoincrement().primaryKey(),
  baseCurrency: varchar("baseCurrency", { length: 3 }).notNull(),
  targetCurrency: varchar("targetCurrency", { length: 3 }).notNull(),
  rate: decimal("rate", { precision: 10, scale: 6 }).notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExchangeRate = typeof exchangeRates.$inferSelect;
export type InsertExchangeRate = typeof exchangeRates.$inferInsert;

