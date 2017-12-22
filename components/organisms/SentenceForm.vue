<template>
  <form action="">
    <label class="label">
      <span class="sentence-label">Sentence</span>
      <input-text-max-char class="is-large" :maxCharacters="sentenceMaxCharacters" />
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
      sentenceMaxCharacters: 32,
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


