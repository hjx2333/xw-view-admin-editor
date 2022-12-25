import Vue from 'vue'
import store from '@/store'
import { message } from 'ant-design-vue'
import { deepCopy } from './utils'
import { v4 as uuid } from 'uuid'

/** 全局监听键盘事件 */
export function install() {
  let isCtrlDown = false

  window.addEventListener('keydown', ({ ctrlKey, code }) => {
    if (code === 'Delete') {
      delComponent()
      return
    }

    // 是否按下ctrl
    if (!isCtrlDown) {
      isCtrlDown = ctrlKey
      return
    }

    // 鼠标上次点击是否在编辑区内
    if (!store.state.system.inEditorStatus) return
    validateEventType(code)
  })

  window.addEventListener('keyup', e => {
    e.key === 'Control' && (isCtrlDown = false)
  })

  window.addEventListener('mousedown', () => {
    store.commit('setInEditorStatus', false)
  })
}

/** 判断事件类型，调用对应函数 */
export function validateEventType(code) {
  switch (code) {
    case 'KeyC':
      copyComponent()
      break
    case 'KeyX':
      cutComponent()
      break
    case 'KeyV':
      pasteComponent()
      break
    case 'KeyZ':
      cancelHandle()
      break
  }
}

/** 清空编辑区 */
export function clearEditor() {
  store.commit('updateCurrentComponent', null)
  store.commit('clearHandleCache')
  store.commit('clearComponentStore')
}

/** ctrl+c 复制组件 */
export function copyComponent(type) {
  const data = store.state.system.currentComponent
  if (!data) return

  store.commit('updateCopyComponent', data)
  message.success(type === 'cut' ? '剪切成功' : '复制成功')
}

/** ctrl+x 剪切组件 */
export function cutComponent() {
  copyComponent('cut')
  const componentStore = store.state.system.componentStore
  const index = store.state.system.currentComponentIndex
  store.commit('addHandleCache', deepCopy(componentStore))
  store.commit('removeComponentStore', index)
  store.commit('updateCurrentComponent', null)
}

/** ctrl+v 粘贴组件 */
export function pasteComponent() {
  let data = store.state.system.copyComponent
  if (!data) {
    message.warning('请先复制或者剪切组件')
    return
  }

  data = deepCopy(data)
  const { top, left } = data.style
  data.id = uuid().replace(/-/g, '')
  Object.assign(data.style, {
    top: `${parseInt(top) + 60}px`,
    left: `${parseInt(left) + 60}px`
  })
  store.commit('addComponentStore', deepCopy(data))
  const componentStore = store.state.system.componentStore
  store.commit('addHandleCache', deepCopy(componentStore))
}

/** ctrl+z 撤销操作 */
export function cancelHandle() {
  // 获取操作快照集合，删除最新的快照
  const data = store.state.system.handleCache
  const currentHandle = data[data.length - 2]
  store.commit('removeHandleCache')

  // 快照数据为空，重置
  if (!data.length) {
    clearEditor()
    return
  }

  // 判断当前组件在上一次快照中是否存在，不存在则删除，存在则覆盖
  const sameComponentIndex = currentHandle.findIndex(
    d => d.id === store.state.system.currentComponent?.id
  )
  store.commit(
    'updateCurrentComponent',
    sameComponentIndex >= 0 ? currentHandle[sameComponentIndex] : null
  )

  store.commit('clearComponentStore')
  store.commit('addComponentStore', deepCopy(currentHandle))
}

/** del 删除组件 */
export function delComponent() {
  const data = store.state.system.currentComponent
  if (!data) {
    message.warning('请先选中需要操作的组件')
    return
  }

  const componentStore = store.state.system.componentStore
  const parentId = store.state.system.parentId
  const index = store.state.system.currentComponentIndex
  if (parentId) {
    componentStore.forEach(d => {
      if (d.id === parentId) {
        Vue.set(d.children, index, undefined)
      }
    })
  } else {
    store.commit('removeComponentStore', index)
  }

  store.commit('addHandleCache', deepCopy(store.state.system.componentStore))
  store.commit('updateCurrentComponent', null)
}
