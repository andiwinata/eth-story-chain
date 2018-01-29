<template>
  <sentence-form @submitSentence="submitSentence" />
</template>

<script>
import SentenceForm from '~/components/organisms/SentenceForm.vue'
import sentenceChainArtifacts from '~/build/contracts/SentenceChain.json'

import Web3 from 'web3'
import contract from 'truffle-contract'

let SentenceCreatedEvent

const test = () => {
  console.log('testing 123')
}

export default {
  components: {
    SentenceForm
  },
  methods: {
    async initSentenceChain() {
      if (typeof window.web3 === 'undefined') {
        window.alert('There is no web3 detected, please install Mist/Metamask')
        return
      }

      console.warn('Using web3 detected from external source like Metamask')
      console.log('SENTENCE CHAIN IS', sentenceChainArtifacts, '\n', contract);
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
      const inst = await this.SentenceChain.deployed()
      
      SentenceCreatedEvent = inst.SentenceCreated({}, { fromBlock: 0, toBlock: 'latest' })
      SentenceCreatedEvent.watch((error, result) => {
        test()
        
        if (!error) {
          console.log('watching event', result)
        }
        else {
          console.log('there is error', error)
        }
      })
    },
    async submitSentence(sentence) {
      const inst = await this.SentenceChain.deployed()
      inst.createSentence(window.web3.fromAscii(sentence), 0)
    }
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
