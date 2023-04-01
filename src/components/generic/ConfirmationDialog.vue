<template>
    <q-dialog
      ref="dialogRef"
      persistent
      @hide="onDialogHide"
    >
      <q-card
        square
        :style="{
          width: '100%',
          maxWidth: maxWidth
        }"
      >
      <div>
        <q-card-section
          v-if="headerText"
          class="q-px-lg"
        >
          <div class="row items-center justify-between">
            <div class="row items-baseline q-gutter-x-sm">
              <span
                class="text-h6 text-bold text-grey-9"
              >
                {{ headerText }}
              </span>
            </div>
            <q-btn
              v-close-popup
              icon="la la-close"
              flat
              round
              color="grey-8"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card
          v-if="bodyText"
          class="q-mt-md q-px-md q-gutter-y-sm q-pb-md"
          flat
        >
          <div class="q-gutter-y-xs">
            <span class="text-bold text-grey-8">
              {{ bodyText }}
            </span>
          </div>
        </q-card>
      </div>

      <q-card-section>
        <div class="row justify-end q-gutter-x-md">
          <q-btn
            v-close-popup
            no-caps
            square
            flat
            class="text-blue-6"
          >
            <span class="estoque-subtitle-size">Cancelar</span>
          </q-btn>
          <q-btn
            no-caps
            unelevated
            square
            :color="confirmationColor"
            @click="onDialogOK"
          >
            {{ confirmationText }}
          </q-btn>
        </div>
      </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

defineProps({
  headerText: {
    type: String,
    default: () => '',
  },
  bodyText: {
    type: String,
    default: () => '',
  },
  confirmationColor: {
    type: String,
    default: () => 'secondary',
  },
  confirmationText: {
    type: String,
    default: () => '',
  },
  maxWidth: {
    type: String,
    default: () => '300px',
  }
})

defineEmits(useDialogPluginComponent.emits)
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
</script>
