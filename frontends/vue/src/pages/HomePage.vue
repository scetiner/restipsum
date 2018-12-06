<template>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Paste your JSON</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Check Schema and Generated Sample</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Get your endpoint</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
        >
        <v-responsive>
          <v-layout row>
            <v-flex xs5><span class="mb-10">Your JSON Model</span><ceditor :code="sample"></ceditor></v-flex>
            <v-flex xs6 offset-xs1><span class="mb-10">Schema (read only)</span><ceditor :code="schema" readOnly="true"></ceditor></v-flex>
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
            <v-flex xs6 offset-xs1><span class="mb-10">Generated Sample</span><ceditor :code="ipsum" readOnly="true"></ceditor></v-flex>
          </v-layout>
        </v-responsive>
        </v-card>        

        <v-btn color="default" 
          @click="e1 = 1"><v-icon>arrow_back</v-icon> Back</v-btn>
        
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Get your token
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
        >
        <v-responsive>
          <v-layout row>        
            <v-flex xs5><span class="mb-10">Generated Sample</span><ceditor :code="ipsum" readOnly="true"></ceditor></v-flex>
            <v-flex xs6 offset-xs1><span class="mb-10">Your Endpoint</span></v-flex>
          </v-layout>
        </v-responsive>
        </v-card>

        <v-btn color="default" 
          @click="e1 = 1"><v-icon>arrow_back</v-icon> New Endpoint</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import Editor from "../components/Editor";
export default {
  components:{
    ceditor:Editor
  },
  data: () => ({
    e1: 0
  }),
  computed: {
    ...mapGetters([ "sample","schema","ipsum"])
  },
  methods: {
    // ...mapActions(["getSettings"])
  },
  // watch:{
  //   userId:function(nv){
  //     if(this.userId){
  //       this.getSettings(this.userId);
  //     }
  //   }
  // },
  // mounted(){
  //   if(this.userId){
  //     this.getSettings(this.userId);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
</style>