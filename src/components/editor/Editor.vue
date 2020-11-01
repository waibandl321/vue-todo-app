<template>
    <div id="editor" class="editor">
        <div class="editor_block">
            <quill-editor v-model="content"
                   ref="quillEditor"
                   :options="editorOption"
                   @input="saveMemo($event)"></quill-editor>
        </div>
        <div class="add_detail">
            <h4>追加メモ</h4>
            <div id="preview" class="content ql-editor " v-html="content"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



export default {
    // タスクID
    props: ["val"],
    name: 'editor',
    data() {
        return {
            content: '',
            editorOption: {
                theme: 'snow'
            },
            id: this.val
        }
    },
    // computedはキャッシュ
    computed: {
        storageKey: function() {
            return `tasks-${this.id}`
        }
    },
    mounted: function(){
        // ローカルストレージに値を格納する
        this.content = localStorage.getItem(this.storageKey)
    },
    methods: {
        saveMemo: function(event) {
            localStorage.setItem(this.storageKey, event)
        }
    },

}
</script>

<style>
.add_detail {
    margin-top: 20px;
}
.add_detail h4 {
    margin: 0;
    padding-left: 20px;
    text-align: left;
}
.ql-container.ql-snow {
    
}
.quill-editor {
    height: 100%;
    border-bottom: 1px solid #ddd;
}
.ql-toolbar.ql-snow {
    text-align: left;
}
.ql-container .ql-editor {
    height: 100px;
    overflow-y: scroll;
}
</style>