const { Schema, model } = require('mongoose');
const JournalSchema = require ('./Journal');

const UserSchema = new Schema (
  {
    username:{
      type: String
    },
    journalEntries: [
      JournalSchema
    ]
  });