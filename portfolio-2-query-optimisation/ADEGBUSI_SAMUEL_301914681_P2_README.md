# Student Result Portal — SQL queries

## 1. Show related results, assessments, courses records (up to 20).

```sql
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
```

| results_result_id | results_score | assessments_assessment_id | assessments_title | courses_course_id | courses_course_code |
| --- | --- | --- | --- | --- | --- |
| 401 | 86 | 301 | Foundations Quiz | 201 | SYN101 |
| 402 | 73.5 | 302 | Methods Exercise | 202 | SYN202 |

## 2. Find results records where submitted_at matches "2026-10-14T12:30:00Z" (up to 20).

```sql
SELECT * FROM portfolio."results"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-10-14T12:30:00Z'
ORDER BY "result_id"
LIMIT 20;
```

| result_id | student_id | assessment_id | score | submitted_at |
| --- | --- | --- | --- | --- |
| 401 | 101 | 301 | 86 | 2026-10-14T12:30:00+00:00 |

## 3. Count results records for each student_id (up to 20 groups).

```sql
SELECT "student_id", count(*) AS record_count
FROM portfolio."results"
GROUP BY "student_id"
ORDER BY record_count DESC, "student_id" NULLS LAST
LIMIT 20;
```

| student_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.979 | 0.976, 0.979, 1.014 | Sort → Seq Scan | 112 |
| After index | 0.196 | 0.196, 0.187, 0.205 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 0.979 ms to 0.196 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.948..0.95 rows=20 loops=1)
  Seq Scan on results (actual time=0.015..0.916 rows=20 loops=1)
Planning Time: 0.33 ms
Execution Time: 0.976 ms
```

### Before index, run 2

```text
Sort (actual time=0.951..0.952 rows=20 loops=1)
  Seq Scan on results (actual time=0.016..0.918 rows=20 loops=1)
Planning Time: 0.356 ms
Execution Time: 0.979 ms
```

### Before index, run 3

```text
Sort (actual time=0.986..0.988 rows=20 loops=1)
  Seq Scan on results (actual time=0.016..0.952 rows=20 loops=1)
Planning Time: 0.359 ms
Execution Time: 1.014 ms
```

### After index, run 1

```text
Sort (actual time=0.129..0.131 rows=20 loops=1)
  Bitmap Heap Scan on results (actual time=0.029..0.092 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.58 ms
Execution Time: 0.196 ms
```

### After index, run 2

```text
Sort (actual time=0.126..0.128 rows=20 loops=1)
  Bitmap Heap Scan on results (actual time=0.03..0.091 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.505 ms
Execution Time: 0.187 ms
```

### After index, run 3

```text
Sort (actual time=0.122..0.124 rows=20 loops=1)
  Bitmap Heap Scan on results (actual time=0.028..0.088 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=20 loops=1)
Planning Time: 0.488 ms
Execution Time: 0.205 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run ADEGBUSI_SAMUEL_301914681_P2_Queries.sql, then ADEGBUSI_SAMUEL_301914681_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/ADEGBUSI_SAMUEL_301914681_P2_QueryResults.png) · [Index comparison](screenshots/ADEGBUSI_SAMUEL_301914681_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

