ALTER TABLE "shoutout_prices" ALTER COLUMN "price" SET DATA TYPE integer USING "price"::integer;
ALTER TABLE "shoutout_prices" ALTER COLUMN "price" SET DEFAULT 10000;