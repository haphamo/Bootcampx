const { Pool } = require('pg');//getting modules to connect to database (bootcampx)

const pool = new Pool({//creating instance of Pool
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
//function below allows us to do queries as a string
// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
//   console.log(res.rows);//returns promise when resolved
// })
// .catch(err => console.error('query error', err.stack));

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
pool.query(queryString, values)

.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));