CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "image" text NOT NULL,
  "title" text NOT NULL,
  "author" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "created_at" timestamp DEFAULT (now())
);