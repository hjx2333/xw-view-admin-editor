const system = {
  state: {
    // 所有的组件配置集合
    allComponentsConfig: {},
    // 编辑器内的组件集合
    componentStore: [],
    // 编辑器内当前选中的组件
    currentComponent: null,
    currentComponentIndex: undefined,
    // 组件操作的缓存队列
    handleCache: [],
    // 开始拖拽的组件
    dragStartComponent: null,
    globalConfig: null,
    // 需要复制、剪切的组件
    copyComponent: null,
    // 鼠标是否在编辑区内
    inEditorStatus: false,
    // 子组件选中时，保存对应布局组件id
    parentId: ''
  },
  mutations: {
    updateAllComponentsConfig(state, config) {
      state.allComponentsConfig = config
    },
    updateCurrentComponent(state, component) {
      state.currentComponent = component
    },
    updateCurrentComponentIndex(state, index) {
      state.currentComponentIndex = index
    },
    addComponentStore(state, data) {
      state.componentStore = state.componentStore.concat(data)
    },
    removeComponentStore(state, i) {
      const lastIndex = state.componentStore.length - 2
      i = i === undefined ? lastIndex : i
      state.componentStore.splice(i, 1)
    },
    clearComponentStore(state) {
      state.componentStore = []
    },
    addHandleCache(state, data) {
      state.handleCache.push(data)
      console.log('🚀 ~ file: system.js ~ line 39 ~ addHandleCache ~ state.handleCache', state.handleCache)
    },
    removeHandleCache(state, i) {
      state.handleCache.pop()
    },
    clearHandleCache(state) {
      state.handleCache = []
    },
    updateDragStartComponent(state, component) {
      state.dragStartComponent = component
    },
    updateEvent({ currentComponent }, { eventName, handler }) {
      currentComponent.store.event[eventName] = handler
    },
    updateStyle({ currentComponent }, { name, value }) {
      currentComponent.style[name] = value
    },
    updateStaticData({ currentComponent }, staticData) {
      currentComponent.store.staticData = staticData
    },
    updateRequest({ currentComponent }, request) {
      currentComponent.store.request = request
    },
    updateAnimate({ currentComponent }, animate) {
      currentComponent.animate = animate
    },
    initGlobalConfig(state, data) {
      state.globalConfig = data
    },
    updateGlobalEditorConfig(state, { name, value }) {
      state.globalConfig.editor[name] = value
    },
    updateGlobalRequestConfig({ globalConfig }, request) {
      globalConfig.request = request
    },
    updateCopyComponent(state, data) {
      state.copyComponent = data
    },
    setInEditorStatus(state, status) {
      state.inEditorStatus = status
    },
    setParentId(state, component) {
      state.parentId = component
    }
  }
}

export default system
