DROP TABLE IF EXISTS "shoutout_prices" CASCADE;--> statement-breakpoint
CREATE TABLE "shoutout_settings" (
	"account" text PRIMARY KEY NOT NULL,
	"price" integer DEFAULT 10000 NOT NULL,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"price_updated_at" timestamp with time zone,
	"status_updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shoutout_settings" ADD CONSTRAINT "shoutout_settings_account_user_id_fk" FOREIGN KEY ("account") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;