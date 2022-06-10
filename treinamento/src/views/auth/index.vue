<template>
  <v-app id="inspire">
    <!-- Componente de notificação -->
    <notificacao
      v-model="notificacao.value"
      :color="notificacao.color"
      :text="notificacao.text"
    />

    <v-main
      class="d-flex align-self-center"
      justify="center"
    >
      <v-container class="fill-height">
        <v-row>
          <v-col
            cols="12"
            class="d-flex align-center justify-center"
          >
            <v-card
              width="350"
              class="pa-4"
            >
              <v-card-title class="display-1 font-weight-bold grey--text justify-center mt-6 pt-4">
                Treinamento
              </v-card-title>
              <v-card-title class="display-1 font-weight-bold justify-center text-center pt-0">
                <v-list-item-subtitle>
                  Bem vindo ao ambiente de Treinamento
                </v-list-item-subtitle>
              </v-card-title>
              <v-card-text>
                <validation-observer ref="observer">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        name="Email"
                        rules="required"
                        vid="email"
                      >
                        <v-text-field
                          ref="email"
                          v-model="formulario.email"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          autofocus
                          append-icon="mdi-account"
                          class="required"
                          placeholder="Email"
                          type="text"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        name="Senha"
                        rules="required"
                        vid="senha"
                      >
                        <v-text-field
                          id="senha"
                          ref="senha"
                          v-model="formulario.senha"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          class="required"
                          placeholder="Senha"
                          type="password"
                          @keydown.enter="efetuarLogin()"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </validation-observer>
              </v-card-text>

              <v-card-actions class="ma-2">
                <v-row
                  class="text-center justify-center"
                  dense
                >
                  <v-btn
                    color="primary"
                    block
                    class="my-2"
                    rounded
                    x-large
                    @click="efetuarLogin()"
                  >
                    Efetuar Login
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PaginaLoginUsuario',

  data: () => ({
    formulario: {
      email: '',
      senha: ''
    },
    notificacao: {
      value: false,
      text: '',
      color: 'primary'
    }
  }),

  created () {
    setTimeout(() => {
      this.formulario.email = localStorage.getItem('treinamento:email')
        ? window.atob(localStorage.getItem('treinamento:email'))
        : ''
    }, 100)

    if (this.$refs.senha) {
      setTimeout(() => { this.$refs.senha.focus() }, 600)
    }
  },

  methods: {
    ...mapActions('app', [
      'login'
    ]),
    async efetuarLogin () {
      if (await this.$refs.observer.validate()) {
        const res = await this.login({
          email: this.formulario.email || undefined,
          senha: this.formulario.senha
            ? this.$crypto(this.formulario.senha, 'sha256')
            : undefined
        })

        if (typeof res.erro === 'object') {
          this.$refs.observer.reset()

          Object.keys(res.erro).forEach(item => {
            this.$refs.observer.setErrors(res.erro)
          })
        } else {
          this.notificacao = {
            value: true,
            text: res.erro,
            color: 'error'
          }
          if (this.$router.currentRoute.path !== '/') this.$router.push('/')
        }
      }
    }
  }
}
</script>
