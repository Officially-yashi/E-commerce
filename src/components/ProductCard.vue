<template>
  <div class="p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
      >
        <img :src="product.images[0]" alt="Product image" class="w-full h-48 object-contain mb-2" />
        <h3 class="text-lg font-semibold">{{ product.title }}</h3>
        <p class="text-gray-500 capitalize">{{ product.category }}</p>
        <p class="text-blue-600 font-bold mt-1">${{ product.price }}</p>


     <button
        :disabled="isInCart(product.id)"
        @click="handleAddToCart(product)"
        :class="[
          'mt-2 py-2 px-4 rounded transition duration-300',
          isInCart(product.id)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        ]"
      >
        {{ isInCart(product.id) ? 'Already in Cart' : 'Add to cart' }}
      </button>

          <button @click="fetchProductDetails(product.id)"  class="bg-blue-600 text-white py-2 px-4 mx-4 rounded hover:bg-blue-700 transition duration-300">
 View
</button>
      </div>
    </div>

    <!-- Pagination Buttons -->
    <div class="flex justify-center mt-6 space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{
          'bg-blue-500 text-white': currentPage === page,
          'bg-gray-200': currentPage !== page
        }"
        class="px-3 py-1 rounded"
      >
        {{ page }}
      </button>
    </div>
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full relative">
        <button @click="selectedProduct = null" class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>

        <div class="flex flex-col md:flex-row gap-4">
         <carousel :per-page="1" :navigation-enabled="true" class="w-full md:w-1/2 h-64">
  <slide v-for="(img, index) in selectedProduct.images" :key="index">
    <img :src="img" alt="Product Image" class="w-full h-64 object-contain rounded" />
  </slide>
</carousel>

          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-2">{{ selectedProduct.title }}</h2>
            <p class="text-gray-500 capitalize mb-2">{{ selectedProduct.category }}</p>
            <p class="text-lg text-blue-600 font-semibold mb-4">${{ selectedProduct.price }}</p>
            <p class="text-gray-700">{{ selectedProduct.description }}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "ProductCard",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      selectedProduct:null,
    };
  },
  computed: {
    products() {
  return this.$store.getters.getAllProducts;
}
,
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  components: {
  Carousel,
  Slide
},

methods:{
   async fetchProductDetails(productId) {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${productId}`);
        this.selectedProduct = res.data; // Set product to show in modal
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    },

    isInCart(productId) {
      return this.$store.getters.getCartItems.some((item) => item.id === productId);
    },
    handleAddToCart(product) {
      if (!this.isInCart(product.id)) {
        this.$store.dispatch("addToCart", product);
      }
    },
},
  
  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>
