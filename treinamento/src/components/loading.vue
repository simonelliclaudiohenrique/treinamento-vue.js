<template>
  <div class="text-center">
    <v-overlay
      :value="dialog"
      style="z-index: 10000 !important;"
    >
      <v-progress-circular
        color="primary darken-1"
        :size="100"
        :width="6"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponente',

  props: {
    value: {
      required: true,
      type: Boolean
    }
  },

  data: () => ({
    dialog: false
  }),

  watch: {
    value (valor) {
      if (valor) {
        this.dialog = true
      } else {
        setTimeout(() => {
          this.dialog = false
        }, 200)
      }
    }
  }
}
</script>
