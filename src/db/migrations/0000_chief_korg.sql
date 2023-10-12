CREATE TABLE IF NOT EXISTS "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscribed_at" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
