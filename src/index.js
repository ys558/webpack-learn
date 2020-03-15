import logo from './logo512.png'
import './index.css'
import './index.less'

console.log(logo)

const img = new Image()
img.src = logo;
img.classList.add('logo')

const root = document.getElementById('root')
root.append(img)

document.write('hello webpack, 哈哈哈哈哈')
console.lo('hello!!!!!!??!!!')