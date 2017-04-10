const getReposts = require('./getReposters');

module.exports = (task) => {
  if (task.method === 'wall.getReposts');
    return getReposts(task);
  if (task.method === 'execute.code');
};
