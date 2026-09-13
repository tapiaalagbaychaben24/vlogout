CREATE TABLE "meta" (
	"account" text PRIMARY KEY NOT NULL,
	"role" text DEFAULT 'INFLUENCER' NOT NULL,
	"balance" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meta" ADD CONSTRAINT "meta_account_user_id_fk" FOREIGN KEY ("account") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;