<template>
    <div class="language-selector">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeLanguage('Chinese')">
            <v-list-item-title>Chinese</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLanguage('English')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLanguage('Japanese')">
            <v-list-item-title>Japanese</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>
  
  <script lang="ts">
  import eventBus from "@/eventBus";
  export default {
    methods: {
      changeLanguage(language: string) {
        eventBus.$emit("language-changed", language);
      },
    },
  };
  </script>
  
  <style scoped>
  .language-selector {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1000;
  }
  </style>
  