<template>
  <sentence-form @submitSentence="submitSentence" />
</template>

<script>
import SentenceForm from '~/components/organisms/SentenceForm.vue'

export default {
  components: {
    SentenceForm
  },
  methods: {
    submitSentence(sentence) {
      console.log('SENTENCE IS SUBMITTED', sentence)
    },
  }
}
</script>
