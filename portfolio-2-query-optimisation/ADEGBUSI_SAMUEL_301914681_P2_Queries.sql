-- Show related results, assessments, courses records (up to 20).
SELECT t0."result_id" AS "results_result_id",
       t0."score" AS "results_score",
       t1."assessment_id" AS "assessments_assessment_id",
       t1."title" AS "assessments_title",
       t2."course_id" AS "courses_course_id",
       t2."course_code" AS "courses_course_code"
FROM portfolio."results" t0
JOIN portfolio."assessments" t1 ON t0."assessment_id" = t1."assessment_id"
JOIN portfolio."courses" t2 ON t1."course_id" = t2."course_id"
ORDER BY t0."result_id", t1."assessment_id", t2."course_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."result_id" AS "results_result_id",
       t0."score" AS "results_score",
       t1."assessment_id" AS "assessments_assessment_id",
       t1."title" AS "assessments_title",
       t2."course_id" AS "courses_course_id",
       t2."course_code" AS "courses_course_code"
FROM portfolio."results" t0
JOIN portfolio."assessments" t1 ON t0."assessment_id" = t1."assessment_id"
JOIN portfolio."courses" t2 ON t1."course_id" = t2."course_id"
ORDER BY t0."result_id", t1."assessment_id", t2."course_id"
LIMIT 20;

-- Find results records where submitted_at matches "2026-10-14T12:30:00Z" (up to 20).
SELECT * FROM portfolio."results"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-10-14T12:30:00Z'
ORDER BY "result_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."results"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-10-14T12:30:00Z'
ORDER BY "result_id"
LIMIT 20;

-- Count results records for each student_id (up to 20 groups).
SELECT "student_id", count(*) AS record_count
FROM portfolio."results"
GROUP BY "student_id"
ORDER BY record_count DESC, "student_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "student_id", count(*) AS record_count
FROM portfolio."results"
GROUP BY "student_id"
ORDER BY record_count DESC, "student_id" NULLS LAST
LIMIT 20;
