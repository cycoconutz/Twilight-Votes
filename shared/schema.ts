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
  "The Arborec",
  "The Argent Flight",
  "The Barony of Letnev",
  "The Clan of Saar",
  "The Crimson Rebellion",
  "The Deepwrought Scholarate",
  "The Embers of Muaat",
  "The Emirates of Hacan",
  "The Federation of Sol",
  "The Ghosts of Creuss",
  "The L1Z1X Mindnet",
  "The Mentak Coalition",
  "The Naalu Collective",
  "The Nekro Virus",
  "The Ral Nel Consortium",
  "The Universities of Jol-Nar",
  "The Winnu",
  "The Xxcha Kingdom",
  "The Yin Brotherhood",
  "The Yssaril Tribes",
  "Titans of Ul",
  "Vuil'Raith Cabal"
].sort();

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Player"),
  faction: text("faction").notNull(),
  totalVotes: integer("total_votes").notNull().default(0),
  currentVotes: integer("current_votes").notNull().default(0),
});

export const insertPlayerSchema = createInsertSchema(players).omit({ id: true });

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
