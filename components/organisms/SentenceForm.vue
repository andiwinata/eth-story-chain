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
        v-model="inputSentence"
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
import { SET_INPUT_SENTENCE } from '~/store/mutation-types'

export default {
  components: {
    InputTextMaxChar
  },
  computed: {
    // create v-model from vuex state
    // https://stackoverflow.com/questions/42755289/vuex-input-with-v-model-not-reactive
    inputSentence: {
      get() {
        return this.$store.state.inputSentence
      },
      set(value) {
        this.$store.commit(SET_INPUT_SENTENCE, { inputSentence: value })
      }
    }
  },
  data() {
    return {
      sentenceMaxCharacters: 32
    }
  },
  methods: {
    onSubmit() {
      // emit submit event for parent component
      this.$emit('onSubmitSentence')
      // then reset the input
      this.inputSentence = ''
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


