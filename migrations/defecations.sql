-- -------------------------------------------------------------
-- TablePlus 3.8.0(336)
--
-- https://tableplus.com/
--
-- Database: d1lcc3mpc2581n
-- Generation Time: 2020-09-09 21:52:48.3470
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."defecations" (
    "id" SERIAL PRIMARY KEY,
    "quality" int4,
    "defecation_date" date
);

