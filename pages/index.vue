<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item.title">
            <v-card
              :color="item.color"
              dark
              class="text-center pa-4"
              min-height="250"
            >
              <v-card-title class="font-weight-bold headline">
                {{ item.title }}
              </v-card-title>
              <v-card-text>{{ item.description }}</v-card-text>
              <v-card-actions>
                <nuxt-link :to="item.link">
                  <v-btn color="white" text>go to page</v-btn>
                </nuxt-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">

export default {
  data() {
    return {
      items: [
    {
      title: 'Chat',
      description: 'AIボイスチャット',
      color: 'blue',
      link: '/chat'
    },
    {
      title: 'Translate',
      description: '複数の言語をAI翻訳する',
      color: 'green',
      link: '/translate'
    },
    {
      title: 'App',
      description: '簡単な要件を書き出すと、要件に従って HTML Web が自動的に生成されます。',
      color: 'purple',
      link: '/htmlGenerator'
    }
  ]
    };
  },
}

</script>
