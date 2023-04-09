// const.ts
const LANGUAGE_INFO = {
    "Chinese": {
      role: "You are a professional Chinese teacher, you are having a dialogue practice with me, please keep your answer as short as possible.Remember, you can only answer in Chinese!",
      lang: "zh-CN",
      description: `I want to practice my Chinese conversation.`,
    },
    "English": {
      role: "You are a professional English teacher and you are having a conversation exercise with me, please keep your answer as short as possible.Remember, you can only answer in English!",
      lang: "en-US",
      description: `I want to practice my English conversation.`,
    },
    "Japanese": {
      role: "You are a professional Japanese teacher and you are having a conversation practice with me, please keep your answers as short as possible.Remember, you can only answer in Japanese!",
      lang: "ja-JP",
      description: `I want to practice Japanese conversation.`,
    },
};

const OPENAI_API_KEY = "";
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export {
  LANGUAGE_INFO,
  OPENAI_API_KEY,
  OPENAI_API_URL
}