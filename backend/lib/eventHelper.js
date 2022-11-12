const { Event } = require('../db');

const recordUrlEvent = async ({ code, ip, userAgent }) => {
  await Event.create({
    eventType: 'url', code, ip, userAgent,
  });
};

module.exports = {
  recordUrlEvent,
};
