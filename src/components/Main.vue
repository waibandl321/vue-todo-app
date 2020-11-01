<template>
    <div class="main_wrap">
      <div class="sidebar" id="sidebar">
          <ul class="task_list">
              <li 
              v-for="(todo, index) in todos"
              :key="todo.id"
              :class="{active: currentTab === index}"
              class="task_item"
              @click="viewTaskBody(todo)"
              >
                  <h4 class="task_title">{{ todo.name }}</h4>
                  <p class="task_details">詳細{{ todo.details }}</p>
                  <p class="task_deadline clearfix">期限 {{ todo.deadline }}</p>
                  <p class="task_person clearfix">担当者 {{ todo.person }}</p>
              </li>
          </ul>
      </div>
      <div class="task_body">
          <div
          class="task_body_item"
          v-for="todo in todos"
          :key="todo.id"
          v-show="currentTab === todo.id">
            <div class="task_detail_wrap">
              <div class="task_body_form__item name">
                  タスク名 : {{todo.name}}
              </div>
              <div class="task_body_form__item flex">
                  <div class="status">
                    <select name="status" ref="status">
                        <option for="status">現在のステータス : {{todo.status}}</option>
                        <option value="新規">新規</option>
                        <option value="処理中">処理中</option>
                        <option value="社内確認待ち">社内確認待ち</option>
                        <option value="社内確認済み">社内確認済み</option>
                        <option value="報告後先方確認待ち">報告後先方確認待ち</option>
                        <option value="完了">完了</option>
                    </select>
                  </div>
                  <div class="person_in_charge">
                    担当者 : {{todo.person}}
                  </div>
              </div>
              <div class="task_body_form__item deadline">
                    締め切り : {{todo.deadline}}
              </div>
              <div class="task_body_form__item detail">
                   詳細 : {{todo.details}}
              </div>
              </div>
              <Editor :val="todo.id"/>
          </div>
      </div>
    </div>
</template>

<script>
import Editor from './editor/Editor.vue'
// ローカルストレージに値を格納する
const STORAGE_KEY = 'tasks-app'
const todoStorage = {
    fetch: function() {
        const todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}


export default {
    name: 'Main',
    components: {
        Editor
    },
    data() {
        return {
            todos: [],
            currentTab: 0,
            id: 0,
        }
    },
    methods: {
        viewTaskBody: function(todo) {
          this.currentTab = todo.id
        },
    },
    created() {
        this.todos = todoStorage.fetch()
    }
}
</script>

<style>
.main_wrap {
  display: flex;
}
.clearfix:after {
    clear: both;
    display: block;
    content: "";
}
.sidebar {
   overflow-y: scroll;
    width: 30%;
    border-right: 2px solid #ddd;
}
.sidebar h2 {
    padding: 10px 0;
    margin: 0;
}
.task_list {
    margin-top: 50px;
    padding: 0;
}
.task_item {
    box-sizing: border-box;
    position: relative;
    list-style: none;
    border-bottom: 1px solid #ddd;
    text-align: left;
    padding: 10px 20px;
    cursor: pointer;
    transition: .3s;
}
.task_item:hover {
  box-shadow: 0 0 5px #ccc;
  transition: .3s;
}
.task_item:first-child {
    border-top: 1px solid #ddd;
}
.task_item:last-child {
    /* border-bottom: none; */
}
.task_item p {
    margin: 5px 0;
}
.task_details {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.task_item h4 {
    font-size: 18px;
    margin: 5px 0;
}

.task_body {
  width: 70%;
  margin-top: 50px;
  border-top: 1px solid #ddd;
}
.task_body_form__item.name,
.task_body_form__item.deadline,
.task_body_form__item.detail,
.task_body_form__item .person_in_charge {
  border-bottom: 1px solid #ddd;
  text-align: left;
  padding: 10px 20px;

}
.task_body_form__item.name {
    font-weight: bold;
    font-size: 18px;
}
.task_body_form__item .status {
  border-right: 1px solid #ddd;
}
.task_body_form__item.flex {
    display: flex;
}
.task_body_form__item .status {
    width: 40%;
    margin: 0;
    border-bottom: 1px solid #ddd;
}
.task_body_form__item .status select {
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  background: #dbf3ff;
  padding-left: 20px;
}
.task_body_form__item.deadline {
    background: #eee;
}
.task_body_form__item .status select:hover {
  cursor: pointer;
}
.task_body_form__item .person_in_charge {
    width: 60%;
    margin: 0;
    background: #fbebfc;
}


</style>