<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

<div v-if="!getSearchTerm && !getShowResults" >
   <ProductCard />
</div>
    <!-- Product Card List -->
   

    <!-- Main Section -->
    <div class="p-4">
      <!-- If a product is selected, show product detail -->
      <div v-if="productToShow" class="mt-4 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ productToShow.title }}</h2>
        <p class="text-lg text-pink-600 font-semibold">₹{{ productToShow.price }}</p>
        <p class="text-sm text-gray-700 mt-2 leading-relaxed">{{ productToShow.description }}</p>

        <div class="mt-4 flex justify-center gap-4">
          <button
            @click="$store.dispatch('addToCart', productToShow)"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Add to Cart
          </button>
          <button
            @click="$store.commit('clearSelectedProduct')"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>

      <!-- Else show normal homepage message -->
      <div v-else>
        <p class="text-center text-gray-600 text-lg mt-10">
          Welcome to our homepage! Please search for a product to view details.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ProductCard from '../components/ProductCard.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  components: {
    Navbar,
    ProductCard,

  },
  mounted() {
    if (this.$store.getters.getAllProducts.length === 0) {
      this.$store.dispatch('fetchProducts');
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedProduct',
      'getAllProducts',
      'getSearchTerm',
      'getShowResults'
    ]),
    productToShow() {
      return this.$store.getters.getSelectedProduct;
    },
    allProducts() {
      return this.$store.getters.getAllProducts;
    }
  }
}
</script>
