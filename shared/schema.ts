import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const petitions = pgTable("petitions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  zip: text("zip").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  signedAt: timestamp("signed_at").defaultNow(),
});

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  zip: text("zip").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  phoneBank: boolean("phone_bank").default(false),
  gatherSignatures: boolean("gather_signatures").default(false),
  attendEvents: boolean("attend_events").default(false),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertPetitionSchema = createInsertSchema(petitions).pick({
  firstName: true,
  lastName: true,
  street: true,
  city: true,
  zip: true,
  email: true,
  phone: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(5, "Valid ZIP code is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  firstName: true,
  lastName: true,
  zip: true,
  email: true,
  phone: true,
  phoneBank: true,
  gatherSignatures: true,
  attendEvents: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  zip: z.string().min(5, "Valid ZIP code is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Petition = typeof petitions.$inferSelect;
export type InsertPetition = z.infer<typeof insertPetitionSchema>;
export type Volunteer = typeof volunteers.$inferSelect;
export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;