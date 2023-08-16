<template>
    <v-flex style="height: 400px;">
        <!-- <vue-json-editor v-model="code" :show-btns="true" :expandedOnStart="true" @json-change="codeChanged"></vue-json-editor> -->
        <!-- <v-jsoneditor ref="cEditor" v-model="json" :options="options" :plus="false" height="400px" @error="onError" @onChangeJSON="codeChanged"/> -->
        <textarea v-model="code" style="width: 100%; height: 100%;"/>
    </v-flex>
</template>

<script>

export default {
  props: {
    code: String,
    onUpdate:Function
  },
  data:()=> ({          
  }),
  computed: {
  },
    watch:{
    code:function(nv){
      if(this.onUpdate){
          this.onUpdate(nv);
      }
    }
  }
};
</script>


