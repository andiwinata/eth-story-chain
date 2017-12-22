<template>
  <section class="container is-widescreen">
    <div>
      <logo/>
      <h1 class="title">
        eth-story-chain
      </h1>
      <h2 class="subtitle">
        Story chain based on ethereum
      </h2>
      <listing-table />
      <sentence-form />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/atoms/Logo.vue'
import ListingTable from '~/components/organisms/ListingTable.vue'
import SentenceForm from '~/components/organisms/SentenceForm.vue'

export default {
  components: {
    Logo,
    ListingTable,
    SentenceForm,
  }
}
</script>

<style lang="scss" scoped>
  .container {
    align-content: center;
  }  
</style>
