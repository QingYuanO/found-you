ALTER TYPE "room_type" ADD VALUE 'living_room';--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "room_type" SET DEFAULT 'common_room';--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "room_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "description" text;