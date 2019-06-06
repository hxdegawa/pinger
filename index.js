const ping = require('ping');
const cron = require('node-cron');

cron.schedule('*/5 * * * * *', () => {
  ping.sys.probe("8.8.8.8", function(isAlive){
    const msg = isAlive ? 'host ' + "8.8.8.8" + ' is alive' : 'host ' + "8.8.8.8" + ' is dead';
    console.log(msg);
  });
});
