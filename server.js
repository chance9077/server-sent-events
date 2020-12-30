#!/usr/bin/env node
const http = require('http')

const options = {
  host: 'localhost',
  port: 5000,
  heartbeat: 2 * 1000,
  path: '/__sse__'
}

const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.url === options.path) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/event-stream;charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
    req.socket.setKeepAlive(true)
    res.writeHead('200', headers)
    res.write('\n')

    let id = setInterval(() => res.write(`data: ${heart()}\n\n`), options.heartbeat)
    
    req.on('close', () => {
      clearInterval(id)
      res.end()
    })
  } else {
    res.end(req.url)
  }
})

function heart() {
  const emoji = ['❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤']
  const index = parseInt(Math.random() * emoji.length)
  return emoji[index]
}

server.listen(options.port, options.host, () => console.log(`server is running at http://${options.host}:${options.port}`))

