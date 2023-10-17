ALTER TABLE "containers" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "containers" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stuff" ALTER COLUMN "container_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stuff" ALTER COLUMN "user_id" SET NOT NULL;