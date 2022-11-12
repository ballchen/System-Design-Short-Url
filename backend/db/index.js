const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('mongoUrl'));

const shortUrlSchema = require('./shortUrlSchema');
const eventSchema = require('./eventSchema');

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = {
  ShortUrl,
  Event,
};
