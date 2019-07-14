<template>
  <div class="container">
    <el-row type="flex"
            justify="space-between"
            class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg"
               alt="">
        </nuxt-link>
      </div>

      <!-- 菜单 -->
      <el-row type="flex"
              class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录信息 -->
      <div>
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>

        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                   alt="">
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout () {
      this.$store.commit('user/clearUserInfo');
      this.$message.success("退出成功")
    }
  },
}
</script>

<style scoped lang="less">
.container {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  //position: relative;
  //z-index: 999;
}

.main {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}

.logo {
  margin-right: 20px;
  img {
    width: 165px;
    height: 42px;
    margin-top: 9px;
  }
}

.navs {
  flex: 1;

  a {
    display: block;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;

    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }

  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  outline: none;
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}
</style>
