import Vue from 'vue'
import { ADD_SENTENCE_EVENT_RESULT, SET_INPUT_PARENT_SENTENCE_ID, SET_INPUT_SENTENCE } from './mutation-types'

const createSentenceTreeNode = ({ sentence, sentenceId, parentSentenceId }) => ({
  children: [],
  sentence,
  sentenceId,
  parentSentenceId,
})

export const state = () => ({
  sentenceTree: {
    '0': createSentenceTreeNode({ sentence: '', sentenceId: 0, parentSentenceId: 0 })
  },
  inputParentSentenceId: '',
  inputSentence: '',
  viewedSentenceId: {},
})

export const mutations = {
  [ADD_SENTENCE_EVENT_RESULT](state, { result }) {
    const { parentSentenceId, sentence, sentenceId } = result.args
    // mutating state with new sentence
    Vue.set(state.sentenceTree, sentenceId.toString(), createSentenceTreeNode({
      sentence: window.web3.toAscii(sentence).replace(/\0/g, ''),
      sentenceId: sentenceId.toString(),
      parentSentenceId: parentSentenceId.toString()
    }))
  },
  [SET_INPUT_PARENT_SENTENCE_ID](state, { inputParentSentenceId }) {
    state.inputParentSentenceId = inputParentSentenceId
  },
  [SET_INPUT_SENTENCE](state, { inputSentence }) {
    state.inputSentence = inputSentence
  },
}
