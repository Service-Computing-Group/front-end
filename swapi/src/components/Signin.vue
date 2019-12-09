<template>
    <div id="login">
        <div>
            <div id="label1">用户：</div>
            <input id="username" type="text" placeholder="user" v-model="usr"></input>
        </div>
        <div>
            <div id="label2">密码：</div>
            <input id="password" type="password" placeholder="password" v-model="psw"></input>
        </div>
        <div id="area">
            <button v-on:click="post">登录</button>
            <button v-on:click="register">注册</button>
            <button v-on:click="visitorLogin()">游客登录</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Signin',
    data: function() {
        return {
            usr: "",
            psw: ""
        };
    },
    methods: {
        post: function() {
        this.$http.post("http://localhost:8080/login", 
            {
                username: this.usr, 
                password: this.psw
            },
            {
                withCredentials: true
            }
            ).then(
            function(res) {
                if (res.ok) 
                {
                    var strContent = JSON.stringify(res.data);
                    var jsonContent = JSON.parse(strContent);
                    //console.log("token:",jsonContent["token"]);
                    $cookies.set("LogInUser", jsonContent["token"]);
                    this.$router.push({path:"/Search"});
                }
                else {
                    alert("Error: Sign in error!");
                }
            },
            function() {
                alert("error");
            });
        },

        register: function() {
            this.$router.push({path:"/Signup"});
        },

        visitorLogin: function() {
            $cookies.set("LogInUser", "guest");
            this.$router.push({path:"/Search"});
        }
    }
}
</script>

<style>

#login
{
    width: 300px;
    height: 300px;
    margin: 0 auto;
}

#label1, #label2, #username, #password
{
    margin-top: 10px;
    margin-left: 0;
    display: inline;
    text-align: center;
}

#area
{
    margin-top: 10px;
}

</style>