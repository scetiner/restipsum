<template>
<v-flex>
  <v-layout row>
        <v-flex xs12 sm12 style="height: 100px; position: relative">
          <v-text-field
          v-model="domain"
            label="add new domain"
            hint="example.com"
            :rules="[rules.validDomain]"
          ></v-text-field>    
          <v-btn
              color="green"
              dark
              small
             absolute               
              right   
              @click="saveSettings()"           
            >      
              <v-icon>add</v-icon>
            </v-btn>
        </v-flex>        
  </v-layout>
  <br>
  <v-layout row>
    <v-alert :value="hasError" color="error" icon="warning">
        {{errorMessage}}
    </v-alert>
  </v-layout>
<br>
  <v-layout row>
  <v-card>
             
    <v-card-title>
        {{isBlacklist? 'Blacklisted' : 'Whitelisted'}} Domains
    </v-card-title>
    <v-data-table
      :items="filteredList"
        hide-details
        hide-headers
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item }}</td>
      <td class="text-xs-right"><v-icon flat small color="green" class="hovered-icon" @click="deleteDomain(props.item)">delete</v-icon></td>
    </template>
    </v-data-table>
  </v-card>
  </v-layout>
</v-flex>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";

export default {
  props: {
    listType: String
  },
  data: () => ({
    isValidDomain: true,
    domain: "",
    rules: {
      validDomain: value => {
        if(value == ""){
          return true;
        }
        const pattern = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
        return pattern.test(value) || "Invalid domain.";
      }
    }
  }),
  computed: {
    ...mapGetters(["blacklist", "whitelist", "userId", "errorMessage"]),
    isBlacklist() {
      return this.listType && this.listType === "black" ? true : false;
    },
    hasError() {
      return this.errorMessage ? true : false;
    },
    filteredList() {
      let list = this.isBlacklist ? this.blacklist : this.whitelist;
      return list.filter(k => {
        if (!this.domain) return true;
        return (
          k
            .toString()
            .toLowerCase()
            .indexOf(this.domain.toLowerCase()) !== -1
        );
      });
    }
  },
  methods: {
    ...mapActions(["getSettings", "saveLists","deleteFromList"]),
    async saveSettings() {
      if (this.domain) {
        await this.saveLists({
          userId: this.userId,
          isBlacklist: this.isBlacklist,
          domain: this.domain
        });
        this.domain = "";
      }
    },
    async deleteDomain(domain) {
      await this.deleteFromList({
          userId: this.userId,
          isBlacklist: this.isBlacklist,
          domain: domain
        });
    }
  },
  mounted() {
    if (this.userId) {
      this.getSettings(this.userId);
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  height: 35px !important;
}

tr .hovered-icon{
    display: none!important;
}

tr:hover .hovered-icon{
    display: inherit!important;
    float: right;
}
</style>