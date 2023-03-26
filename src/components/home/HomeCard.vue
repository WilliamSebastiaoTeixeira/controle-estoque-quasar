<template>
  <div
    class="
      home-card
      column
      justify-between
      hvr-sweep-to-right
      cursor-pointer
      bg-white
      estoque-border
    "
    @click="() => emit('onGoTo', modulo.route)"
    @mouseover="onMouseOver"
    @mouseleave="onLeaveMouseOver"
  >
    <div
      v-if="!modulo.available"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
      >
      <q-icon
        name="las la-lock"
        size="80px"
        color="grey-4"
      />
    </div>
    <div class="row justify-between q-px-md q-py-md full-height">
      <div class="column justify-end">
        <span
          class="title"
          :class="{
            'text-grey-1': mouseOver && modulo.available,
            'text-primary': !mouseOver && modulo.available,
            'text-grey-4': !modulo.available,
          }"
        >
          {{ modulo.title }}
        </span>
      </div>
      <div class="full-height">
        <q-icon
          :name="modulo.icon"
          avatar
          size="50px"
          :class="{
            'text-white': mouseOver && modulo.available,
            'text-primary': !mouseOver && modulo.available,
            'text-grey-4': !modulo.available,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

defineProps({
  modulo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['onGoTo'])

const mouseOver = ref(false) as Ref<boolean>

function onMouseOver(){
  mouseOver.value = true
}

function onLeaveMouseOver(){
  mouseOver.value = false
}

</script>

<style lang="scss" scoped>
.home-card {
  min-width: 250px;
  min-height: 120px;
  border-radius: 0px;
}


@media only screen and (max-width: 900px) {
  .home-card {
    min-width: calc(100vw - 40px);
    height: 120px;
    border-radius: 4px;
  }
}


.hvr-sweep-to-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.hvr-sweep-to-right:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $primary;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.hvr-sweep-to-right:hover,
.hvr-sweep-to-right:focus,
.hvr-sweep-to-right:active {
  color: white;
}

.hvr-sweep-to-right:hover:before,
.hvr-sweep-to-right:focus:before,
.hvr-sweep-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

</style>
