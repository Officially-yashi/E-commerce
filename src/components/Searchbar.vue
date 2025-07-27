<template>
  <div>
    <div class="w-full flex justify-center">
      <input  v-model="internalSearch" 
        type="text"
        placeholder="Search products..."
        class="w-[800px] px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Filtered product list -->
    <div v-for="product in filteredProducts" :key="product.id" class="mb-2">
      {{ product.title }}
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: "Searchbar",
 data() {
  return {
   internalSearch: this.$store.getters.getSearchTerm
  };
 },
  
watch: {
  internalSearch: {
    handler: debounce(function (newValue) {
      this.$store.commit('SET_SEARCH_TERM', newValue);  // ✅ Commit to Vuex
    }, 300),

  }
}


};
</script>