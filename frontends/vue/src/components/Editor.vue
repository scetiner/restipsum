<template>
    <v-flex>
        <codemirror :value="code" :options="editorOption" ref="cEditor" @change="codeChanged"></codemirror>                     
    </v-flex>
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
require('codemirror/mode/javascript/javascript')

export default {
  components: {
    codemirror
  },
  props: {
    code: String,
    readOnly: Boolean
  },
  data:()=> ({          
  }),
  computed: {
    editor() {
      // get current editor object
      return this.$refs.cEditor.editor;
    },
    editorOption(){
        return {
        mode: "javascript",
        extraKeys: { "Ctrl-Space": "autocomplete" },
        smartIndent: true,
        lineNumbers: true,
        indentWithTabs: true,
        lineWrapping: true,
        readOnly:this.readOnly ? "nocursor": false,
        disabled:this.readOnly
      }  
    }
  },
    watch:{
    code:function(nv){
      if(this.editor){
        // this.editor.focus();
      }
    }
  },
  methods:{
      codeChanged(newValue){
        //   this.editor.focus();
      }
  },
  mounted() {
    // use editor object...
    // this.editor.focus();
  }
};
</script>


