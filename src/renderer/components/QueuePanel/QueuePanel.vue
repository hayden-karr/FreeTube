<template>
  <ft-card class="relative">
    <div class="queueHeader">
      <h3 class="queueTitle">
        {{ $t('Queue.Queue') }}
        <span class="queueCount">
          {{ $t('Queue.Videos in Queue', { count: queueCount }) }}
        </span>
      </h3>
      <div
        v-if="queueCount > 0"
        class="queueHeaderButtons"
      >
        <ft-icon-button
          :title="$t('Queue.Save to Playlist')"
          :icon="['fas', 'plus']"
          :padding="6"
          :size="14"
          theme="base"
          @click="saveToPlaylist"
        />
        <ft-icon-button
          :title="$t('Queue.Clear Queue')"
          :icon="['fas', 'trash']"
          :padding="6"
          :size="14"
          theme="base"
          @click="clearAll"
        />
      </div>
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
        :class="{
          currentQueueItem: index === currentIndex,
          dragging: index === draggingIndex,
          dragOver: index === dragOverIndex && index !== draggingIndex
        }"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover="onDragOver($event, index)"
        @dragleave="onDragLeave"
        @drop="onDrop($event, index)"
        @dragend="onDragEnd"
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
          :in-queue="true"
          :queue-item-index="index"
        />
        <div class="queueItemActions">
          <ft-icon-button
            :title="$t('Queue.Remove from Queue')"
            :icon="['fas', 'times']"
            :padding="4"
            :size="12"
            @click="removeItem(index)"
          />
        </div>
      </div>
    </div>
  </ft-card>
</template>

<script src="./QueuePanel.js" />
<style scoped src="./QueuePanel.css" />
