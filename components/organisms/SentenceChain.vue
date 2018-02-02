<template>
  <div>
    <sentence-form @submitSentence="submitSentence"/>
    <ul>
       <li v-for="(sentence, sentenceId) in sentences" :key="sentenceId">
        {{sentenceId }} - {{ sentence }}
      </li>
    </ul>
  </div>
</template>

<script>
import SentenceForm from '~/components/organisms/SentenceForm.vue'
import sentenceChainArtifacts from '~/build/contracts/SentenceChain.json'

import Web3 from 'web3'
import contract from 'truffle-contract'

export default {
  components: {
    SentenceForm
  },
  data() {
    return {
      sentences: {},
    }
  },
  methods: {
    addWatchResultToSentenceData(result) {
      const { parentSentenceId, sentence, sentenceId } = result.args
      this.$set(this.sentences, sentenceId.toString(), window.web3.toAscii(sentence).replace(/\0/g, ''))
      console.log(
        'processed sentence',
        parentSentenceId.toString(),
        window.web3.toAscii(sentence),
        window.web3.toAscii(sentence).replace(/\0/g, ''),
        sentenceId.toString()
      )
    },
    async initSentenceChain() {
      if (typeof window.web3 === 'undefined') {
        window.alert('There is no web3 detected, please install Mist/Metamask')
        return
      }

      console.warn('Using web3 detected from external source like Metamask')
      console.log('SENTENCE CHAIN IS', sentenceChainArtifacts, '\n', contract)
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

      this.SentenceCreatedEvent = inst.SentenceCreated(
        {},
        { address: inst.address.toLowerCase(), fromBlock: 0, toBlock: 'latest' }
      )
      this.SentenceCreatedEvent.watch((error, result) => {
        if (!error) {
          this.addWatchResultToSentenceData(result)
        } else {
          console.log('there is error', error)
        }
      })
    },
    async submitSentence(sentence) {
      console.log('submitting snentece', sentence.length, 'hello')
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
