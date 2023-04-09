<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card flat class="chat-window">
          <v-list two-line class="message-list" ref="messageList">
            <v-list-item v-for="message in messages" :key="message.id" class="py-1">
              <v-list-item-content
                :class="{ 'user1-message': message.user === 'chat', 'user2-message': message.user === 'Me' }">
                <v-list-item-title>
                  <span class="user">{{ message.user }}:</span>
                </v-list-item-title>
                <v-list-item-subtitle class="message-text">
                  {{ message.text }}
                  <v-btn icon small @click="playMessage(message.text)">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="isRecording && tempResult" class="py-1">
              <v-list-item-content class="user2-message">
                <v-list-item-title>
                  <span class="user">Me:</span>
                </v-list-item-title>
                <v-list-item-subtitle class="message-text">{{ tempResult }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card-actions class="justify-center">
          <v-btn icon large color="white" @click="startSpeechRecognition">
            <v-icon v-if="!isRecording" :disabled="isButtonDisabled">mdi-microphone</v-icon>
            <v-icon v-else>mdi-stop</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import eventBus from "@/eventBus";
import { LANGUAGE_INFO } from "@/constant";
import { openaiService } from '@/services/openaiService';

export default {
  data() {
    return {
      messages: [],
      isRecording: false,
      tempResult: '',
      recognition: null,
      language: '',
      isButtonDisabled: false,
    };
  },
  created() {
    eventBus.$on("language-changed", this.onLanguageChanged);
    this.recognition = null;
  },
  beforeDestroy() {
    eventBus.$off("language-changed", this.onLanguageChanged);
    this.recognition = null;
  },
  methods: {
    onLanguageChanged(selectedLanguage) {
      if(this.language != selectedLanguage) {
        this.language = selectedLanguage
        this.sendMessage(LANGUAGE_INFO[this.language].description);
      }
    },
    onResult(event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          this.tempResult +=  event.results[i][0].transcript + '. ';
        }
      }
      this.scrollToBottom();
    },

    onEnd() {
      this.addMessage(this.tempResult);
      this.tempResult = "";
    },

    onError(event) {
      console.error(`Speech recognition error: ${event.error}`);
      this.onEnd();
    },

    startSpeechRecognition() {
      this.cleanUpRecognition();
      if(!this.language) {
        alert('Please select a language first on the right!')
        return;
      }

      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        console.log(LANGUAGE_INFO[this.language].lang);
        this.recognition.lang = LANGUAGE_INFO[this.language].lang; // 设置识别的语言
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.addEventListener("error", this.onError);
        this.recognition.addEventListener("result", this.onResult);
        this.recognition.addEventListener("end", this.onEnd);

        if (!this.isRecording) {
          this.recognition.start();
          this.isRecording = true;
        } else {
          this.isRecording = false;
          this.recognition.stop();
          this.onEnd();
          // this.cleanUpRecognition();
        }
      } else {
        console.error('SpeechRecognition API not supported in this browser.');
      }
    },

    addMessage(text) {
      if(text && !this.isButtonDisabled){
        this.messages.push({ id: Date.now(), user: "Me", text });
        this.scrollToBottom();
        this.sendMessage(text);
      }
    },

    playMessage(messageText) {
      const utterance = new SpeechSynthesisUtterance(messageText);
      utterance.lang = LANGUAGE_INFO[this.language].lang;
      console.log(LANGUAGE_INFO[this.language].lang);
      speechSynthesis.speak(utterance);
    },

    cleanUpRecognition() {
      if (this.recognition) {
        this.recognition.removeEventListener('result', this.onResult);
        this.recognition.removeEventListener('end', this.onEnd);
        this.recognition.removeEventListener('error', this.onError);
        this.recognition.removeEventListener('speechend', this.onSpeechEnd);

        this.recognition = null;
      }
    },

    async sendMessage(prompt) {
      if(this.recognition) {
        this.cleanUpRecognition();
      }
      this.isButtonDisabled = true;
      const text = await openaiService.fetchResponse(this.$axios, prompt, LANGUAGE_INFO[this.language].role);
      if(text) {
        this.messages.push({ id: Date.now(), user: "gpt", text });
        this.playMessage(text);
        this.scrollToBottom();
      }
      this.isButtonDisabled = false;
    },

    scrollToBottom() {
    this.$nextTick(() => {
      const messageList = this.$refs.messageList.$el;
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    });
  },
  },
};
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 150px);
  overflow-y: hidden;
  border-radius: 8px;
  padding: 16px;
}

.message-list {
  height: 100%;
  overflow-y: auto;
}

.user1-message {
  text-align: left;
  background-color: rgba(0, 135, 147, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
}

.user2-message {
  text-align: right;
  background-color: rgba(0, 191, 114, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
}

.user {
  font-weight: bold;
}

.message-text {
  white-space: pre-wrap;
}

.v-btn {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-icon {
  color: #004d7a;
}
</style>
