<template>
  <input class="input" type="text" v-model="sentenceInput" @keypress="onInput" :placeholder="placeholderComputed" />
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
  data() {
    return {
      sentenceInput: ''
    }
  },
  methods: {
    onInput(e) {
      if (e.target.value.length >= this.maxCharacters) {
        e.preventDefault()
      }
    }
  },
  props: {
    maxCharacters: { default: defaultMaxCharacters, type: Number },
    placeholder: { type: String }
  }
}
</script>

