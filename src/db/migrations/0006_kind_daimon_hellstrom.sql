CREATE TABLE IF NOT EXISTS "containers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"room_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stuff" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"container_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "rooms" RENAME COLUMN "subscribed_at" TO "name";--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containers" ADD CONSTRAINT "containers_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stuff" ADD CONSTRAINT "stuff_container_id_containers_id_fk" FOREIGN KEY ("container_id") REFERENCES "containers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
