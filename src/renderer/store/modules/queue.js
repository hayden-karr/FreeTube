const state = {
  queue: [],
  currentQueueItemIndex: -1,
}

const getters = {
  getQueue: (state) => state.queue,
  getQueueCount: (state) => state.queue.length,
  getCurrentQueueItemIndex: (state) => state.currentQueueItemIndex,
  isVideoInQueue: (state) => (videoId) => state.queue.some((item) => item.videoId === videoId),
  getQueueIndexForVideo: (state) => (videoId) => state.queue.findIndex((item) => item.videoId === videoId),
  getNextQueueVideo: (state) => {
    const nextIndex = state.currentQueueItemIndex + 1
    if (nextIndex < state.queue.length) {
      return state.queue[nextIndex]
    }
    return null
  },
  getPreviousQueueVideo: (state) => {
    const prevIndex = state.currentQueueItemIndex - 1
    if (prevIndex >= 0) {
      return state.queue[prevIndex]
    }
    return null
  },
}

const actions = {
  addVideoToQueue({ commit }, videoData) {
    commit('addToQueue', {
      videoId: videoData.videoId,
      title: videoData.title,
      author: videoData.author,
      authorId: videoData.authorId,
      lengthSeconds: videoData.lengthSeconds,
      published: videoData.published,
      timeAdded: Date.now(),
    })
  },

  removeVideoFromQueue({ commit }, index) {
    commit('removeFromQueue', index)
  },

  clearQueue({ commit }) {
    commit('clearQueue')
  },

  playNextFromQueue({ state, commit }) {
    const nextIndex = state.currentQueueItemIndex + 1
    if (nextIndex < state.queue.length) {
      commit('setCurrentQueueItemIndex', nextIndex)
      return state.queue[nextIndex]
    }
    return null
  },

  playPreviousFromQueue({ state, commit }) {
    const prevIndex = state.currentQueueItemIndex - 1
    if (prevIndex >= 0) {
      commit('setCurrentQueueItemIndex', prevIndex)
      return state.queue[prevIndex]
    }
    return null
  },

  insertVideoAfterCurrent({ state, commit }, videoData) {
    const insertIndex = Math.max(0, state.currentQueueItemIndex + 1)
    commit('insertIntoQueue', {
      video: {
        videoId: videoData.videoId,
        title: videoData.title,
        author: videoData.author,
        authorId: videoData.authorId,
        lengthSeconds: videoData.lengthSeconds,
        published: videoData.published,
        timeAdded: Date.now(),
      },
      index: insertIndex,
    })
    commit('setCurrentQueueItemIndex', insertIndex)
  },

  jumpToQueueItem({ commit }, index) {
    commit('setCurrentQueueItemIndex', index)
  },
}

const mutations = {
  addToQueue(state, videoData) {
    state.queue.push(videoData)
  },

  removeFromQueue(state, index) {
    if (index < 0 || index >= state.queue.length) return

    state.queue.splice(index, 1)

    // Adjust currentQueueItemIndex if needed
    if (index <= state.currentQueueItemIndex) {
      state.currentQueueItemIndex = Math.max(-1, state.currentQueueItemIndex - 1)
    }
  },

  clearQueue(state) {
    state.queue = []
    state.currentQueueItemIndex = -1
  },

  setCurrentQueueItemIndex(state, index) {
    state.currentQueueItemIndex = index
  },

  reorderQueue(state, { fromIndex, toIndex }) {
    const item = state.queue.splice(fromIndex, 1)[0]
    state.queue.splice(toIndex, 0, item)

    const cur = state.currentQueueItemIndex
    if (cur === fromIndex) {
      state.currentQueueItemIndex = toIndex
    } else if (fromIndex < toIndex && cur > fromIndex && cur <= toIndex) {
      state.currentQueueItemIndex = cur - 1
    } else if (fromIndex > toIndex && cur >= toIndex && cur < fromIndex) {
      state.currentQueueItemIndex = cur + 1
    }
  },

  insertIntoQueue(state, { video, index }) {
    state.queue.splice(index, 0, video)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
