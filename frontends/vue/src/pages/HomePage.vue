<template>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Paste/Edit your JSON, Get your sample</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Check Schema and Generated Sample</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
        >
        <v-responsive>
          <v-layout row>
            <v-flex xs4 class="p10">              
              <span class="mb-10"><strong>Your JSON Model</strong></span>
              <br>
              <ceditor :code="sample" :onUpdate="sampleChanged"></ceditor>
              <v-btn @click="getSchemaFromSample()">Get Schema</v-btn> 
            </v-flex>
            <v-flex xs4 class="p10">
              <span class="mb-10"><strong>Schema</strong></span>
              <ceditor :code="schema" :onUpdate="schemaChanged"></ceditor>
              <v-btn @click="getSampleFromSchema()">Get Sample</v-btn> 
            </v-flex>
            <v-flex xs4 class="p10"><span class="mb-10"><strong>Generated Sample</strong></span><ceditor :code="ipsum"></ceditor></v-flex>
          </v-layout>          
        </v-responsive>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Generate Schema
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5">
        <v-responsive>
          <v-layout row>
            <v-flex xs5><span class="mb-10">Schema</span><ceditor :code="schema"></ceditor></v-flex>
            <v-flex xs6 offset-xs1><span class="mb-10">Generated Sample</span><ceditor :code="ipsum"></ceditor></v-flex>
          </v-layout>
        </v-responsive>
        </v-card>        

        <v-btn color="default" 
          @click="e1 = 1"><v-icon>arrow_back</v-icon> Back</v-btn>
        
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Get your token
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import Editor from "./../components/Editor.vue";
export default {
  components:{
    ceditor:Editor
  },
  data: () => ({
    e1: 0,
    sampleStr:"",
    schemaStr:""
  }),
  computed: {
    ...mapGetters([ "sample","schema","ipsum"])
  },
  methods: {
    ...mapActions(["generateSchema","getSample"]),
    sampleChanged(newValue){
      this.sampleStr = newValue;
    },
    schemaChanged(newValue){
      this.schemaStr = newValue;
    },
    getSchemaFromSample(){
      this.generateSchema(this.sampleStr);
    },
    getSampleFromSchema(){      
      this.getSample(this.schemaStr);
    }
  },
  // watch:{
  //   userId:function(nv){
  //     if(this.userId){
  //       this.getSettings(this.userId);
  //     }
  //   }
  // },
  mounted(){
    this.schemaStr = this.schema;
    this.sampleStr = this.sample;
  }
};
</script>

<style scoped>
.p10{
  position: relative;
  padding: 10px !important;
}
.mb-10 {
  margin-bottom: 20px!important;
}
</style>