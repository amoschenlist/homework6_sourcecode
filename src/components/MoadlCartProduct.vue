<template>
  <div class="modal fade" id="productModal" ref="modalinner">
	<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
		<div class="modal-header bg-info text-white">
    <h5 class="modal-title" id="exampleModalLabel">
			<span>{{ productinner.title }}</span>
    </h5>
    <button type="button" class="btn-close"
      data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div class="modal-body">
    <div class="row">
			<div class="col-md-12">				
			<div class="card my-2">
				<img :src="productinner.imageUrl"
          class="card-img-top primary-image" alt="主圖" />					
			</div>					
			<span v-for="(image, id) in productinner.imagesUrl" :key="id">
					<img
              v-if="image"
              :src="image"                 
              class="images mx-2 my-2" width="100"
					/>
			</span>	 
			</div>
			<div class="col-md-12">	
			<div class="card-body">
              <h5 class="card-title">
					{{ productinner.title }}
					<span class="badge bg-primary my-2">{{ productinner.category }}</span>
          </h5>
          <p>商品描述：{{ productinner.description }}</p>
          <p>商品內容：{{ productinner.content }}</p>
          <div class="h5" v-if="!productinner.price">{{ productinner.origin_price }} 元</div>
          <del class="h6" v-if="productinner.price">原價 {{ productinner.origin_price }} 元</del>
          <div class="h5" v-if="productinner.price">現在只要 {{ productinner.price }} 元</div>
          <div>
					<div class="input-group">
            <input type="number" class="form-control"
							v-model.number="qty" min="1">
          <button type="button" class="btn btn-primary"
          @click="$emit('add-to-cart', productinner.id, qty)">加入購物車</button>
					</div>                 
          </div>
			</div>
			</div>
      </div>
		</div>
          </div>
	</div>
</div> 
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    productinner: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      status: {},
      modalinner: '',
      qty: 1,
    };
  },
  mounted() {
    this.modalinner = new Modal(this.$refs.modalinner, {
      keyboard: false,
      backdrop: 'static'
    });
  },
  methods: {
    openModal() {
      this.modalinner.show();
    },
    hideModal() {
      this.modalinner.hide();
    },
  },
}
</script>

<style>
</style>