SELECT name, email, phone
FROM students
WHERE end_date IS NOT NULL
AND students.github IS  NULL;