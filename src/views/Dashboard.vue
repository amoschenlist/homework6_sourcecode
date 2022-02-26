<template>
  <div>
    <h1>商品管理後台</h1>
    <div id="nav"> 
      <router-link to="/admin/backendproducts">產品管理列表</router-link> |
      <router-link to="/admin/backendorders">訂單管理</router-link> |
      <router-link to="/frontproducts">回到前台</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: "Dashboard",
  data() {
    return {
      checkSuccess: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`;

        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
    signout() {
      document.cookie = "hexToken=;expires=;";
      alert("token 已清除");
      this.$router.push("/login");
    },
  },
};
</script>