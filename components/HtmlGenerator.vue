<template>
    <div class="html-generator">
        <div class="input-container">
            <v-textarea label="Enter your idea" v-model="userInput" class="user-input" outlined></v-textarea>
        </div>
        <div class="button-container">
            <v-btn color="primary" @click="generateHtml" :disabled="isButtonDisabled">Generate</v-btn>
        </div>
        <div class="iframe-container">
            <iframe ref="iframe" class="generated-iframe"></iframe>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { HTML_GENERATOR_ROLE, HTML_GENERATOR_ASK } from "@/constant";
import { openaiService } from '@/services/openaiService';

@Component
export default class HtmlGenerator extends Vue {
    userInput = '';
    isButtonDisabled = false;

    @Ref() iframe!: HTMLIFrameElement;

    async generateHtml() {
        if (!this.userInput) return;
        this.isButtonDisabled = true;
        const prompt = `${HTML_GENERATOR_ASK}: ${this.userInput}: `;
        const text = await openaiService.fetchResponse(this.$axios, prompt, HTML_GENERATOR_ROLE);
        const generatedHtml = text ? text : 'please try again';
        this.isButtonDisabled = false;

        this.iframe.contentWindow!.document.open();
        this.iframe.contentWindow!.document.write(generatedHtml);
        this.iframe.contentWindow!.document.close();
    }
}
</script>


  
<style scoped>
.html-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.input-container,
.button-container {
    width: 100%;
    margin-bottom: 20px;
}

.iframe-container {
    width: 100%;
    height: 500px;
    border: 1px solid #ccc;
}

.generated-iframe {
    width: 100%;
    height: 100%;
}
</style>
  