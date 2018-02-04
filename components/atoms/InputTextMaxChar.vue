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
// TODO, fix copy paste issue where you can exceed the character

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
      // see https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
      // for more details
      // so basically the parent needs to have v-model attached to them
      // and v-model makes the parent component to listen to 'input'
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

