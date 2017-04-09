const vkapi = require('./../vkapi');
const sql = require('./../sql');
var fs = require('fs');

module.exports = (task) =>
  vkapi(task.method, task.params)
  .then(result => result.profiles)
  .then(profiles => {
    let strProfiles = JSON.stringify(profiles);
    while(strProfiles.indexOf("'") > 0)
      strProfiles = strProfiles.replace("'", "`");
    fs.writeFileSync('error.sql', strProfiles);
    const sqlQuery = `UPDATE tasks SET result = '${strProfiles}', status = 2 where id = ${task.id};`;
    return sql(sqlQuery);
  })
  .then(result => true)
  .catch(err => {
    console.log(err);
    return sql(`UPDATE tasks SET status = 3 WHERE id = ${task.id}`)
  });
