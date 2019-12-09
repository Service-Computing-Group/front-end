<template>
    <div id="login">
        <div>
            <input id="username" type="text" placeholder="账号" v-model="usr"></input>
        </div>
        <div>
            <input id="password" type="password" placeholder="密码" v-model="psw"></input>
        </div>
        <div id="area">
            <button id="button1" v-on:click="post">登录</button>
            <button id="button2" v-on:click="register">注册</button>
            <button id="button3" v-on:click="visitorLogin()">游客</button>
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
        this.$http.post("/login", 
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
    height: 250px;
    margin: 0 auto;
    border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0 0 25px #cac6c6;
}

#area
{
    margin-top: 20px;
}

#username, #password
{
    margin-top: 20px;
    margin-left: 0;
    padding-left: 10px;
    text-align: left;
    height: 40px;
    width: 100%;
    color: #606266;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

#username:focus, #password:focus
{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
}

#button1, #button2, #button3
{
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 4px;
	border: 0;
    font-size: 14px;
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 12px 20px;
    display: inline-block;
}

</style>