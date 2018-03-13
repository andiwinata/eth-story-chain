<template>
  <swiper :options="swiperOption">
    <swiper-slide class="is-dark" v-for="childNode in childrenSentenceNodes" :key="childNode.sentenceId">
      <sentence :class="{ 'is-selected': childNode.sentenceId === selectedChildNode }" v-bind="childNode" />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'

import { mapState } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Sentence from '~/components/molecules/Sentence.vue'

export default {
  components: {
    Sentence,
    swiper,
    swiperSlide
  },
  computed: mapState({
    childrenSentenceNodes(state) {
      const parentNode = state.sentenceTree[this.parentSentenceId]
      if (!parentNode) {
        return []
      }

      return parentNode.children.map(childId => state.sentenceTree[childId])
    },
    selectedChildNode(state) {
      return state.sentenceTreeView[this.parentSentenceId].viewedChildId
    }
  }),
  data() {
    return {
      swiperOption: {
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 'auto',
        spaceBetween: 30,
      }
    }
  },
  props: {
    parentSentenceId: { type: String },
    defaultSentenceId: { type: String }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/variables.scss';

.sentence-wrapper {
  display: inline;
  margin-right: 16px;
}

.is-selected {
  color: red;
}

.swiper-slide {
  background: $light;
  width: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 120px;
}
</style>

