-- Student Result Portal: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."students" (
  "student_id" bigint NOT NULL,
  "program" text NOT NULL,
  "cohort_year" bigint NOT NULL,
  CONSTRAINT "pk_students" PRIMARY KEY ("student_id")
);
CREATE TABLE portfolio."courses" (
  "course_id" bigint NOT NULL,
  "course_code" text NOT NULL,
  "title" text NOT NULL,
  "credits" bigint NOT NULL,
  CONSTRAINT "pk_courses" PRIMARY KEY ("course_id"),
  CONSTRAINT "uq_courses_0" UNIQUE ("course_code")
);
CREATE TABLE portfolio."assessments" (
  "assessment_id" bigint NOT NULL,
  "course_id" bigint NOT NULL,
  "title" text NOT NULL,
  "due_date" date NOT NULL,
  "max_score" numeric(18,2) NOT NULL,
  CONSTRAINT "pk_assessments" PRIMARY KEY ("assessment_id")
);
CREATE TABLE portfolio."results" (
  "result_id" bigint NOT NULL,
  "student_id" bigint NOT NULL,
  "assessment_id" bigint NOT NULL,
  "score" numeric(18,2) NOT NULL,
  "submitted_at" timestamptz NOT NULL,
  CONSTRAINT "pk_results" PRIMARY KEY ("result_id"),
  CONSTRAINT "uq_results_0" UNIQUE ("student_id", "assessment_id")
);
ALTER TABLE portfolio."assessments" ADD CONSTRAINT "fk_assessments_0" FOREIGN KEY ("course_id") REFERENCES portfolio."courses" ("course_id");
ALTER TABLE portfolio."results" ADD CONSTRAINT "fk_results_0" FOREIGN KEY ("student_id") REFERENCES portfolio."students" ("student_id");
ALTER TABLE portfolio."results" ADD CONSTRAINT "fk_results_1" FOREIGN KEY ("assessment_id") REFERENCES portfolio."assessments" ("assessment_id");
ALTER TABLE portfolio."results" ADD CONSTRAINT "score_percentage_range" CHECK (("score" >= 0) AND ("score" <= 100));
ALTER TABLE portfolio."assessments" ADD CONSTRAINT "max_score_percentage_range" CHECK (("max_score" > 0) AND ("max_score" <= 100));
COMMIT;
