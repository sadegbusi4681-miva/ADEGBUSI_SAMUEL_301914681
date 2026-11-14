-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. students pk. Expected: pk_students, SQLSTATE 23505.
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year")
VALUES (101, 'Alternate Program', 2024);

-- 2. students nn id. Expected: student_id, SQLSTATE 23502.
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year")
VALUES (NULL, 'Synthetic Computing', 2025);

-- 3. students nn program. Expected: program, SQLSTATE 23502.
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year")
VALUES (901, NULL, 2025);

-- 4. students nn cohort. Expected: cohort_year, SQLSTATE 23502.
INSERT INTO portfolio."students" ("student_id", "program", "cohort_year")
VALUES (902, 'Synthetic Computing', NULL);

-- 5. courses pk. Expected: pk_courses, SQLSTATE 23505.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (201, 'SYN903', 'Alternate Foundations', 15);

-- 6. courses uq code. Expected: uq_courses_0, SQLSTATE 23505.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (903, 'SYN101', 'Alternate Foundations', 15);

-- 7. courses nn id. Expected: course_id, SQLSTATE 23502.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (NULL, 'SYN904', 'Alternate Course', 15);

-- 8. courses nn code. Expected: course_code, SQLSTATE 23502.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (904, NULL, 'Alternate Course', 15);

-- 9. courses nn title. Expected: title, SQLSTATE 23502.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (905, 'SYN905', NULL, 15);

-- 10. courses nn credits. Expected: credits, SQLSTATE 23502.
INSERT INTO portfolio."courses" ("course_id", "course_code", "title", "credits")
VALUES (906, 'SYN906', 'Alternate Course', NULL);

-- 11. assessments pk. Expected: pk_assessments, SQLSTATE 23505.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (301, 202, 'Alternate Quiz', '2026-12-01', 90);

-- 12. assessments fk course. Expected: fk_assessments_0, SQLSTATE 23503.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (907, 999, 'Unlinked Quiz', '2026-12-01', 90);

-- 13. assessments nn id. Expected: assessment_id, SQLSTATE 23502.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (NULL, 201, 'Alternate Quiz', '2026-12-01', 90);

-- 14. assessments nn course. Expected: course_id, SQLSTATE 23502.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (908, NULL, 'Alternate Quiz', '2026-12-01', 90);

-- 15. assessments nn title. Expected: title, SQLSTATE 23502.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (909, 201, NULL, '2026-12-01', 90);

-- 16. assessments nn due date. Expected: due_date, SQLSTATE 23502.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (910, 201, 'Alternate Quiz', NULL, 90);

-- 17. assessments nn max score. Expected: max_score, SQLSTATE 23502.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (911, 201, 'Alternate Quiz', '2026-12-01', NULL);

-- 18. results pk. Expected: pk_results, SQLSTATE 23505.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (401, 102, 302, 70, '2026-12-01T10:00:00Z');

-- 19. results uq student assessment. Expected: uq_results_0, SQLSTATE 23505.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (912, 101, 301, 70, '2026-12-01T10:00:00Z');

-- 20. results fk student. Expected: fk_results_0, SQLSTATE 23503.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (913, 999, 302, 70, '2026-12-01T10:00:00Z');

-- 21. results fk assessment. Expected: fk_results_1, SQLSTATE 23503.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (914, 102, 999, 70, '2026-12-01T10:00:00Z');

-- 22. results nn id. Expected: result_id, SQLSTATE 23502.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (NULL, 102, 302, 70, '2026-12-01T10:00:00Z');

-- 23. results nn student. Expected: student_id, SQLSTATE 23502.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (915, NULL, 302, 70, '2026-12-01T10:00:00Z');

-- 24. results nn assessment. Expected: assessment_id, SQLSTATE 23502.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (916, 102, NULL, 70, '2026-12-01T10:00:00Z');

-- 25. results nn score. Expected: score, SQLSTATE 23502.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (917, 102, 302, NULL, '2026-12-01T10:00:00Z');

-- 26. results nn submitted at. Expected: submitted_at, SQLSTATE 23502.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (918, 102, 302, 70, NULL);

-- 27. results check score. Expected: score_percentage_range, SQLSTATE 23514.
INSERT INTO portfolio."results" ("result_id", "student_id", "assessment_id", "score", "submitted_at")
VALUES (919, 102, 302, -1, '2026-12-01T10:00:00Z');

-- 28. assessments check max score. Expected: max_score_percentage_range, SQLSTATE 23514.
INSERT INTO portfolio."assessments" ("assessment_id", "course_id", "title", "due_date", "max_score")
VALUES (920, 201, 'Invalid Maximum Quiz', '2026-12-01', 0);
