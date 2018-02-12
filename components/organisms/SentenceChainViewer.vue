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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
    // TODO: REMOVE
    viewedSentences() {
      const shownSentenceNodes = []
      let parentSentenceNode = this.$store.getters.currentViewedSentenceNode

      // pick the default sentence for each level
      // get all the sibling sentences by getting parentSentence.children
      // then if the parentSentence register its default child, pick it
      // otherwise randomly pick one from the sibling
      for (let i = 0; i < TOTAL_DEPTH_SHOWN - 1; i++) {
        // if previous parent does not exist, exit
        if (!parentSentenceNode) {
          break
        }

        const childrenIds = parentSentenceNode.children
        // console.log('parentSentenceNode', parentSentenceNode, childrenIds.length)
        const childSentenceId =
          // get the default child if exist
          this.$store.state.sentenceTreeView[parentSentenceNode.sentenceId] ||
          // otherwise randomly pick one
          childrenIds[randomIntFromInterval(0, childrenIds.length)]

        // console.log('CHILD NODE', childrenIds, childrenIds.length, randomIntFromInterval(0, childrenIds.length))
        const childSentenceNode = this.$store.state.sentenceTree[childSentenceId]

        if (childSentenceNode) {
          // add the selected child into list of to-be-rendered sentences
          // only if it is not falsy
          shownSentenceNodes.push(childSentenceNode)
        }
        // make this node as the next parent node
        parentSentenceNode = childSentenceNode
      }

      return shownSentenceNodes
    }
  }
}
</script>
