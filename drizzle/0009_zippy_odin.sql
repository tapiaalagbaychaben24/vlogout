CREATE TABLE "banks" (
	"account" text PRIMARY KEY NOT NULL,
	"account_name" text NOT NULL,
	"account_number" text NOT NULL,
	"provider_code" text NOT NULL,
	"provider_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_account_user_id_fk" FOREIGN KEY ("account") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;