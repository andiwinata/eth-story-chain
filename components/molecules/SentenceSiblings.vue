<template>
  <ul>
    <li class="sentence-wrapper" v-for="childNode in childrenSentenceNodes" :key="childNode.sentenceId">
      <sentence :class="{ 'is-selected': childNode.sentenceId === selectedChildNode }" v-bind="childNode" />
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
    },
    selectedChildNode(state) {
      return state.sentenceTreeView[this.parentSentenceId].viewedChildId
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

.is-selected {
  color: red;
}
</style>

