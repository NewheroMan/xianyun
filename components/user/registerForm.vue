<template>
  <el-form :model="form"
           ref="form"
           :rules="rules"
           class="form">
    <el-form-item class="form-item"
                  prop="username">
      <el-input v-model="form.username"
                placeholder="用户名手机">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="captcha">
      <el-input v-model="form.captcha"
                placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="nickname">
      <el-input v-model="form.nickname"
                placeholder="你的名字">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="password">
      <el-input v-model="form.password"
                placeholder="密码"
                type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="checkPassword">
      <el-input v-model="form.checkPassword"
                placeholder="确认密码"
                type="password">
      </el-input>
    </el-form-item>

    <el-button class="submit"
               type="primary"
               @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    };
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ], // 验证码
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        checkPassword: [
          // validator: 自定义的验证函数
          { validator: validatePass, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    handleSendCaptcha () {
      const phoneNumber = this.form.username;
      if (!phoneNumber.trim()) {
        this.$message.warning("请输入用户名和手机号码");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: phoneNumber
        }
      }).then(res => {
        // const code = res.data.code;
        const { code } = res.data;

        this.$alert(`手机验证码是：${code}`, '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
      })
    },
    handleRegSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            this.$store.commit("user/setUserInfo", res.data);
            this.$router.back();
          })
        }
      })
    }
    // handleRegSubmit () {
    //   this.$refs.form.validate(valid => {

    //     if (valid) {
    //       // props是除了checkPassword剩余的属性
    //       const { checkPassword, ...props } = this.form;

    //       // 注册接口（自行放到actions）
    //       this.$axios({
    //         url: "/accounts/register",
    //         method: "POST",
    //         data: props
    //       }).then(res => {
    //         // 把数据保存到vuex,user是模块名字（命名空间）
    //         this.$store.commit("user/setUserInfo", res.data);

    //         this.$router.back();
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
