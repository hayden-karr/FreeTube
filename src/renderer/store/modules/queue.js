const state = {
  queue: [],
  currentQueueItemIndex: -1,
}

const getters = {
  getQueue: (state) => state.queue,
  getQueueCount: (state) => state.queue.length,
  getCurrentQueueItemIndex: (state) => state.currentQueueItemIndex,
  getNextQueueVideo: (state) => {
    const nextIndex = state.currentQueueItemIndex + 1
    if (nextIndex < state.queue.length) {
      return state.queue[nextIndex]
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
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
