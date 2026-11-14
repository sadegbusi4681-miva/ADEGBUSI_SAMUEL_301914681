-- Fictional sample records for Student Result Portal.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year") VALUES (101, 'Synthetic Computing', 2025);
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year") VALUES (102, 'Synthetic Science', 2026);
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits") VALUES (201, 'SYN101', 'Synthetic Foundations', 15);
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits") VALUES (202, 'SYN202', 'Synthetic Methods', 30);
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score") VALUES (301, 201, 'Foundations Quiz', '2026-10-15', 100);
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score") VALUES (302, 202, 'Methods Exercise', '2026-11-15', 80);
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at") VALUES (401, 101, 301, 86, '2026-10-14T12:30:00Z');
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at") VALUES (402, 102, 302, 73.5, '2026-11-14T09:15:00+00:00');
COMMIT;
