<template>
<v-app>
  <v-toolbar app dense color="green darken-1">
    <v-toolbar-title icon>Rest Ipsum</v-toolbar-title>
    <v-spacer></v-spacer>
      <router-link to="home" title="HOME"><v-btn icon><v-icon color="white">home</v-icon></v-btn></router-link>
  </v-toolbar>

  <v-content>
 <v-progress-linear v-if="isAppLoading" :indeterminate="true"></v-progress-linear>

    <v-container fluid :class="isAppLoading?'blur':''">
      <router-view></router-view>
    </v-container>
  </v-content>
  
  <v-footer>
    <v-flex xs12>© {{new Date().getFullYear()}} Sc Strider Apps, All rights reserved.</v-flex>
  </v-footer>
</v-app>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { NumericFormatter } from "./utils/numeric-formatter";
import { CallState } from "./utils/call-service";
import Loader from "./components/common/Loader.vue";

export default {
  name: "MainApp",
  components: {
    loader: Loader
  },
  data: () => ({
    isAppLoading:false,
    header:""
  }),
  watch:{
    $route (to, from){
        this.header = to.name;
    }
  },
  methods: {
    ...mapActions(["getSchema"]),
    loadingChanged(isLoading) {
      var self = this;
      setTimeout(function() {
        self.isAppLoading = isLoading;
      }, 300);
    },
    async bootstrap(){
      await this.getSchema();
    }
  },
  mounted() {
    CallState.onChanged(this.loadingChanged);
    this.bootstrap();    
    this.$router.push("/home");
  }
};
</script>


<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
@import "../node_modules/vuetify/dist/vuetify.min.css";

a{
  text-decoration: none;
  color: inherit;
}
.blur{
  pointer-events: none;
  opacity: 0.6;
}
.v-toolbar__title{
  color: white!important;
}

footer{
  background:transparent!important;
  color:green!important;
  text-align: center!important;
  margin: auto!important;
}
</style>


