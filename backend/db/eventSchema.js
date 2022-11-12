const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventType: {
    type: 'String',
    required: true,
  },
  code: {
    type: 'String',
  },
  ip: {
    type: 'String',
  },
  userAgent: {
    type: 'String',
  },
}, {
  timestamps: true,
});

module.exports = eventSchema;
