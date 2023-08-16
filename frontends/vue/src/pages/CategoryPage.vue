<template>
    <v-flex>
      <v-btn
              color="green"
              dark
              small
              fixed         
              right  
              bottom      
              fab       
              @click="saveSettings()"           
            >      
              <v-icon>save</v-icon>
            </v-btn>
        <p class="subheading">URL Categories <br><span class="font-weight-thin font-italic">Pick to block.. Save to activate..</span></p>

        <v-list >
        <v-list-tile class="small-tile"
        v-for="(value,key) in categories"
        :key="key"
        >
        <v-list-tile-content>
            <v-list-tile-title v-html="value.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
            <v-checkbox v-model="value.selected"></v-checkbox>
        </v-list-tile-action>
        </v-list-tile>
    </v-list>


    </v-flex>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";




export default {
  data: () => ({
      searchKey:""
  }),
  computed: {
    ...mapGetters(["categories","userId"])    
  },
  methods: {
      ...mapActions(["getSettings","saveCategories"]),
      saveSettings(){
        this.saveCategories({
          categoryMap: this.categories,
          user_id:this.userId
        })
      }
  },
  mounted() {
    if(this.userId){
      this.getSettings(this.userId);
    }
  }
};
</script>

<style scoped>
</style>