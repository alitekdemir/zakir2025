<!-- SabahContent.vue -->
<template>
    <div class="content-section">
      <div class="flex-container section" :class="scriptStyle">
        <p class="flex-container wrap" :class="[scriptStyle]">
          <span v-for="line in nukaddimu[scriptStyle]" :key="line.text" :class="[scriptStyle]">
            {{ line.text }}
          </span>
        </p>
      </div>
  
      <p class="divider"><strong>Şimdi 9 defa</strong></p>
      <p class="flex-container wrap" :class="[scriptStyle]">
        <template v-for="line in tevhid[scriptStyle]" :key="line.text">
          <span v-if="!line.last" :class="{ [scriptStyle]: true, 'special-line': line.emphasis }">
            {{ line.text }}
          </span>
        </template>
      </p>
  
      <p class="divider"><strong>10. okuyuş</strong></p>
      <p class="flex-container wrap" :class="[scriptStyle]">
        <span v-for="line in tevhid[scriptStyle]" :key="line.text"
          :class="{ 'special-line': line.emphasis, 'blue': line.last }">
          {{ line.text }}
        </span>
      </p>
    </div>
</template>

<script setup>
import { dualar } from '../../assets/dualar.js'
const { nukaddimu, tevhid } = dualar

defineProps({
scriptStyle: {
    type: String,
    required: true
}
})
</script>
