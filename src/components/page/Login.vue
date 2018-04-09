<template>
  <div id="login-page">
    <div class="login-body">
      <div class="title">
        锐锐科技有限公司<br/>
        <span>Rui Rui technology co., Ltd.</span>
      </div>
      <div class="login-box">
        <div class="loginbg"><img src="../../../static/img/login/2.png"/></div>
        <div class="logincon">
          <div class="logincon_01">不良事件上报系统</div>
          <table>
            <tr>
              <td><img src="../../../static/img/login/headp.png"/></td>
              <td><input id="account" type="text" v-model="ruleForm.ACCOUNT" placeholder="用户名/账号"/></td>
            </tr>
            <tr>
              <td><img src="../../../static/img/login/password.png"/></td>
              <td><input id="password" type="password" v-model="ruleForm.PASSWORD" placeholder="密码"/></td>
            </tr>
          </table>
          <div class="logincon_04" @click="submitForm"><a href="javascript:void(0)">登录</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        ruleForm: {
          ACCOUNT: 'pubing',
          PASSWORD: '123456'
        }
      }
    },
    methods: {
      submitForm() {
        if (this.$validation(this.ruleForm.ACCOUNT, 'required')) {
          this.$message.error('请输入账号');
          return;
        }
        if (this.$validation(this.ruleForm.PASSWORD, 'required')) {
          this.$message.error('请输入密码');
          return;
        }
        this.$http.post('/user/login', this.ruleForm).then(res => {
          if (res.code == 10000) {
            this.$httpHeader.sessionId = res.data.token;
            localStorage.setItem('user', JSON.stringify(res.data.user))
            this.$router.push('/index');
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        })
      }
    }
  }
</script>

<style>
  #login-page {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login/indexbg.png) no-repeat center #44c3f0;
  }

  #login-page .login-body {
    width: 1200px;
    margin: 0 auto;
  }

  #login-page .login-body .title {
    font-size: 30px;
    color: white;
    padding-top: 20px;
  }

  #login-page .login-body .title span {
    font-size: 19px;
  }

  #login-page .login-body .login-box {
    margin-top: 100px;
  }

  #login-page .login-body .loginbg {
    float: left;
  }

  @media screen and (max-width: 1366px) {
    #login-page .login-body .loginbg img {
      width: 500px;
    }

    #login-page .login-body .login-box {
      margin-top: 50px;
    }
  }

  #login-page .login-body .logincon {
    color: #FFF;
    float: right;
    width: 420px;
    background: #2ca3dc;
    border-radius: 5px;
    opacity: 0.7;
    padding: 50px 40px;
  }

  #login-page .login-body .logincon_01 {
    font-size: 34px;
    letter-spacing: 0.5em;
  }

  #login-page .login-body .logincon table {
    width: 100%;
    margin-top: 30px;
  }

  #login-page .login-body .logincon table td {
    padding-bottom: 30px;
  }

  #login-page .login-body .logincon table td:nth-child(1) {
    width: 33px;
  }

  #login-page .login-body .logincon table input {
    height: 43px;
    width: 332px;
    margin-left: 20px;
    border: 1px solid #5f87ab;
    padding: 0 5px;
  }

  #login-page .login-body .logincon .logincon_04 {
    background: #0477d0;
    margin-top: 28px;
    width: 400px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  #login-page .login-body .logincon .logincon_04 a {
    text-decoration: none;
    color: white;
    font-size: 14px;
  }
</style>
