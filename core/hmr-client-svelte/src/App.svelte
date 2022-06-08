<script lang="ts">
import type { Types } from "webpack-hmr-server";
import type { ResultItems } from '@veva/utils/webpackStats'
import { processErrors } from '@veva/utils/webpackStats'
import { processConsole } from './components/console';

import Navbar from "./components/Navbar.svelte";
import Panel from "./components/Panel.svelte";



let open: boolean = true;
let errors: Array<ResultItems> = [];
let warnings: Array<ResultItems> = [];

document.addEventListener("__webpack_hmr_sever__", (e) => {
  const { detail } = e as unknown as { detail: unknown };
  const event = detail as Types.Event;

  const eventError = processErrors({
      client: event.state?.client?.errors,
      server: event.state?.server?.errors,
  });
  const eventWarnings = processErrors({
    client: event.state?.client?.warnings,
    server: event.state?.server?.warnings,
  });

  errors = eventError.items;
  warnings = eventWarnings.items;

  if (!open && errors.length) {
    open = true
  }
  processConsole(event);
});

const onClose = () => {
  open = false;
};
</script>

<template>
  {#if open && errors.length > 0}
    <div class="overlay">
      <div class="overlay-content">
        <Navbar errorCount={errors.length} on:close={onClose} />
        <div class="container">
          <Panel warnings={warnings} errors={errors}/>
        </div>
      </div>
    </div>
  {/if}
</template>

<style scoped>
.overlay {
  position: fixed;
  overflow: hidden;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  right: 0;
  border: 0;
  width: 100%;
  height: 100%;
  z-index: 1500;
  background: #181f2e;
  color: #fff;
  font-family: monospace;
  font-size: 14px;
}

.overlay-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.container {
  margin: 0 auto;
  max-width: 900px;
  padding: 0 15px;
}
</style>
