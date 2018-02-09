<template>
  <div>
    <sentence-form @onSubmitSentence="onSubmitSentence"/>
    <hr />
    <sentence v-for="(sentenceNode, sentenceId) in sentenceTree" :key="sentenceId" v-bind="sentenceNode"/>
  </div>
</template>

<script>
import Web3 from 'web3'
import contract from 'truffle-contract'
import { mapMutations, mapState } from 'vuex'
import { ADD_SENTENCE_EVENT_RESULT } from '~/store/mutation-types'
import SentenceForm from '~/components/organisms/SentenceForm.vue'
import Sentence from '~/components/molecules/Sentence.vue'
import sentenceChainArtifacts from '~/build/contracts/SentenceChain.json'

export default {
  components: {
    Sentence,
    SentenceForm,
  },
  computed: mapState(['sentenceTree', 'inputSentence', 'inputParentSentenceId']),
  methods: {
    async initSentenceChain() {
      if (typeof window.web3 === 'undefined') {
        window.alert('There is no web3 detected, please install Mist/Metamask')
        return
      }

      console.warn('Using web3 detected from external source like Metamask')
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(window.web3.currentProvider)

      // initialize contract
      this.SentenceChain = contract(sentenceChainArtifacts)
      this.SentenceChain.setProvider(window.web3.currentProvider)

      // set default account if does not exist
      if (!window.web3.eth.defaultAccount) {
        window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
      }

      // DEBUG ONLY
      window.SentenceChain = this.SentenceChain

      // watch for events
      this.inst = await this.SentenceChain.deployed()

      this.SentenceCreatedEvent = this.inst.SentenceCreated(
        {},
        { address: this.inst.address.toLowerCase(), fromBlock: 0, toBlock: 'latest' }
      )
      this.SentenceCreatedEvent.watch((error, result) => {
        if (!error) {
          // add the sentence log to store
          this[ADD_SENTENCE_EVENT_RESULT]({ result })
        } else {
          console.log('there is error', error)
        }
      })
    },
    async onSubmitSentence() {
      console.log('submitting sentence', this.inputParentSentenceId)
      this.inst.createSentence(window.web3.fromAscii(this.inputSentence), this.inputParentSentenceId || 0)
    },
    ...mapMutations([ADD_SENTENCE_EVENT_RESULT])
  },
  mounted() {
    if (document.readyState === 'interactive') {
      this.initSentenceChain()
    } else {
      document.addEventListener('DOMContentLoaded', this.initSentenceChain, false)
    }
  }
}
</script>
