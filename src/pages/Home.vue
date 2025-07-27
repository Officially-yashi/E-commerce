<template>
    <div>
        <Navbar />
        <ProductCard />
         <div class="p-4">
    <div
      v-for="product in filteredProducts"
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
  components:{
    Navbar,
    ProductCard
  }
  ,
  mounted() {
    if (this.$store.getters.getAllProducts.length === 0) {
      this.$store.dispatch('fetchProducts');
    }
  }
}
</script>