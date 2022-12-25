const themeMap = [
  {
    key: 'light',
    value: '白天模式'
  },
  {
    key: 'dark',
    value: '黑夜模式'
  }
]

const themeStore = {
  light: {
    '--primary-color': '#3296fa',
    '--bg-color': '#fff',
    '--aside-bg-color': '#f2f3f5',
    '--border-color': '#f2f2f2',
    '--text-color': '#333',
    '--btn-text-color': '#333'
  },
  dark: {
    '--primary-color': '#51d6a9',
    '--bg-color': 'rgb(24, 24, 28)',
    '--aside-bg-color': '#232324',
    '--border-color': '#2a2a2b',
    '--text-color': '#fff',
    '--btn-text-color': '#fff'
  }
}

export function getThemeMap() {
  return themeMap
}

export function changeTheme(key) {
  setStyleProperty(themeStore[key])
}

export function setStyleProperty(data) {
  for (const i in data) {
    document.body.style.setProperty(i, data[i])
  }
}
