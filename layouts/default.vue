<template>
  <v-app>
    <v-main>
      <v-container fluid class="chat-container">
        <v-row class="justify-center">
          <v-col cols="12" md="8" lg="6">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.v-application {
  font-family: 'Roboto', sans-serif;
}

.chat-container {
  min-height: 100vh;
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
}

.v-list-item-title {
  font-weight: 500;
}

.v-btn {
  font-weight: 500;
}

.v-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-card-actions {
  background-color: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.v-text-field {
  font-weight: 400;
}
</style>
