<template>
<transition name="slide" :appear="appear" mode="out-in">
  <slot></slot>
</transition>
</template>

<script>
export default {
  props: ['appear'],
};
</script>

<style>
.enter {
  transform: translateX(100%)
}

.enter-to {
  transform: translateX(0)
}

.slide-enter-active {
  position: absolute
}

.leave {
  transform: translateX(0)
}

.leave-to {
  transform: translateX(-100%)
}

.slide-enter-active,
.slide-leave-active {
  transition: all 750ms ease-in-out
}
</style>
