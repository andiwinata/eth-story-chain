<template>
  <div>
    <button @click="onClick" class="button is-large is-white">
      <span class="icon has-text-primary">
        <i class="fas fa-2x fa-plus-square"></i>
      </span>
    </button>
    <p :class="classObject">{{ sentenceRender }}</p>
  </div>
</template>

<script>
import { SET_INPUT_PARENT_SENTENCE_ID } from '~/store/mutation-types'

export default {
  data() {
    const isDefault = this.sentenceId === '0'
    return {
      classObject: ['sentence-wrap', 'is-size-3', 'has-text-weight-semibold', { 'is-italic has-text-grey-light': isDefault }],
      sentenceRender: isDefault ? 'Root sentence' : this.sentence
    }
  },
  methods: {
    onClick() {
      this.$store.commit(SET_INPUT_PARENT_SENTENCE_ID, { inputParentSentenceId: this.sentenceId })
    }
  },
  props: {
    children: { type: Array },
    sentence: { type: String },
    sentenceId: { type: String },
    parentSentenceId: { type: String }
  }
}
</script>

<style lang="scss" scoped>
.sentence-wrap {
  display: inline;
  margin-left: 8px;
}
</style>
