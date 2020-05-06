const { Schema, model } = require('mongoose');

const EmotionSchema = new Schema(
  {
    primaryEmotion: {type: String},
    secondaryEmotion: []
  }
);

const Emotion = model("Emotion", EmotionSchema);

module.exports = Emotion;