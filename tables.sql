CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "author" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "recipe_id" int
);

ALTER TABLE "files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");