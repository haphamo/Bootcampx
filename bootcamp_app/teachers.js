const { Pool } = require('pg');//getting modules to connect to database (bootcampx)

const pool = new Pool({//creating instance of Pool
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${process.argv[2] || 'JUL02'}'
ORDER BY teacher
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohorts}: ${user.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));