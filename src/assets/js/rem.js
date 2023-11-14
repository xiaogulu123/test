// rem等比适配配置文件
// 基准大小
import store from "../../store/index"
const baseSize = 16
// 设置 rem 函数
function setRem () {
  // const scale =  document.documentElement.clientWidth / 1440
	var scale = 1
	scale = document.documentElement.clientWidth / 750
	store.commit('setScale',scale)
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
	// console.log(scale)
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
