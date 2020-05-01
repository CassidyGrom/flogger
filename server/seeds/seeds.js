const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/flogger");

const EmotionSeed = [
  {
    primaryEmotion: "Affectionate",
    secondaryEmotion: [
      "compassionate",
      "friendly",
      "loving",
      "open hearted",
      "sympathetic",
      "tender",
      "warm"
    ]
  },
  {
    primaryEmotion: "Engaged",
    secondaryEmotion: [
      "absorbed",
      "alert",
      "curious",
      "engrossed",
      "enchanted",
      "entranced",
      "fascinated",
      "interested",
      "intrigued",
      "involved",
      "spellbound",
      "stimulated"
    ]
  },
  {
    primaryEmotion: "Hopeful",
    secondaryEmotion: ["expectant", "encouraged", "optimistic"]
  },
  {
    primaryEmotion: "Confident",
    secondaryEmotion: ["empowered", "open", "proud", "safe", "secure"]
  },
  {
    primaryEmotion: "Excited",
    secondaryEmotion: [
      "amazed",
      "animated",
      "ardent",
      "aroused",
      "astonished",
      "dazzled",
      "eager",
      "energetic",
      "enthusiastic",
      "giddy",
      "invigorated",
      "lively",
      "passionate",
      "surprised",
      "vibrant"
    ]
  },
  {
    primaryEmotion: "Grateful",
    secondaryEmotion: ["appreciative", "moved", "thankful", "touched"]
  },
  {
    primaryEmotion: "Inspired",
    secondaryEmotion: ["amazed", "awed", "wonder"]
  },
  {
    primaryEmotion: "Joyful",
    secondaryEmotion: [
      "amused",
      "delighted",
      "glad",
      "happy",
      "jubilant",
      "pleased",
      "tickled"
    ]
  },
  {
    primaryEmotion: "Exhilarated",
    secondaryEmotion: [
      "blissful",
      "ecstatic",
      "elated",
      "enthralled",
      "exuberant",
      "radiant",
      "rapturous",
      "thrilled"
    ]
  },
  {
    primaryEmotion: "Peaceful",
    secondaryEmotion: [
      "calm",
      "clear headed",
      "comfortable",
      "centered",
      "content",
      "equanimous",
      "fulfilled",
      "mellow",
      "quiet",
      "relaxed",
      "relieved",
      "satisfied",
      "serene",
      "still",
      "tranquil",
      "trusting"
    ]
  },
  {
    primaryEmotion: "Refreshed",
    secondaryEmotion: [
      "enlivened",
      "rejuvenated",
      "renewed",
      "rested",
      "restored",
      "revived"
    ]
  },
  {
    primaryEmotion: "Afraid",
    secondaryEmotion:[
    "apprehensive",
    "dread",
    "foreboding",
    "frightened",
    "mistrustful",
    "panicked",
    "petrified",
    "scared",
    "suspicious",
    "terrified",
    "wary",
    "worried"
    ]},
    {
    primaryEmotion: "Annoyed",
    secondaryEmotion:[
    "aggravated",
    "dismayed",
    "disgruntled",
    "displeased",
    "exasperated",
    "frustrated",
    "impatient",
    "irritated",
    "irked"
    ]},
    {
    primaryEmotion: "Angry",
    secondaryEmotion:[
    "aggravated",
    "dismayed",
    "disgruntled",
    "displeased",
    "exasperated",
    "frustrated",
    "impatient",
    "irritated",
    "irked"
    ]},
    {primaryEmotion: "Aversion",
    secondaryEmotion:[
    "animosity",
    "appalled",
    "contempt",
    "disgusted",
    "dislike",
    "hate",
    "horrified",
    "hostile",
    "repulsed"
    ]},
    {primaryEmotion: "Confused",
    secondaryEmotion:[
    "ambivalent",
    "baffled",
    "bewildered",
    "dazed",
    "hesitant",
    "lost",
    "mystified",
    "perplexed",
    "puzzled",
    "torn"
    ]},
    {primaryEmotion: "Disconnected",
    secondaryEmotion:[
    "alienated",
    "aloof",
    "apathetic",
    "bored",
    "cold",
    "detached",
    "distant",
    "distracted",
    "indifferent",
    "numb",
    "removed",
    "uninterested",
    "withdrawn"
    ]},
    {primaryEmotion: "Disquiet",
    secondaryEmotion:[
    "agitated",
    "alarmed",
    "discombobulated",
    "disconcerted",
    "disturbed",
    "perturbed",
    "rattled",
    "restless",
    "shocked",
    "startled",
    "surprised",
    "troubled",
    "turbulent",
    "turmoil",
    "uncomfortable",
    "uneasy",
    "unnerved",
    "unsettled",
    "upset"
    ]},
    {primaryEmotion: "Embarrassed",
    secondaryEmotion:[
    "ashamed",
    "chagrined",
    "flustered",
    "guilty",
    "mortified",
    "self‐conscious"
    ]},
    {primaryEmotion: "Fatigue",
    secondaryEmotion:[
    "beat",
    "burnt out",
    "depleted",
    "exhausted",
    "lethargic",
    "listless",
    "sleepy",
    "tired",
    "weary",
    "worn out"
    ]},
    {
      primaryEmotion: "Pain",
      secondaryEmotion: [
        "agony",
"anguished",
"bereaved",
"devastated",
"grief",
"heartbroken",
"hurt",
"lonely",
"miserable",
"regretful",
"remorseful"
      ]
    },
    {primaryEmotion: "Sad",
    secondaryEmotion:[
    "depressed",
    "dejected",
    "despair",
    "despondent",
    "disappointed",
    "discouraged",
    "disheartened",
    "forlorn",
    "gloomy",
    "heavy hearted",
    "hopeless",
    "melancholy",
    "unhappy",
    "wretched"
    ]},
    {primaryEmotion: "Tense",
    secondaryEmotion:[
    "anxious",
    "cranky",
    "distressed",
    "distraught",
    "edgy",
    "fidgety",
    "frazzled",
    "irritable",
    "jittery",
    "nervous",
    "overwhelmed",
    "restless",
    "stressed out"
    ]},
  {
    primaryEmotion: "Vulnerable",
    secondaryEmotion: [
      "fragile",
"guarded",
"helpless",
"insecure",
"leery",
"reserved",
"sensitive",
"shaky"
    ]
  },
  {
    primaryEmotion: "Yearning",
    secondaryEmotion: [
      "envious",
"jealous",
"longing",
"nostalgic",
"pining",
"wistful"
    ]
  }
];

db.Emotion.remove({})
  .then(() => db.Emotion.collection.insertMany(EmotionSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });