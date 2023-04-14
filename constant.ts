// const.ts

// chat
interface LanguageInfo {
  [key: string]: {
    role: string;
    lang: string;
    description: string;
  };
}

const LANGUAGE_INFO: LanguageInfo = {
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

// translate
const TRANSLATE_ROLE = "You are a professional translator"

// html generator
const HTML_GENERATOR_ROLE = "You are an IT assistant who can write code."
const HTML_GENERATOR_ASK = "Please give me a complete html code according to the following requirements, I will copy it into the <iframe ref='iframe'></iframe> node, so don't have extra fonts, and don't put js and css are separated.In addition to the code, do not have any redundant words in the content of my answer. Here are the specific requirements:"
const OPENAI_API_KEY = "";
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export {
  LANGUAGE_INFO,
  TRANSLATE_ROLE,
  HTML_GENERATOR_ROLE,
  OPENAI_API_KEY,
  OPENAI_API_URL,
  HTML_GENERATOR_ASK,
}