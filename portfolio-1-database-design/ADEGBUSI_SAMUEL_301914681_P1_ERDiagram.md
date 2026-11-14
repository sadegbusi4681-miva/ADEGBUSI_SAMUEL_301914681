# Student Result Portal — ER diagram

```mermaid
erDiagram
    direction LR
    students {
        bigint student_id PK
        text program
        integer cohort_year
    }
    courses {
        bigint course_id PK
        text course_code UK
        text title
        integer credits
    }
    assessments {
        bigint assessment_id PK
        bigint course_id FK
        text title
        date due_date
        numeric max_score
    }
    results {
        bigint result_id PK
        bigint student_id FK
        bigint assessment_id FK
        numeric score
        timestamptz submitted_at
    }
    courses ||--o{ assessments : "course_id"
    students ||--o{ results : "student_id"
    assessments ||--o{ results : "assessment_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/ADEGBUSI_SAMUEL_301914681_ERDiagram.png)
