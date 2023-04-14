<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col md="8">
                <v-textarea v-model="inputText" label="Enter text to translate" auto-grow clearable outlined
                    class="white--text" filled dense></v-textarea>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col md="6">
                <v-autocomplete v-model="selectedLanguage" :items="languages" item-text="label" item-value="value"
                    label="Select target language" clearable return-object outlined class="white--text" filled
                    dense></v-autocomplete>
            </v-col>
            <v-col md="2">
                <v-btn color="primary" @click="translateText" block :disabled="isButtonDisabled">Translate</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col md="8">
                <v-textarea v-model="translatedText" label="Translation result" auto-grow readonly outlined
                    class="white--text" filled dense></v-textarea>
            </v-col>
        </v-row>
    </v-container>
</template>

  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TRANSLATE_ROLE } from "@/constant";
import { openaiService } from '@/services/openaiService';

@Component
export default class Translation extends Vue {
    inputText: string = '';
    translatedText: string = '';
    selectedLanguage: any = null;
    isButtonDisabled: boolean = false;
    languages: Array<{ label: string; value: string }> = [
        // Language list
        { label: 'English', value: 'English' },
        { label: 'Chinese (Simplified)', value: 'Chinese (Simplified)' },
        { label: 'Chinese (Traditional)', value: 'Chinese (Traditional)' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Spanish', value: 'Spanish' },
        { label: 'French', value: 'French' },
        { label: 'German', value: 'German' },
        { label: 'Russian', value: 'Russian' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Dutch', value: 'Dutch' },
        { label: 'Swedish', value: 'Swedish' },
        { label: 'Danish', value: 'Danish' },
        { label: 'Norwegian', value: 'Norwegian' },
        { label: 'Finnish', value: 'Finnish' },
        { label: 'Turkish', value: 'Turkish' },
        { label: 'Polish', value: 'Polish' },
        { label: 'Hungarian', value: 'Hungarian' },
        { label: 'Greek', value: 'Greek' },
    ];

    async translateText() {
        if (!this.inputText || !this.selectedLanguage) return;
        this.isButtonDisabled = true;
        const prompt = `Please translate the following into ${this.selectedLanguage.value}: ${this.inputText}`;
        const text = await openaiService.fetchResponse(this.$axios, prompt, TRANSLATE_ROLE);
        this.translatedText = text ? text : 'please try again';
        this.isButtonDisabled = false;
    }
}
</script>
