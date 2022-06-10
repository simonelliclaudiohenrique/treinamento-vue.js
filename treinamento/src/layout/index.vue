<template>
  <v-main>
    <!-- TODO: Toolbar do sistema -->
    <v-app-bar
      app
      class="elevation-0"
      color="white"
    >
      <div class="d-flex align-center">
        <v-img
          :src="require('@/assets/logo.png')"
          alt="Logo"
          class="shrink mr-1"
          contain
          transition="scale-transition"
          width="45"
          @click="$router.currentRoute.path !== '/inicio'
            ? $router.push('/inicio')
            : ''"
        />

        <v-toolbar-title
          class="display-1 ml-0 mt-1 font-weight-bold primary--text"
          style="cursor: pointer"
          @click="$router.currentRoute.path !== '/inicio'
            ? $router.push('/inicio')
            : ''"
        >
          Treinamento
        </v-toolbar-title>
      </div>

      <v-spacer />

      <div>
        <v-menu
          rounded="b-xl"
          right
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              class="white--text ma-5 title"
              outlined
              large
              v-on="on"
            >
              <v-icon
                left
                size="25"
              >
                mdi-menu
              </v-icon>
              Menus
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, idx) in links"
              :key="idx"
              :to="item.path"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="item.icone" />
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.nome }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="d-flex d-inline-flex">
        <v-menu
          bottom
          left
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-avatar
              color="primary"
              class="white--text font-weight-black headline"
              size="45"
              v-on="on"
            >
              {{ nome.substring(0,2) }}
            </v-avatar>
          </template>
          <v-card>
            <v-card-title class="subtitle justify-center mb-3">
              {{ login }}
            </v-card-title>
            <v-card-subtitle>
              {{ nome }}
            </v-card-subtitle>
            <v-divider class="mb-1" />
            <v-card-actions>
              <v-btn
                color="primary"
                block
                @click="deslogar()"
              >
                <v-icon
                  left
                  size="28"
                >
                  mdi-logout-variant
                </v-icon>
                SAIR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-divider />

    <!-- TODO: Transição do router -->
    <v-container
      class="pa-0"
      fluid
    >
      <router-view />
    </v-container>

    <!-- TODO: Footer -->
    <v-footer
      app
      class="pa-0"
      color="primary"
      dark
      height="20"
    >
      <v-col
        class="text-center ma-0 pa-0 caption"
        cols="12"
      >
        <span class="caption font-weight-bold mr-10">
          {{ dataAtual }}
        </span>
        <strong v-if="!$vuetify.breakpoint.mobile">IG Projetos</strong>
        <span v-if="!$vuetify.breakpoint.mobile"> - Versão {{ versao }}</span>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LayoutPadraoSistema',

  data: () => ({
    dataAtual: '',
    loading: false,
    login: localStorage.getItem('treinamento:email')
      ? window.atob(localStorage.getItem('treinamento:email'))
      : '',
    links: [
      {
        icone: 'mdi-plus',
        nome: 'Cadastro de Produtos',
        path: '/cadastro/produto'
      }
    ],
    nome: localStorage.getItem('treinamento:nome')
      ? window.atob(localStorage.getItem('treinamento:nome'))
      : ''
  }),

  created () {
    setTimeout(() => {
      this.atualizarData()
    }, 200)
  },

  methods: {
    ...mapActions('app', [
      'logout'
    ]),
    atualizarData () {
      this.dataAtual = this.$day().format('dddd - DD - MMMM - YYYY HH:mm:ss')

      setTimeout(() => {
        this.atualizarData()
      }, 1000)
    },
    async deslogar () {
      this.loading = true

      const res = await this.logout()
      if (!res.erro) this.$router.push('/login')

      this.loading = false
    }
  }
}
</script>
