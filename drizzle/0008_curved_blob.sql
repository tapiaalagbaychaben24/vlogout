CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'PAUSED');--> statement-breakpoint
ALTER TABLE "shoutout_settings" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::"public"."status";--> statement-breakpoint
ALTER TABLE "shoutout_settings" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";