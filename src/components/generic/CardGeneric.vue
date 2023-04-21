<template>
  <q-card
    v-if="modulo.available"
    flat
    class="estoque-border card"
    @click="() => modulo.available ? emit('onGoTo', modulo.route): null"
  >
    <div
      class="row justify-between q-px-md q-py-md full-height">
      <div class="column justify-end">
        <span
          class="title"
        >
          {{ modulo.title }}
        </span>
      </div>
      <div class="full-height">
        <q-icon
          :name="modulo.icon"
          avatar
          size="50px"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  modulo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['onGoTo'])
</script>

<style scoped lang="scss">
.card{
  min-width: 250px;
  min-height: 120px;
  background-color: white;
  color: $primary;
  position: relative;
  transform: perspective(1px) translateZ(0);
}
.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: $secondary;
  transform: scaleY(0);
  transform-origin: 0 100%;
  transition: transform 0.1s ease-out;
}

.card:hover {
  color: white;
}
.card:hover:before {
  transform: scaleY(1);
}

.card:hover{
  color: white;

  -webkit-transition: color 100ms ease-in-out;
  -moz-transition: color 100ms ease-in-out;
  -ms-transition: color 100ms ease-in-out;
  -o-transition: color 100ms ease-in-out;
  transition: color 100ms ease-in-out;
}
</style>
