import logo from './logo512.png'
import './index.css'
import './index.less'
import axios from 'axios'

// console.log(logo)

const img = new Image()
img.src = logo;
img.classList.add('logo')

const root = document.getElementById('root')
root.append(img)

// 8. devtool:
document.write('hello webpack, 哈哈哈哈哈')
// 故意写错，测试devtool
// console.lo('hello!!!!!!??!!!')

// 9. webpack-dev-server:
// axios获取mockServer数据：
// axios.get('http://localhost:9092/api/info').then(response => console.log(response))
axios.get('/api/info').then(response => {
  console.log(response.data)
// Object { name: "yy", age: 10, msg: "模拟后端数据" }
})

// 10. HMR热模块更新:
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};