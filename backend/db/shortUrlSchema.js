const mongoose = require('mongoose');

const { Schema } = mongoose;

const shortUrlSchema = new Schema({
  url: {
    type: 'string',
    required: true,
  },
  code: {
    type: 'string',
    required: true,
  },
  deletedAt: {
    type: 'Date',
    default: null,
  },
}, {
  timestamps: true,
});

shortUrlSchema.index({ url: 1, deletedAt: 1 }, { unique: true });

module.exports = shortUrlSchema;
