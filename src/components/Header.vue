<template>
    <div id="app-header">
        <div class="header" id="header">
            <div class="header__logo">
                <h2>{{ title }}</h2>
            </div>
            <div class="header__main">
                <div class="add_task_icon" @click="openModal()">
                <i class="fas fa-plus-circle" style="color: #fff; font-size: 30px;"></i>
                </div>
            </div>
        </div>
        <!-- モーダルの外側をkクリックしたら閉じる = @click.self -->
        <div class="add_task_modal" v-show="showModal" @click.self="closeModal()">
            <div class="add_task_modal__inner">
                <form class="add_task_modal__form" @submit.prevent="doAdd">
                    <div class="add_task_modal__form__item task_name">
                        <input type="text" placeholder="タスク名を入力" ref="name">
                    </div>
                    <div class="add_task_modal__form__item flex">
                        <p class="status">
                            <select name="status" id="status" ref="status">
                                <option for="status">タスクのステータスを選択</option>
                                <option value="新規">新規</option>
                                <option value="処理中">処理中</option>
                                <option value="社内確認待ち">社内確認待ち</option>
                                <option value="社内確認済み">社内確認済み</option>
                                <option value="報告後先方確認待ち">報告後先方確認待ち</option>
                                <option value="完了">完了</option>
                            </select>
                        </p>
                        <p class="person_in_charge">
                            <input type="text" placeholder="担当者を入力" ref="person">
                        </p>
                    </div>
                    <div class="add_task_modal__form__item date">
                        <input type="date" ref="deadline">
                    </div>
                    <div class="add_task_modal__form__item">
                        <textarea style="resize: none" id="" cols="30" rows="10" placeholder="タスクの詳細を入力" ref="details"></textarea>
                    </div>
                    <div class="add_task_modal__form__item submit">
                        <input type="submit" value="タスクを登録">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
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
    data() {
        return {
            title: "Header",
            showModal: false,
            todos: []
        }
    },
    methods: {
        openModal: function() {
            this.showModal = true
        },
        closeModal: function() {
            this.showModal = false
        },
        doAdd: function() {
            const name = this.$refs.name
            const status = this.$refs.status
            const person = this.$refs.person
            const deadline = this.$refs.deadline
            const details = this.$refs.details
            if(!name.value.length) {
                return
            }
            if(!status.value.length) {
                return
            }
            if(!person.value.length) {
                return
            }
            if(!deadline.value.length) {
                return
            }
            if(!details.value.length) {
                return
            }

            this.todos.push({
                id: todoStorage.uid++,
                name: name.value,
                status: status.value,
                person: person.value,
                deadline: deadline.value,
                details: details.value
            })
            name.value = ''
            status.value = ''
            person.value = ''
            deadline.value = ''
            details.value = ''
            this.showModal = false
            window.location.href = ''
        }
    },
    // localStorageへの自動保存
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    // localstorageからデータ取得
    created() {
        this.todos = todoStorage.fetch()
    }
}
</script>




<style>
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #10444D;
  margin: 0 calc(50% - 50vw);
}
.header__logo {
    margin: 0;
    width: 30%;
    color: #fff;
}
.header__logo h2 {
    margin: 0;
}
.add_task_icon {
    cursor: pointer;
}
/* モーダル */
.add_task_modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(16, 68, 77, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.add_task_modal__inner {
    position: relative;
    padding: 0 20px;
    width: 730px;
    height: 80vh;
    background: #fff;
    overflow: auto;
    box-sizing: border-box;
}
.add_task_modal__form__item.task_name {
    border-bottom: 1px solid #ddd;
}
.add_task_modal__form__item.date {
    background: #fff;
    width: 100%;
}
.add_task_modal__form__item.flex {
    display: flex;
    border-bottom: 1px solid #ddd;
}
.status {
    width: 40%;
    margin: 0;
}
.person_in_charge {
    width: 60%;
    position: relative;
    margin: 0;
}
.add_task_modal__form__item input[type="text"],
.add_task_modal__form__item select,
.add_task_modal__form__item input[type="date"],
.add_task_modal__form__item textarea {
    position: relative;
    width: 100%;
    border: none;
    outline: none;
}
.add_task_modal__form__item select {
    border-right: 1px solid #ddd;
}
.add_task_modal__form__item select,
.add_task_modal__form__item input[type="text"],
.add_task_modal__form__item input[type="date"] {
    height: 50px;
    padding-left: 10px;
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
}
.add_task_modal__form__item input[type="date"] {
    border-bottom: 1px solid #ddd;
}
.add_task_modal__form__item textarea {
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
}
.add_task_modal__form__item.submit input {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    line-height: 60px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    background: #82D25F;
    color: #fff;
    font-weight: bold;
}
.add_task_modal__form__item.submit input:hover {
    opacity: .8;
}
</style>