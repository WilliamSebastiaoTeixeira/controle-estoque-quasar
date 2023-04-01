<template>
  <WebLayout v-if="!mobileOrSmallWidth"/>
  <MobileLayout v-if="mobileOrSmallWidth"/>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useQuasar } from 'quasar'

import WebLayout from './WebLayout.vue'
import MobileLayout from './MobileLayout.vue'

const $q = useQuasar()

const mobileOrSmallWidth = computed(() => {
  if($q.screen.width < 585 || $q.platform.is.mobile) return true
  return false
})
</script>
