<template>
    <div id="signup">
        <div>
            <input id="username" type="text" placeholder="账户" v-model="usr"></input>
        </div>
        <div>
            <input id="password" type="password" placeholder="密码" v-model="psw"></input>
        </div>
        <div id="area">
            <button id="button1" v-on:click="post()">注册</button>
            <button id="button2" v-on:click="back()">返回</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data: function() {
        return {
            usr: "",
            psw: ""
        };
    },
    methods: {
        post: function() {
        this.$http.post("/register", 
            {
                username: this.usr, 
                password: this.psw
            },
            {
                withCredentials:true
            }
            ).then(
            function(res) {
                if(res.ok)
                {
                    this.$router.push({path:'/'});
                }
            },
            function(res) {
                alert(res.data);
            });
        },

        back: function() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>

#signup
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

#button1, #button2
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

#area
{
    margin-top: 10px;
}

</style>
