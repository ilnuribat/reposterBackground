/**
 * работает в фоновом режиме
 * берет задачу - выполняет
 * отмечает, что начал выполнять
 * в случае ошибки помечает, как будто он не выполнен
 * в идеале должен форкать себя и запускать узлы с разными access_token
 * чтобы запросы шли параллельно
 */
var getNext = require('./src/getNext');
var doTask = require('./src/doTask');

function infinity() {
  getNext()
  .then(task => {
    return doTask(task)
  })
  .then(result => {
    infinity();
  })
  .catch(err => {
    setTimeout(infinity, 1000);
  });
}
infinity();
console.log("starting background tasks");
