<template>
  <div>
    <Navbar />
    <ProductCard />

    <div class="p-4">
      <!-- Show selected product if any -->
      <div
        v-if="productToShow"
        class="border p-2 rounded mb-2"
      >
        {{ productToShow.title }}
      </div>

      <!-- Show all products if no selected product -->
      <div
        v-else
        v-for="product in allProducts"
        :key="product.id"
        class="border p-2 rounded mb-2"
      >
        {{ product.title }}
      </div>
    </div>
    
  </div>
</template>


<script>
import Navbar from '../components/Navbar.vue';
import ProductCard from '../components/ProductCard.vue';

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
    
    productToShow() {
      return this.$store.getters.getSelectedProduct;
    },
    allProducts() {
    return this.$store.getters.getAllProducts;
  }
  }
}
</script>
