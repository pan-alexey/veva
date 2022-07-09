<script lang="ts">
export let errorCount: number;

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const close = () => {
  dispatch("close");
}
</script>

<style>
.nav {
  height: 54px;
}

.nav.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.navbar {
  background: #D32F2F;
  display: flex;
  padding: 0 15px;
  align-items: center;
  transform: translate3d(0, 0, 0);
}

.navbar-content {
  flex-grow: 1;
}

.navbar-close {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.navbar-close .close:before,
.navbar-close .close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 20px;
  width: 2px;
  background-color: #fff;
}

.navbar-close .close:before {
  transform: rotate(45deg);
}

.navbar-close .close:after {
  transform: rotate(-45deg);
}
</style>

<template>
  <div class="nav top navbar">
    <div class="navbar-content">Build with error ({errorCount})</div>
    <div class="navbar-close" on:click={close}>
      <span class="close"></span>
    </div>
  </div>
  <nav class="nav"></nav>
</template>
