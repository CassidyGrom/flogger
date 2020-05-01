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

  const User = model("User", UserSchema);

module.exports = User;