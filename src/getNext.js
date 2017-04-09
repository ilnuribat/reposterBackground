const sql = require('./../sql');

module.exports = () => 
  sql(`SELECT id, method, params FROM tasks WHERE status = 0 ORDER BY id LIMIT 1;`)
  .then(result => {
    //mark this task as pending - 1;
    if (result.rows.length === 0)
      throw new Error('no tasks');
    let task = result.rows[0];
    return task;
  })
  .then(task => sql(`UPDATE tasks SET status = 1 WHERE id = ${task.id} AND status = 0;`)
    .then(result => task)
  )
  .then(task => {
    console.log(task);
    return task;
  });