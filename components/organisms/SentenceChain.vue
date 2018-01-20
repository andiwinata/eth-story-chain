<template>
  <sentence-form @submitSentence="submitSentence" />
</template>

<script>
import SentenceForm from '~/components/organisms/SentenceForm.vue'

import Web3 from 'web3'
// import contract from 'truffle-contract'

export default {
  components: {
    SentenceForm
  },
  methods: {
    initSentenceChain() {
      if (typeof window.web3 === 'undefined') {
        window.alert('There is no web3 detected, please install Mist/Metamask')
        return
      }

      console.warn('Using web3 detected from external source like Metamask')
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(window.web3.currentProvider)
    },
    submitSentence(sentence) {
      console.log('SENTENCE IS SUBMITTED', sentence)
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
