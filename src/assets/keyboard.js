// keyboard.js
export const useKeyboard = () => {
    const keyMap = new Map()
    
    const register = (key, callback, options = {}) => {
      const handler = (event) => {
        if (event.key === key) {
          if (options.ctrl && !event.ctrlKey) return
          if (options.shift && !event.shiftKey) return
          if (options.alt && !event.altKey) return
          
          callback(event)
          
          if (options.preventDefault) {
            event.preventDefault()
          }
        }
      }
      
      window.addEventListener('keydown', handler)
      keyMap.set(key, handler)
      
      return () => {
        window.removeEventListener('keydown', handler)
        keyMap.delete(key)
      }
    }
    
    const unregister = (key) => {
      const handler = keyMap.get(key)
      if (handler) {
        window.removeEventListener('keydown', handler)
        keyMap.delete(key)
      }
    }
    
    return {
      register,
      unregister
    }
  }
  