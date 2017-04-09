const vkapi = require('./../vkapi');
const sql = require('./../sql');
var fs = require('fs');

module.exports = (task) => {
  return vkapi(task.method, task.params)
  .then(result => result.profiles)
  .then(profiles => sql(`UPDATE tasks SET result = $1, status = 2 where id = ${task.id};`, [JSON.stringify(profiles)]))
  .catch(err => {
    console.log(err);
    return sql(`UPDATE tasks SET status = 3 WHERE id = ${task.id}`)
  })
};
