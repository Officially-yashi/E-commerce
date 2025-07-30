<template>
<div>
  <div class="w-[800px] flex justify-center mt-2 relative">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search products..."
      autocomplete="new-password"
      :readonly="isReadonly"
      @focus="isReadonly = false"
      @input="debouncedInput"
      class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div
      v-if="showResults"
      class="absolute mt-1 w-full shadow-lg z-10"
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
  @click="selectProduct(product)"
>
  {{ product.title }}
</div>

      <div v-if="!filteredProducts.length" class="p-3 text-gray-500">
        No matching products.
      </div>
    </div>
  </div>


<div
  v-if="selectedProduct"
  class=" fixed inset-0 flex items-centerjustify-center items-center min-h-screen z-50"
  
>

  <div class="w-[800px] border p-6 rounded-xl shadow-lg bg-white  relative">
   
   
  <button
  @click="selectedProduct = null"
  class="absolute top-2 right-2 bg-red-500 text-white text-2xl px-3 py-1 rounded z-50"
>
  ✖
</button>

    <h2 class="text-xl font-bold mb-4 text-center">{{ selectedProduct.title }}</h2>

    <div class="flex justify-center mb-4">
      <img
        :src="selectedProduct.thumbnail "
        alt="Product Image"
        class="w-40 h-40 object-contain rounded shadow"
      />
    </div>

    <p class="text-gray-700 text-lg text-center mb-2">Price: ₹{{ selectedProduct.price }}</p>
    <p class="text-gray-600 text-center">{{ selectedProduct.description }}</p>


</div>
</div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      searchTerm: "",
      isReadonly: true,
      showResults: false,
      selectedProduct: null,
    };
  },
  computed: {
    ...mapGetters(["getAllProducts",'getSearchTerm','getShowResults','getSelectedProduct']),
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
      this.selectedProduct = null;
    },
    submitSearch() {
    console.log("Searched:", this.searchTerm);
    
    this.searchTerm = "";
    },
    selectProduct(product) {
       console.log("Selected product:", product);
      console.log("Image URL:", product.image);
      this.searchTerm = product.title;
      this.selectedProduct = product;
      this.showResults = false;
    },
 productToShow() {
    return this.getSelectedProduct;
  },
   
    debouncedInput: debounce(function () {
      this.handleInput();
    }, 800),
  },
  created() {
    this.$store.dispatch("fetchProducts").then(() => {
    console.log("Products from store:", this.getAllProducts);
     console.log("One product example:", this.getAllProducts[0]);
  });
  },
};
</script>
