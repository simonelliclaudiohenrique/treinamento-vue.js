import axios from '@/plugins/axios'

export const login = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/login', {
      ...dados
    })

    if (!res.data.erro) {
      localStorage.setItem('treinamento:token', res.data.token)
      localStorage.setItem('treinamento:nome', window.btoa(res.data.payload.name))
      localStorage.setItem('treinamento:email', window.btoa(res.data.payload.email))

      commit('app/login', res.data.payload.email, { root: true })
      commit('app/nome', res.data.payload.name, { root: true })

      axios.defaults.headers.Authorization = 'Bearer ' + res.data.token
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const logout = async ({ commit }) => {
  try {
    localStorage.removeItem('treinamento:token')
    localStorage.removeItem('treinamento:nome')
    delete axios.defaults.headers.Authorization

    return ''
  } catch (error) {
    return error
  }
}
