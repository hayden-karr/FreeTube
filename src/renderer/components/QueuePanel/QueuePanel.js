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

    ...mapActions([
      'removeVideoFromQueue',
      'clearQueue',
    ]),
  },
})
