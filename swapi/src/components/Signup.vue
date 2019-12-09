<template>
    <div id="signup">
        <div>
            <div id="label1">用户：</div>
            <input id="username" type="text" placeholder="user" v-model="usr"></input>
        </div>
        <div>
            <div id="label2">密码：</div>
            <input id="password" type="password" placeholder="password" v-model="psw"></input>
        </div>
        <div id="area">
            <button v-on:click="post()">注册</button>
            <button v-on:click="back()">返回</button>
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
        this.$http.post("http://localhost:8080/register", 
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
                    if (res.data == "Create a account\n") {
                        this.$router.push({path:'/'});
                    }
                    else {
                        alert(res.data);
                    }
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

#area
{
    margin-top: 10px;
}

</style>
