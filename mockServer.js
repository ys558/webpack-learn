const express = require('express');
const app = express();

app.get('/api/info', (request, response) => {
  response.json({
    name: 'yy', age: 10, msg: '模拟后端数据'
  })
})

app.listen('9092', () => console.log('listen on port 9092'))