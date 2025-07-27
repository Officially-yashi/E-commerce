<template>
<div class="w-[800] flex justify-center mt-2">
  <input
    v-model="searchTerm"
    type="text"
    placeholder="Search products..."
      autocomplete="new-password"
        :readonly="isReadonly"
  @focus="isReadonly = false"
       name="disable-autocomplete"
    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    @click="performSearch"
    class="ml-2 px-6  py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
  >
    Search
  </button>

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
      class="p-3 border-b hover:bg-gray-100"
    >
      {{ product.title }}
    </div>
    <div v-if="!filteredProducts.length" class="p-3 text-gray-500">
      No matching products.
    </div>
  </div>
</div>

  
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
        isReadonly: true,
      showResults: false,
      products: [
        { id: 1, title: " Lipstick" },
        { id: 2, title: "food oil" },
        { id: 3, title: "dog food" },
        { id: 4, title: "eyeliner" },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (!this.showResults) return [];
      const term = this.searchTerm.trim().toLowerCase();
      if (!term) return this.products;
      return this.products.filter(product =>
        product.title.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    performSearch() {
      this.showResults = true;
    },
     clearSuggestions() {
      this.showResults = false;
      this.searchTerm = "";
    },
  },
};
</script>
