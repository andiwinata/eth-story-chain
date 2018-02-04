import Vue from 'vue'
import { ADD_SENTENCE_EVENT_RESULT, SET_INPUT_PARENT_SENTENCE_ID, SET_INPUT_SENTENCE } from './mutation-types'

const createSentenceTreeNode = ({ sentence, sentenceId, parentSentenceId }) => ({
  children: [],
  sentence,
  sentenceId,
  parentSentenceId
})

export const state = () => ({
  sentenceTree: {
    '0': createSentenceTreeNode({ sentence: '', sentenceId: 0, parentSentenceId: 0 })
  },
  inputParentSentenceId: '',
  inputSentence: '',
  viewedSentenceId: {}
})

export const mutations = {
  [ADD_SENTENCE_EVENT_RESULT](state, { result }) {
    const parentSentenceId = result.args.parentSentenceId.toString()
    const sentenceId = result.args.sentenceId.toString()
    const sentence = window.web3.toAscii(result.args.sentence).replace(/\0/g, '')

    // adding new sentence to sentenceTree
    Vue.set(
      state.sentenceTree,
      sentenceId.toString(),
      createSentenceTreeNode({
        sentence,
        sentenceId,
        parentSentenceId
      })
    )

    // update the children of parentSentence
    state.sentenceTree[parentSentenceId].children.push(sentenceId)
  },
  [SET_INPUT_PARENT_SENTENCE_ID](state, { inputParentSentenceId }) {
    state.inputParentSentenceId = inputParentSentenceId
  },
  [SET_INPUT_SENTENCE](state, { inputSentence }) {
    state.inputSentence = inputSentence
  }
}
