class EventHub {
  hub = Object.create(null)

  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data))
  }

  on(event, handler) {
    if (!this.hub[event]) {
      this.hub[event] = []
    }
    this.hub[event].push(handler)
  }

  off(event, handler) {
    const idx = (this.hub[event] || []).findIndex(h => h === handler);
    if (idx > -1) {
      this.hub[event].splice(idx, 1)
    }
    if (this.hub[event].length === 0) {
      delete this.hub[event]
    }
  }
}

const hub = new EventHub()
const handler = data => console.log(data)

hub.on('message', handler)
hub.emit('message', { hello: 'world' })
hub.off('message', handler)

