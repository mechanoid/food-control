-- -------------------------------------------------------------
-- TablePlus 3.8.0(336)
--
-- https://tableplus.com/
--
-- Database: d1lcc3mpc2581n
-- Generation Time: 2020-09-10 00:21:22.8750
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS snacks_id_seq;

-- Table Definition
CREATE TABLE "public"."snacks" (
    "id" int4 NOT NULL DEFAULT nextval('snacks_id_seq'::regclass),
    "date" date NOT NULL,
    "snack" bpchar(1024) NOT NULL,
    PRIMARY KEY ("id")
);

