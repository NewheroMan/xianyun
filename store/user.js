export const state = () => {
  return {
    userInfo: {
      token: "",
      user: {

      }
    }
  }
}
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    }
  }
}

export const actions = {
  login({
    commit
  }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: 'POST',
      data,
    }).then(res => {
      let data = res.data
      commit("setUserInfo", data);
      return data;
    })
  },
  sendCode(store, phoneNumber) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel: phoneNumber
      }
    }).then(res => {
      const {
        code
      } = res.data;
      return code;
    })
  }
}
