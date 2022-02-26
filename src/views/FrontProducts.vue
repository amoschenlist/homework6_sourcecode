/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <div>
    前台產品列表
    <Loading :active="isLoading"></Loading>
    <table class="table align-middle">
      <thead>
        <tr>
          <th class="my-2 text-primary">分類</th>
          <th class="my-2 text-primary">產品名稱</th>
          <th class="my-2 text-primary">原價</th>
          <th class="my-2 text-primary">售價</th>
          <th>檢視/加入購物車</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
                  <td>{{ item.category }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{item.origin_price}}</td>
                  <td>{{item.price}}</td>
        <td>
          <div class="btn-group-vertical btn-group-sm">
            <button type="button" class="btn btn-outline-info" @click="getProduct(item.id)"
              :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
              <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
              檢視商品
            </button>
            <button type="button" class="btn btn-outline-danger" @click="addItemToCart(item.id)"
              :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
              <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
              加入購物車
            </button>
          </div>
        </td>                
        </tr>
      </tbody>
      <p class="my-2 text-primary">
        本頁有<span>{{ products.length }}</span> 項產品 / 總共有<span>{{ totalProducts }}</span> 項產品
      </p>
      <Pagination :pages="paginationData" @emit-pages="getData"></Pagination>
    </table>
    <MoadlCartProduct
      ref="refCarProductModal"
      :productinner="tempProductReview"
      @add-to-cart="addItemToCart"
    ></MoadlCartProduct>   
  </div>
</template>

<script>
import MoadlCartProduct from "@/components/MoadlCartProduct.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      tempProductReview: {},
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      paginationData: {},
      totalProducts: 0,
			form: {
		user: {
      name: '',
      email: '',
      tel: '',
      address: '',
		},
		message: '',
      },
      cart: {},
	};
	},
  components: {
    MoadlCartProduct,Pagination,
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {  
		this.getData();       
		},

		// 取得產品資料
		getData(page = 1) {
		const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
		this.$http.get(url).then((response) => {
      const { products, pagination } = response.data;
      this.products = products;
      this.paginationData = pagination;				  
			}).catch((err) => {
        alert(err.data.message);
        window.location = 'index.html';
			})		

			const url2 = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
			this.$http.get(url2).then((response) => {		 
      this.totalProducts = Object.keys(response.data.products).length;  
			}).catch((err) => {
        alert(err.data.message);
        window.location = 'index.html';
			})	
			
		},

		getProduct(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.get(url).then((response) => {
			this.loadingStatus.loadingItem = '';
			this.tempProductReview = response.data.product;
			this.$refs.refCarProductModal.openModal();
      }).catch((err) => {
			alert(err.data.message);
      });
		},
		
		addItemToCart(id, qty = 1) {
      // eslint-disable-next-line no-undef
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
			product_id: id,
			qty,
      };

      this.$refs.refCarProductModal.hideModal();
      this.$http.post(url, { data: cart }).then((response) => {
			alert(response.data.message);
			this.loadingStatus.loadingItem = '';
			this.getCartDataList();
      }).catch((err) => {
			alert(err.data.message);
      });
		},
		
		updateCartItem(data) {
		this.loadingStatus.loadingItem = data.id;
      // eslint-disable-next-line no-undef
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${data.id}`;
      const cart = {
			product_id: data.product_id,
			qty: data.qty,
      };
      // eslint-disable-next-line no-undef
      axios.put(url, { data: cart }).then((response) => {
			alert(response.data.message);
			this.loadingStatus.loadingItem = '';
			this.getCartDataList();
      }).catch((err) => {
			alert(err.data.message);
			this.loadingStatus.loadingItem = '';
      });
		},
		
		deleteCartDataList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((response) => {
			alert(response.data.message);
			this.getCartDataList();
      }).catch((err) => {
			alert(err.data.message);
      });
		},
		
		getCartDataList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((response) => {
			this.cart = response.data.data;
      }).catch((err) => {
			alert(err.data.message);
      });
		},
		
		removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.delete(url).then((response) => {
			alert(response.data.message);
			this.loadingStatus.loadingItem = '';
			this.getCartDataList();
      }).catch((err) => {
			alert(err.data.message);
      });
		},
		
		buildOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((response) => {
			alert(response.data.message);
			this.$refs.form.resetForm();
			this.getCartDataList();
      }).catch((err) => {
			alert(err.data.message);
      });
		},		
	}, 
};
</script>