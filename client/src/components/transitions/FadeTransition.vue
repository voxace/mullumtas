<template>
<transition name="fade" :appear="appear" mode="out-in">
  <slot></slot>
</transition>
</template>

<script>
export default {
  props: ['appear'],
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
