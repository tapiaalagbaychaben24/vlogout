CREATE TYPE "public"."role" AS ENUM('INFLUENCER', 'ADMIN');--> statement-breakpoint
ALTER TABLE "meta" ALTER COLUMN "role" SET DEFAULT 'INFLUENCER'::"public"."role";--> statement-breakpoint
ALTER TABLE "meta" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";