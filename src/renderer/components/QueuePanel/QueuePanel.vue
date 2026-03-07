<template>
  <ft-card class="relative">
    <div class="queueHeader">
      <h3 class="queueTitle">
        {{ $t('Queue.Queue') }}
        <span class="queueCount">
          {{ $t('Queue.Videos in Queue', { count: queueCount }) }}
        </span>
      </h3>
      <button
        v-if="queueCount > 0"
        class="clearQueueButton"
        :title="$t('Queue.Clear Queue')"
        @click="clearAll"
      >
        {{ $t('Queue.Clear Queue') }}
      </button>
    </div>
    <div
      v-if="queueCount === 0"
      class="queueEmpty"
    >
      {{ $t('Queue.Queue is Empty') }}
    </div>
    <div
      v-else
      class="queueItemsWrapper"
    >
      <div
        v-for="(item, index) in queue"
        :key="item.videoId + '-' + item.timeAdded"
        class="queueItem"
        :class="{ currentQueueItem: index === currentIndex }"
      >
        <p class="queueIndex">
          <font-awesome-icon
            v-if="index === currentIndex"
            class="queueIndexIcon"
            :icon="['fas', 'play']"
          />
          <template v-else>
            {{ index + 1 }}
          </template>
        </p>
        <ft-list-video
          :data="item"
          force-list-type="list"
          appearance="watchPlaylistItem"
          :quick-bookmark-button-enabled="false"
        />
        <ft-icon-button
          :title="$t('Queue.Remove from Queue')"
          :icon="['fas', 'times']"
          class="removeFromQueueButton"
          :padding="5"
          :size="14"
          @click="removeItem(index)"
        />
      </div>
    </div>
  </ft-card>
</template>

<script src="./QueuePanel.js" />
<style scoped src="./QueuePanel.css" />
