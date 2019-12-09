<template>
  <div id="result">
    <div id="title">
      <p>
        <router-link to="/">Sign in</router-link>
      </p>
      <p>
        <router-link to="/Signup">Sign up</router-link>
      </p>
    </div>
    <div>
	  <button id="prev" v-on:click="startPage()">startPage</button>
      <button id="prev" v-on:click="prevPage()">prevPage</button>
      <input id="search" placeholder="输入搜索内容，如:people/1" v-model="content"></input>
      <button v-on:click="get()">Search</button>
      <button id="next" v-on:click="nextPage()">nextPage</button>
    </div>
    <div id="text">
      <textarea v-model="msg" rows="30" cols="100"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: function() {
    return {
      msg: "",
      content: "",
      pages: 109,
      contentTag: "",
      currentPage: 1
    };
  },
  methods: {
    get: function() {
      var flag = /^([a-z]{1,10}((\/[0-9]*)|(\/\?page\=\d)))?$/.test(this.content);
      // if(!flag) {
      //   alert("please input correctly!");
      //   return;
      // }
      // console.log(this);
      this.$http.get("/api/" + this.content).then(
        function(res) {
          if(res.ok) {
            this.msg = JSON.stringify(res.data, null, 5);
            this.contentTag = this.content.split("/")[0];
          }
        }, function(res) {
          alert("error");
        });
    },

	startPage: function() {
      var nowP=1;
      this.currentPage = nowP;
      this.$http.get("/api/" + this.contentTag + "/?page=" + nowP).then(
        function(res) {
          this.msg = JSON.stringify(res.data, null, 4);
          console.log("Page: ", this.currentPage, "/", this.pages);
        });
    },
	
    prevPage: function() {
      var nowP = this.currentPage-1 >= 1? this.currentPage-1 : 1;
      this.currentPage = nowP;
      this.$http.get("/api/" + this.contentTag + "/?page=" + nowP).then(
        function(res) {
          this.msg = JSON.stringify(res.data, null, 4);
          console.log("Page: ", this.currentPage, "/", this.pages);
        }, function() {
          alert("Error: no prev page!");
        });
    },

    nextPage: function() {
      var nowP = this.currentPage+1 <= this.pages? this.currentPage+1 : this.pages;
      this.currentPage = nowP;
      this.$http.get("/api/" + this.contentTag + "/?page=" + nowP).then(
        function(res) {
          this.msg = JSON.stringify(res.data, null, 4);
          console.log("Page: ", this.currentPage, "/", this.pages);
        }, function() {
          alert("Error: no next page!");
        });
    }
  }
}
</script>

<style>
#text {
  margin-top: 10px;
}
</style>