<template>

  <v-flex fluid grid-list-md>
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
  </v-flex>
  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";

export default {
  data: () => ({
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