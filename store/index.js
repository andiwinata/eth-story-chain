import Vue from 'vue'
import { ADD_SENTENCE_EVENT_RESULT, SET_DEFAULT_CHILD_SENTENCE_ID, SET_INPUT_PARENT_SENTENCE_ID, SET_INPUT_SENTENCE } from './mutation-types'

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const createSentenceTreeNode = ({ sentence, sentenceId, parentSentenceId }) => ({
  children: [],
  _childrenIds: new Set(), // set, internally used for check child existence before inserting it
  sentence,
  sentenceId,
  parentSentenceId
})

const createSentenceViewNode = ({ viewedChildId = undefined, randomizeViewedChildIdOnView = true }) => ({
  viewedChildId,
  randomizeViewedChildIdOnView,
})

const addChildToSentenceViewNode = ({ sentenceViewNode, sentenceChildren, childId }) => {
  // if the sentenceViewNode doesn't have viewedChildId
  // it means this is the first time it is being set
  // so set it as the default
  if (!sentenceViewNode.viewedChildId) {
    sentenceViewNode.viewedChildId = childId
  }

  // if the randomize flag is still true, and we are adding new child
  // randomize it again among all children including the new one added
  if (sentenceViewNode.randomizeViewedChildIdOnView) {
    const selectedChildId = sentenceChildren[randomIntFromInterval(0, sentenceChildren.length)]
    sentenceViewNode.viewedChildId = selectedChildId
  }
}

export const state = () => ({
  currentViewedSentenceId: '0',
  sentenceTree: {
    '0': createSentenceTreeNode({ sentence: '', sentenceId: '0', parentSentenceId: '0' })
  },
  inputParentSentenceId: '',
  inputSentence: '',
  sentenceTreeView: {
    '0': createSentenceViewNode()
  },
})

export const getters = {
  currentViewedSentenceNode: state => {
    return state.sentenceTree[state.currentViewedSentenceId]
  }
}

export const mutations = {
  [ADD_SENTENCE_EVENT_RESULT](state, { result }) {
    const parentSentenceId = result.args.parentSentenceId.toString()
    const sentenceId = result.args.sentenceId.toString()
    const sentence = window.web3.toAscii(result.args.sentence).replace(/\0/g, '')

    // Updating data

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

    // update the children of parentSentence only if the children doesn't contain sentenceId
    // this is because sometimes event watch repeating the same result
    // (block confirmation happen simultanously in local env)
    const parent = state.sentenceTree[parentSentenceId]
    if (!parent._childrenIds.has(sentenceId)) {
      parent._childrenIds.add(sentenceId)
      parent.children.push(sentenceId)
    }

    // Updating View

    // adding the viewed child id
    Vue.set(state.sentenceTreeView, sentenceId, createSentenceViewNode())

    // add the new sentence to the parentViewNode
    const parentViewNode = state.sentenceTreeView[parentSentenceId]
    addChildToSentenceViewNode({ sentenceViewNode: parentViewNode, sentenceChildren: parent.children, childId: sentenceId })

    console.log('ADDING SENTENCE EVENT for ' + sentenceId, state.sentenceTree[parentSentenceId].children);
  },
  [SET_DEFAULT_CHILD_SENTENCE_ID](state, { sentenceId, defaultChildSentenceId }) {
    state.sentenceTreeView[sentenceId] = defaultChildSentenceId
  },
  [SET_INPUT_PARENT_SENTENCE_ID](state, { inputParentSentenceId }) {
    state.inputParentSentenceId = inputParentSentenceId
  },
  [SET_INPUT_SENTENCE](state, { inputSentence }) {
    state.inputSentence = inputSentence
  }
}
