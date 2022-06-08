<script lang="ts">
export let message;
export let title;
export let open;

import AnsiToHtml from 'ansi-to-html';
const ansiToHtml = new AnsiToHtml();

const toggle = () => {
  open = !open;
}
</script>

<style>
/* ---------- */
.item:not(:last-child) {
  border-bottom: 1px solid #3e4a5f;
}
/* ----------- */

.item-action {
  width: 20px;
  height: 18px;
  text-align: center;
}

.item-arrow {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transition-duration: 0.3s;
  transition-property: transform;
}

.item-arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.item-arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
/* ----------- */

.item-title {
  cursor: pointer;
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 4px;
}

.item-title:hover {
  background: #1f273a;
}

.item-message {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: #dadde0;
}

.item-tags {
  display: flex;
  white-space: nowrap;
}

.item-tag {
  margin: 0 2px;
  font-size: 12px;
  padding: 4px;
  background: #3e4a5f;
  width: max-content;
}

.item-tag.server {
  background: #37474f;
}
.item-tag.client {
  background: #005662;
}

.item-body {
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 12px;
  background: #1e1e1e;
}

.item-body-message {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.item-body-message:not(:last-child) {
  border-bottom: 1px solid #3e4a5f;
}
</style>

<template>
  <div class="item">
    <div class="item-title" on:click={() => toggle()}>
      <div class="item-action">
        <i class="{open ? 'item-arrow down' : 'item-arrow right'}" />
      </div>
      <div class="item-message">
        { title }
      </div>
      <div class="item-tags">
        {#if message.client}
        <span class="item-tag client">client</span>
        {/if}
        {#if message.server}
        <span class="item-tag server">server</span>
        {/if}
      </div>
    </div>
    {#if open}
      <div class="item-body">
        {#if message.client === message.server}
        <div class="item-body-message">
          {@html ansiToHtml.toHtml(message.client) }
        </div>
        {:else if (message.client && message.server)}
          <div class="item-body-message">
            <span class="item-tag client">client</span>
            <div class="item-body-err">{@html ansiToHtml.toHtml(message.client) }</div>
          </div>
          <div class="item-body-message">
            <span class="item-tag server">server</span>
            <div class="item-body-err">{@html ansiToHtml.toHtml(message.server) }</div>
          </div>
        {:else if (message.client)}
        <div class="item-body-message">
          {@html ansiToHtml.toHtml(message.client) }
        </div>
        {:else if (message.server)}
        <div class="item-body-message">
          {@html ansiToHtml.toHtml(message.server) }
        </div>
        {/if}
      </div>
    {/if}
  </div>
</template>
  