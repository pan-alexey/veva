<script lang="ts">
export let errors;
export let warnings;
import Item from "./Item.svelte";
import uniqueId from 'lodash/uniqueId';

$: open = false;
$: select = 'errors';
$: key = uniqueId('key');

const collapseAll = () => {
  open = false;
  key = uniqueId('key');
}

const expandAll = () => {
  open = true;
  key = uniqueId('key');
}

let items = errors;
const onSelect = (value: 'errors' | 'warnings') => {
  select = value;
  switch (value) {
    case 'errors':
    items = errors
    break;
    case 'warnings':
    items = warnings
    break;
  }
}
</script>

<style>
.panel {
  transform: translate3d(0, 0, 0);
  margin-top: 20px;
  margin-bottom: 20px;
}

.panel-body {
  background: #2a344c;
}

.panel-content {
  padding: 10px;
}

.panel-tabs {
  display: flex;
  background: #1f2538;
}

.tab-item {
  padding: 15px;
  cursor: pointer;
}

.tab-item-active {
  background: #2a344c;
}

/* -------------------- */
.panel-header {
  padding: 15px;
  padding-bottom: 0;
  display: flex;
}

.action {
  flex-grow: 1;
}

.button {
  margin: 0 2px;
  cursor: pointer;
  padding: 5px;
  position: relative;
  display: inline-block;
  border: 1px solid #fff;
}
</style>

<template>
  <div class="panel">
    <div class="panel-tabs">
      {#if warnings.length}
        <div
          on:click={() =>onSelect('errors')}
          class="{select === 'errors' ? 'tab-item tab-item-active' : 'tab-item'}"
        >
          Errors ({errors.length})
        </div>
        <div
          on:click={() =>onSelect('warnings')}
          class="{select === 'warnings' ? 'tab-item tab-item-active' : 'tab-item'}"
        >
        Warnings ({warnings.length})
        </div>
      {/if}
    </div>
    <div class="panel-body">
      <div class="panel-header">
        <div class="action">
          <div on:click={collapseAll} class="button">Collapse all</div>
          <div on:click={expandAll} class="button">Expand All</div>
        </div>
      </div>
      <div class="panel-content">
        {#key key}
          {#each items as { title, message }}
            {#key message}
            <Item title={title} message={message} open={open}/>
            {/key}
          {/each}
        {/key}
      </div>
    </div>
  </div>
</template>
