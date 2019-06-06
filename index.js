const ping = require('ping');
const cron = require('node-cron');

cron.schedule('*/1 * * * * *', () => {
  ping.sys.probe("8.8.8.8", function(isAlive) {
    const msg = isAlive ? 'host ' + "8.8.8.8" + ' is alive' : 'host ' + "8.8.8.8" + ' is dead';
    console.log(msg);
    if (!isAlive) {
      const rapidCheck = cron.schedule("*/0.1 * * * * *", () => {
        ping.sys.probe("8.8.8.8", function(liveChecked) {
          console.log(liveChecked);
        });
      });

      setTImeout(() => {
        rapidCheck.destroy();
      }, 1000)
    };
  });
});
