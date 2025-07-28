<template>
  <div class="w-[800px] flex justify-center mt-2 relative">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search products..."
      autocomplete="new-password"
      :readonly="isReadonly"
      @focus="isReadonly = false"
      @input="handleInput"
      class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div
      v-if="showResults"
      class="absolute bg-white border mt-1 w-full shadow-lg z-10"
    >
      <div class="flex justify-end">
        <button
          @click="clearSuggestions"
          class="text-gray-500 hover:text-black p-2 text-sm"
        >
          ✖
        </button>
      </div>
      <div
  v-for="product in filteredProducts"
  :key="product.id"
  class="p-3 border-b hover:bg-gray-100 cursor-pointer"
  @click="selectProduct(product.title)"
>
  {{ product.title }}
</div>

      <div v-if="!filteredProducts.length" class="p-3 text-gray-500">
        No matching products.
      </div>
    </div>
    <div
  v-if="selectedProduct"
  class="mt-4 w-[800px] mx-auto border p-4 rounded shadow bg-gray-50"
>
  <h2 class="text-lg font-bold mb-2">{{ selectedProduct.title }}</h2>
  <p class="text-gray-700 mb-1">Price: ₹{{ selectedProduct.price }}</p>
  <p class="text-gray-600">Description: {{ selectedProduct.description }}</p>
</div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchTerm: "",
      isReadonly: true,
      showResults: false,
    };
  },
  computed: {
    ...mapGetters(["getAllProducts"]),
    filteredProducts() {
      const term = this.searchTerm.trim().toLowerCase();
      if (!term) return [];
      return this.getAllProducts.filter((product) =>
        product.title.toLowerCase().includes(term)
      );
    },
   
  },
  methods: {
    handleInput() {
      this.showResults = this.searchTerm.trim().length > 0;
    },
    clearSuggestions() {
      this.searchTerm = "";
      this.showResults = false;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  
  selectProduct(title) {
    this.searchTerm = title;
    this.showResults = false;
    this.$store.dispatch("selectProductByName", title);
  }
};
</script>
