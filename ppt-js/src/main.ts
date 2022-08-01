import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/css/resert.less'
import {Layout, Button, Input} from "ant-design-vue"

createApp(App).use(router).use(Layout).use(Input).use(Button).mount('#app')


//先构造一些假数据，能实现根据数据构造内容
//配置组件对应的映射关系