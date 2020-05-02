const { Schema, model } = require('mongoose');
const moment = require('moment');

const JournalSchema = new Schema(
  {
    primaryEmotion: {
      type: String
    },
    secondaryEmotion: {
      type: String
    },
    journalText: {
      type: String,
      required: 'Please write your entry here.',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = JournalSchema;