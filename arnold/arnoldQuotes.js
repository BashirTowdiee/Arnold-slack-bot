const quotes = [
  "I’ll be back!",
  "Consider that a divorce!",
  "If it bleeds, we can kill it.",
  "Hasta la vista, baby!",
  "I let him go.",
  "He had to split.",
  "What a hothead!",
  "What a pain in the neck",
  "Here’s your Sub-Zero… now plain zero.",
  "Let off some steam.",
  "Stick around.",
  "Knock-knock.",
  "Come with me if you want to live.",
  "I’m not into politics, I’m into survival.",
  "What is best in life? To crush your enemies, see them driven before you, and to hear the lamentation of their women!",
  "I eat Green Berets for breakfast. And right now, I’m very hungry!",
  "You’ve just been erased.",
  "You’re a funny guy Sully, I like you. That’s why I’m going to kill you last.",
  "I lied.",
  "Get to da Choppa!",
  "Its not a tumor!",
  "Who is your daddy and what does he do?",
  "I don't know how much longer I can hold this",
  "Come with me if you want to live",
  "I need your clothes, your boots, and your motorcycle",
  "Unlikely. I’m an obsolete design. T-X is faster, more powerful and more intelligent. It’s a far more effective killing machine",
  "You are terminated",
  "He’ll live",
];

module.exports = function () {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return quote;
};
