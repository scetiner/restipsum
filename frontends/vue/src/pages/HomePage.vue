<template>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Paste your JSON</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Check Schema and Fix if necessary</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Get your endpoint</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="grey lighten-1"
        >
        <v-card-media>
          <ceditor :code="sample"></ceditor>
        </v-card-media>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Next Step
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
        >
        <v-card-media>
          <v-layout row>
            <v-flex xs6><ceditor :code="sample"></ceditor></v-flex>
            <v-flex xs6><ceditor :code="ipsum"></ceditor></v-flex>
          </v-layout>
        </v-card-media>
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
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  <!-- <v-layout row>
    <v-flex xs4>
    <ceditor :code="sample"></ceditor>
    </v-flex>
    <v-flex xs4>
    <ceditor :code="schema"></ceditor>
    </v-flex>
    <v-flex xs4>
    <ceditor :code="ipsum"></ceditor>
    </v-flex>
  </v-layout> -->
        <!-- <v-card>
          <v-card-title >Welcome {{username}}</v-card-title>
          <v-divider></v-divider>
          <v-list two-line>
          <v-list-tile>
              <v-list-tile-avatar>
                <v-icon color="blue">dashboard</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title > Categories</v-list-tile-title>
                <v-list-tile-sub-title >Blocking categories</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                {{ counts.category }}
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
              <v-list-tile-avatar>
                <v-icon color="red">visibility_off</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title > Blacklisted Domains</v-list-tile-title>
                <v-list-tile-sub-title >Domains denied to visit</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                {{ counts.blacklist }}
            </v-list-tile-action>          
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
              <v-list-tile-avatar>
                <v-icon color="green">visibility</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title > Whitelisted Domains</v-list-tile-title>
                <v-list-tile-sub-title >Domains allowed to visit</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                {{ counts.whitelist }}
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        </v-card> -->
  </v-layout>
  
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