<template>
  <input
    class="input"
    type="text"
    @input="onInput"
    @keypress="onKeypress"
    :placeholder="placeholderComputed"
    :value="value"
  />
</template>

<script>
const defaultMaxCharacters = 5
export default {
  computed: {
    placeholderComputed() {
      return (
        this.placeholder || `Enter maximum ${this.maxCharacters || defaultMaxCharacters} characters for the sentence`
      )
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    onKeypress(e) {
      if (e.target.value.length >= this.maxCharacters) {
        e.preventDefault()
      }
    }
  },
  props: {
    maxCharacters: { default: defaultMaxCharacters, type: Number },
    placeholder: { type: String },
    // use the value props from the parent
    value: { default: '', type: String }
  }
}
</script>

