export default {
  registros (state, param) {
    param.forEach(element => {
      element.valor = 'R$' + new Intl.NumberFormat({ style: 'currency', currency: 'PT' }).format(element.valor)
    })

    state.registros = param
  }
}
