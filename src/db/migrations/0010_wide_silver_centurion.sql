DO $$ BEGIN
 CREATE TYPE "room_type" AS ENUM('bedroom', ' living_room', 'kitchen', 'toilet', 'study', 'common_room');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "room_type" "room_type";