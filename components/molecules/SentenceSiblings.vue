<template>
  <ul>
    <li class="sentence-sibling" v-for="childNode in childrenSentenceNodes" :key="childNode.sentenceId">
      <sentence v-bind="childNode" />
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
    parentSentenceId: { type: String }
  }
}
</script>

<style lang="scss" scoped>
.sentence-sibling {
  display: inline;
  margin-right: 16px;
}
</style>

