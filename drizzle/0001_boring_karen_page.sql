CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"avatar" text,
	"cover" text,
	"name" text,
	"number" text,
	"handle" text,
	"bio" text,
	"about" text,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_handle_key" UNIQUE("handle")
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;