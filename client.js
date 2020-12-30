const options = {
  host: 'localhost',
  port: 5000,
  path: '/__sse__'
}

if (window.EventSource) {
  const { host, port, path } = options
  const source = new EventSource(`http://${host}:${port}${path}`)

  source.onopen = () => console.log('server is connected')
  source.onerror = () => {
    console.log('server error')
    source.close()
  }
  source.onmessage = evt => console.log(`message: ${evt.data}`)
} else {
  throw new ReferenceError(`can't find EventSource on window.`)
}