# Student Result Portal — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| student_id | results records (list) |
| --- | --- |
| 101 | [401] |
| 102 | [402] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| results.result_id | results.student_id | results.assessment_id | students.student_id | students.program | assessments.assessment_id | assessments.course_id | assessments.title |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 401 | 101 | 301 | 101 | Synthetic Computing | 301 | 201 | Foundations Quiz |
| 402 | 102 | 302 | 102 | Synthetic Science | 302 | 202 | Methods Exercise |

Key: result_id.

## 2NF: depend on the whole key

results: student_id is a proper part of candidate key (student_id, assessment_id), and determines students details. results: assessment_id is a proper part of candidate key (student_id, assessment_id), and determines assessments details.

## students_example

| students.student_id | students.program |
| --- | --- |
| 101 | Synthetic Computing |
| 102 | Synthetic Science |

## assessments_example

| assessments.assessment_id | assessments.course_id | assessments.title |
| --- | --- | --- |
| 301 | 201 | Foundations Quiz |
| 302 | 202 | Methods Exercise |

## results_example

| results.result_id | results.student_id | results.assessment_id |
| --- | --- | --- |
| 401 | 101 | 301 |
| 402 | 102 | 302 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## students

| student_id | program | cohort_year |
| --- | --- | --- |
| 101 | Synthetic Computing | 2025 |
| 102 | Synthetic Science | 2026 |

## courses

| course_id | course_code | title | credits |
| --- | --- | --- | --- |
| 201 | SYN101 | Synthetic Foundations | 15 |
| 202 | SYN202 | Synthetic Methods | 30 |

## assessments

| assessment_id | course_id | title | due_date | max_score |
| --- | --- | --- | --- | --- |
| 301 | 201 | Foundations Quiz | 2026-10-15 | 100 |
| 302 | 202 | Methods Exercise | 2026-11-15 | 80 |

## results

| result_id | student_id | assessment_id | score | submitted_at |
| --- | --- | --- | --- | --- |
| 401 | 101 | 301 | 86 | 2026-10-14T12:30:00+00:00 |
| 402 | 102 | 302 | 73.5 | 2026-11-14T09:15:00+00:00 |

## Dependencies

- students: (student_id) → program, cohort_year
- courses: (course_id) → course_code, title, credits
- assessments: (assessment_id) → course_id, title, due_date, max_score
- results: (result_id) → student_id, assessment_id, score, submitted_at

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
