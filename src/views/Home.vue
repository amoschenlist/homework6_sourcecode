<template>
  <div class="home">
    <h1>公司商品</h1>
    <div id="nav">
      <router-link to="/frontproducts">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/admin/backendproducts">商品管理後台</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
};
</script>