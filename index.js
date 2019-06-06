const ping = require('ping');
const cron = require('node-cron');

cron.schedule('*/1 * * * * *', () => {
  ping.sys.probe("8.8.8.8", function(isAlive) {
    const msg = isAlive ? 'host ' + "8.8.8.8" + ' is alive' : 'host ' + "8.8.8.8" + ' is dead';
    console.log(msg);
    if (!isAlive) {
      const rapidCheck = setInterval(() => {
        ping.sys.probe("8.8.8.8", function(liveChecked) {
          console.log(liveChecked);
        });
      }, 100);

      setTimeout(() => {
        clearInterval(rapidCheck);
      }, 1000);
    };
  });
});
