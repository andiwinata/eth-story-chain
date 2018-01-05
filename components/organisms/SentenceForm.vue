<template>
  <form action="" @submit.prevent="onSubmit" >
    <label class="label">
      <span class="sentence-label">Sentence</span>
      <!--
        use v-model for binding the input data
        https://forum.vuejs.org/t/reset-data-in-a-child-component-with-props-events-best-way/14824/2
        https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
       -->
      <input-text-max-char 
        class="is-large"
        v-model="sentenceInput"
        :maxCharacters="sentenceMaxCharacters"
      />
    </label>
    <button class="button is-primary is-large" type="submit">
      Create sentence
    </button>
  </form>
</template>

<script>
import InputTextMaxChar from '~/components/atoms/InputTextMaxChar.vue'

export default {
  components: {
    InputTextMaxChar
  },
  data() {
    return {
      sentenceInput: '',
      sentenceMaxCharacters: 32,
    }
  },
  methods: {
    onSentenceInput(sentenceInput) {
      // this.sentenceInput = sentenceInput
    },
    onSubmit() {
      // emit submit event
      this.$emit('submitSentence', this.sentenceInput)
      // then reset the input
      this.sentenceInput = ''
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/mixins.scss';

.sentence-label {
  @include visually-hidden();
}
</style>


