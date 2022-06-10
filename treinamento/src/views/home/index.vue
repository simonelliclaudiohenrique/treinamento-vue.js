<template>
  <v-container class="fill-height">
    <v-row class="justify-center">
      <v-col
        cols="12"
        class="mt-10 text-center"
      >
        <h1>
          Olá
        </h1>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-img
          :src="logo"
          height="auto"
          max-width="250"
          style="opacity: 1;"
        />
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <h2>
          Seja bem vindo ao ambiente de treinamento. <br>
        </h2>
        <span>
          Aqui você aprenderá como funciona uma tela de CRUD básica em Vue.js e Vuetify
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Inicio',

  data () {
    return {
      logo: require('@/assets/logo.png')
    }
  }
}
</script>
