<template>
    <div id="result">
        <div id="title">
            <button v-on:click="back()">返回</button>
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
      contentTag: "",
      currentPage: 1,
      count: 0,
      index: 0
    };
  },
  methods: {
    get: function() 
    {
        this.$http.get("/api/" + this.content).then(
            function(res) {
                if (res.ok) 
                {
                    this.msg = JSON.stringify(res.data, null, 5);
                    console.log(res.data.result[0].url.split('/')[5]);
                    console.log(res.data.count);
                    this.contentTag = this.content.split('/')[0];
                    this.count = res.data.count;
                }
            }, function(res) {
                this.msg = "404 NOT FOUND";
            }
        );
    },

	startPage: function() 
    {
        this.currentPage = 1;
        this.index = 1;
        this.$http.get("/api/" + this.contentTag + "/?page=1").then(
            function(res) 
            {
                this.msg = JSON.stringify(res.data, null, 4);
            }
        );
    },
	
    prevPage: function() 
    {
        if (this.index - 10 < 0)
        {
            this.msg = "No previous pages";
            return;
        }
        this.currentPage = this.currentPage - 1;
        this.$http.get("/api/" + this.contentTag + "/?page=" + this.currentPage).then(
            function(res) 
            {
                this.msg = JSON.stringify(res.data, null, 4);
                this.index = this.index - 10;
            }, function() {
                alert("Cannot get page!");
            }
        );
    },

    nextPage: function() 
    {
        if (this.index + 10 > this.count) {
            this.msg = "No more pages";
            return;
        }
        this.currentPage = this.currentPage + 1;
        this.$http.get("/api/" + this.contentTag + "/?page=" + this.currentPage).then(
            function(res) {
                this.msg = JSON.stringify(res.data, null, 4);
                this.index = this.index + 10;
            }, function() {
                alert("Cannot get page!");
            }
        );
    },

    back: function() {
        this.$router.go(-1);
    }
  }
}
</script>

<style>
#result
{
    margin-top: 0;
}

#text 
{
    margin-top: 10px;
}

#search
{
    width: 220px;
}
</style>