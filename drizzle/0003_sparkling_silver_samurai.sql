ALTER TABLE "shoutout_prices" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
UPDATE "shoutout_prices" SET "price" = '10000' WHERE "price" IS NULL;--> statement-breakpoint
ALTER TABLE "shoutout_prices" ALTER COLUMN "price" SET DEFAULT '10000';--> statement-breakpoint
ALTER TABLE "shoutout_prices" ALTER COLUMN "price" SET NOT NULL;
