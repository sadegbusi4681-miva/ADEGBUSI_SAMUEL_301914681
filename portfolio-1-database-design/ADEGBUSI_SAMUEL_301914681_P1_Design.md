# Student Result Portal — database design

My case study records students, courses, assessments, results.

## Users

- Students reviewing their results
- Academic staff recording and reviewing results

## Main operations

- Record a student's score for an assessment
- Review results by course and date
- Summarise scores by course

## Entities

| Entity | Information stored |
| --- | --- |
| students | Stores non-identifying student attributes needed to relate results to a student cohort. |
| courses | Stores course details used to organise assessments and result reports. |
| assessments | Defines an assessment belonging to a course and its maximum score and due date. |
| results | Stores a student's score and submission time for an assessment. |

## students

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| student_id | BIGINT | PK | Yes |
| program | TEXT |  | Yes |
| cohort_year | INTEGER |  | Yes |


## courses

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| course_id | BIGINT | PK | Yes |
| course_code | TEXT | Unique | Yes |
| title | TEXT |  | Yes |
| credits | INTEGER |  | Yes |
- Unique key: (course_code).

## assessments

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| assessment_id | BIGINT | PK | Yes |
| course_id | BIGINT | FK | Yes |
| title | TEXT |  | Yes |
| due_date | DATE |  | Yes |
| max_score | NUMERIC(18,2) |  | Yes |
- course_id → courses.course_id

## results

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| result_id | BIGINT | PK | Yes |
| student_id | BIGINT | FK | Yes |
| assessment_id | BIGINT | FK | Yes |
| score | NUMERIC(18,2) |  | Yes |
| submitted_at | TIMESTAMPTZ |  | Yes |
- student_id → students.student_id
- assessment_id → assessments.assessment_id
- Unique key: (student_id, assessment_id).

## Relationships and business rules

- Every assessment must reference an existing course.
- Every result must reference an existing student.
- Every result must reference an existing assessment.
- A student can have at most one result for an assessment; enforce this pair as a unique constraint.
- A recorded score must be between 0 and 100 inclusive.
- An assessment maximum score must be greater than 0 and no greater than 100.

## Assumptions

- Scores and assessment maximum scores are percentages from 0 through 100.
- A student may have at most one result for each assessment; corrections update that result.
- Student names and real student identifiers are omitted; use synthetic data only.
- Separate benchmark plan: use 20000 synthetic result rows to compare a submitted-date filtered lookup plan before and after a B-tree index on results.submitted_at. This is a proposed exercise, not a reported measurement.

