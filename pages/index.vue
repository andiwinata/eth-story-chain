<template>
  <section class="container is-widescreen">
    <div>
      <!-- <logo/> -->
      <h1 class="title is-size-1 has-text-weight-bold">
        eth-story-chain
      </h1>
      <h2 class="subtitle">
        Story chain based on ethereum
      </h2>
      <!-- <listing-table /> -->
      <sentence-chain />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/atoms/Logo.vue'
import ListingTable from '~/components/organisms/ListingTable.vue'
import SentenceChain from '~/components/organisms/SentenceChain.vue'

export default {
  components: {
    Logo,
    ListingTable,
    SentenceChain,
  }
}
</script>

<style lang="scss" scoped>
  .container {
    align-content: center;
    margin-top: 1rem;
  }  
</style>
