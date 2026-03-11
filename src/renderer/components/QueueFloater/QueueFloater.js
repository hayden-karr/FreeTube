import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'QueueFloater',

  data() {
    return {
      dismissed: false,
      prevQueueCount: 0,
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

    activeVideo() {
      if (this.currentIndex >= 0 && this.currentIndex < this.queue.length) {
        return this.queue[this.currentIndex]
      }
      return this.queue[0] ?? null
    },

    activeIndex() {
      if (this.currentIndex >= 0) {
        return this.currentIndex
      }
      return 0
    },

    isWatchPage() {
      return this.$route.path.startsWith('/watch')
    },

    visible() {
      return !this.dismissed && this.queueCount > 0 && this.activeVideo !== null && !this.isWatchPage
    },

    backendPreference() {
      return this.$store.getters.getBackendPreference
    },

    currentInvidiousInstanceUrl() {
      return this.$store.getters.getCurrentInvidiousInstanceUrl
    },

    thumbnailUrl() {
      const videoId = this.activeVideo?.videoId
      if (!videoId) { return '' }

      const baseUrl = this.backendPreference === 'invidious'
        ? this.currentInvidiousInstanceUrl
        : 'https://i.ytimg.com'

      return `${baseUrl}/vi/${videoId}/mqdefault.jpg`
    },
  },

  watch: {
    queueCount(newCount, oldCount) {
      if (oldCount === 0 && newCount > 0) {
        this.dismissed = false
      }
    },
  },

  methods: {
    dismiss() {
      this.dismissed = true
    },

    enterQueue() {
      this.jumpToQueueItem(this.activeIndex)
      this.$router.push({ path: `/watch/${this.activeVideo.videoId}` })
    },

    ...mapActions([
      'jumpToQueueItem',
    ]),
  },
})
