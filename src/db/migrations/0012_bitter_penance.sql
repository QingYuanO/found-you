ALTER TABLE "containers" RENAME TO "container";--> statement-breakpoint
ALTER TABLE "rooms" RENAME TO "room";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_name_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "stuff" DROP CONSTRAINT "stuff_container_id_containers_id_fk";
--> statement-breakpoint
ALTER TABLE "stuff" DROP CONSTRAINT "stuff_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "container" DROP CONSTRAINT "containers_room_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "container" DROP CONSTRAINT "containers_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "room" DROP CONSTRAINT "rooms_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stuff" ADD CONSTRAINT "stuff_container_id_container_id_fk" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stuff" ADD CONSTRAINT "stuff_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "container" ADD CONSTRAINT "container_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "container" ADD CONSTRAINT "container_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");