<template>
  <Transition name="queue-floater">
    <div
      v-if="visible"
      class="queueFloater"
    >
      <button
        class="queueFloaterClose"
        :aria-label="$t('Queue.Dismiss')"
        :title="$t('Queue.Dismiss')"
        @click.stop="dismiss"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <button
        class="queueFloaterContent"
        @click="enterQueue"
      >
        <div class="queueFloaterThumbWrapper">
          <img
            class="queueFloaterThumb"
            :src="thumbnailUrl"
            :alt="activeVideo.title"
          >
          <font-awesome-icon
            class="queueFloaterPlayIcon"
            :icon="['fas', 'play']"
          />
        </div>
        <div class="queueFloaterInfo">
          <p class="queueFloaterTitle">
            {{ activeVideo.title }}
          </p>
          <p class="queueFloaterMeta">
            {{ $t('Queue.Playing from Queue') }}
          </p>
        </div>
      </button>
    </div>
  </Transition>
</template>

<script src="./QueueFloater.js" />
<style scoped src="./QueueFloater.css" />
