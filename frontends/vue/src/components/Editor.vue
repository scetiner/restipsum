<template>
    <codemirror :value="json" :options="editorOption" ref="cEditor" @change="codeChanged"></codemirror>                     
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
require('codemirror/mode/javascript/javascript')

export default {
  components: {
    codemirror
  },
  props: {
    code: Object
  },
  data:()=> ({    
      editorOption: {
        mode: "javascript",
        extraKeys: { "Ctrl-Space": "autocomplete" },
        smartIndent: true
      }       
  }),
  computed: {
      json(){
          return JSON.stringify(this.code,null,2);
      },
    editor() {
      // get current editor object
      return this.$refs.cEditor.editor;
    }
  },
  methods:{
      codeChanged(newValue){
          console.log(newValue);
      }
  },
  mounted() {
    // use editor object...
    this.editor.focus();
  }
};
</script>

