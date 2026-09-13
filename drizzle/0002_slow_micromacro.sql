CREATE TABLE "shoutout_prices" (
	"account" text PRIMARY KEY NOT NULL,
	"price" numeric,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shoutout_prices_account_key" UNIQUE("account")
);
--> statement-breakpoint
ALTER TABLE "shoutout_prices" ADD CONSTRAINT "shoutout_prices_account_user_id_fk" FOREIGN KEY ("account") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;