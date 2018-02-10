<template>
  <ul>
    <li class="sentence-wrapper" v-for="childNode in childrenSentenceNodes" :key="childNode.sentenceId">
      <sentence :class="{ isDefault: childNode.sentenceId === defaultSentenceId }" v-bind="childNode" />
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import Sentence from '~/components/molecules/Sentence.vue'

export default {
  components: {
    Sentence
  },
  computed: mapState({
    childrenSentenceNodes(state) {
      const parentNode = state.sentenceTree[this.parentSentenceId]
      if (!parentNode) {
        return []
      }
      
      return parentNode.children.map(childId => state.sentenceTree[childId])
    }
  }),
  props: {
    parentSentenceId: { type: String },
    defaultSentenceId: { type: String },
  }
}
</script>

<style lang="scss" scoped>
.sentence-wrapper {
  display: inline;
  margin-right: 16px;
}

.isDefault {
  color: red;
}
</style>

