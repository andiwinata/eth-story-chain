<template>
  <section>
    <!-- show the top sentence as just sentence -->
    <sentence v-bind="currentViewedSentenceNode" />
    <!-- show the rest of tree levels as sentence-siblings -->
    <sentence-siblings
      v-for="sentenceId in shownSentenceSiblings"
      :key="sentenceId"
      :parentSentenceId="sentenceId"
    />
  </section>  
</template>

<script>
import { mapGetters } from 'vuex'
import Sentence from '~/components/molecules/Sentence.vue'
import SentenceSiblings from '~/components/molecules/SentenceSiblings.vue'

const TOTAL_DEPTH_SHOWN = 3

export default {
  components: {
    Sentence,
    SentenceSiblings
  },
  computed: {
    ...mapGetters(['currentViewedSentenceNode']),
    shownSentenceSiblings() {
      const ids = [this.$store.state.currentViewedSentenceId]

      for (let i = 0; i < TOTAL_DEPTH_SHOWN - 2; i++) {
        const previousSentenceTreeNode = this.$store.state.sentenceTreeView[ids[i]]
        const nextId = previousSentenceTreeNode.viewedChildId
        if (!nextId) {
          break
        }
        ids.push(nextId)
      }

      return ids
    },
  }
}
</script>
