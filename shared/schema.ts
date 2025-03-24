import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  rating: text("rating").notNull(),
  ratingCount: integer("rating_count").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
