import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const FACTIONS = [
  "Empyrean",
  "Firmament/The Obsidian",
  "Last Bastion",
  "Mahact Gene-Sorcerers",
  "Naaz-Rokha Alliance",
  "Nomad",
  "Sardakk N'orr",
  "Arborec",
  "Argent Flight",
  "Barony of Letnev",
  "Clan of Saar",
  "Crimson Rebellion",
  "Deepwrought Scholarate",
  "Embers of Muaat",
  "Emirates of Hacan",
  "Federation of Sol",
  "Ghosts of Creuss",
  "L1Z1X Mindnet",
  "Mentak Coalition",
  "Naalu Collective",
  "Nekro Virus",
  "Ral Nel Consortium",
  "Universities of Jol-Nar",
  "Winnu",
  "Xxcha Kingdom",
  "Yin Brotherhood",
  "Yssaril Tribes",
  "Titans of Ul",
  "Vuil'Raith Cabal"
].sort();

// Schema is kept for type definitions, though data will be in localStorage
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Player"),
  faction: text("faction").notNull(),
  totalVotes: integer("total_votes").notNull().default(0),
  agenda1Votes: integer("agenda1_votes").notNull().default(0),
  agenda2Votes: integer("agenda2_votes").notNull().default(0),
});

export const insertPlayerSchema = createInsertSchema(players).omit({ id: true });

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

export interface Session {
  id: string;
  name: string;
  createdAt: number;
  players: Player[];
  agenda1Name?: string;
  agenda2Name?: string;
}
