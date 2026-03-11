import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import FtCard from '../ft-card/ft-card.vue'
import FtListVideo from '../ft-list-video/ft-list-video.vue'
import FtIconButton from '../FtIconButton/FtIconButton.vue'

export default defineComponent({
  name: 'QueuePanel',
  components: {
    'ft-card': FtCard,
    'ft-list-video': FtListVideo,
    'ft-icon-button': FtIconButton,
  },
  data() {
    return {
      draggingIndex: null,
      dragOverIndex: null,
    }
  },
  computed: {
    queue() {
      return this.$store.getters.getQueue
    },

    queueCount() {
      return this.$store.getters.getQueueCount
    },

    currentIndex() {
      return this.$store.getters.getCurrentQueueItemIndex
    },
  },
  methods: {
    removeItem(index) {
      this.removeVideoFromQueue(index)
    },

    clearAll() {
      this.clearQueue()
    },

    saveToPlaylist() {
      this.showAddToPlaylistPromptForManyVideos({ videos: this.queue })
    },

    onDragStart(event, index) {
      this.draggingIndex = index
      event.dataTransfer.effectAllowed = 'move'
    },

    onDragOver(event, index) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      this.dragOverIndex = index
    },

    onDragLeave() {
      this.dragOverIndex = null
    },

    onDrop(event, index) {
      event.preventDefault()
      if (this.draggingIndex !== null && this.draggingIndex !== index) {
        this.$store.commit('reorderQueue', { fromIndex: this.draggingIndex, toIndex: index })
      }
      this.draggingIndex = null
      this.dragOverIndex = null
    },

    onDragEnd() {
      this.draggingIndex = null
      this.dragOverIndex = null
    },

    ...mapActions([
      'removeVideoFromQueue',
      'clearQueue',
      'showAddToPlaylistPromptForManyVideos',
    ]),
  },
})
