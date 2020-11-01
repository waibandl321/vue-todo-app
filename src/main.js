import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


  let sidebar = document.getElementById('sidebar');
  let sidebarHeight = sidebar.offsetHeight;
  const header = document.querySelector('.header').offsetHeight;
  const footer = document.querySelector('.footer').offsetHeight;
  const body = document.querySelector('body').offsetHeight;
  let task_detail_wrap = document.querySelector('.task_detail_wrap');
  let taskDetailWrapHeight = task_detail_wrap.offsetHeight;
  let richTextBody = document.querySelector('.editor');
  let richTextBodyHeight = body - (header + footer + taskDetailWrapHeight + 50);
  sidebarHeight =  body - (header + footer);
  sidebar.style.height = sidebarHeight + 'px';
  richTextBody.style.height = richTextBodyHeight + 'px';

