import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const isServerless = process.env.NETLIFY === "true";

export const db = isServerless
  ? drizzleNeon(neon(DATABASE_URL))
  : drizzlePostgres(postgres(DATABASE_URL, { ssl: "require" }));
