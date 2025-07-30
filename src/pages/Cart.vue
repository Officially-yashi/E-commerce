<template>

  <div class="p-6">
    <Navbar />
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>
         <div v-if="cartItems.length === 0" class="text-center text-gray-600">
      Your cart is empty.
    </div>
    <table class="min-w-full bg-white rounded shadow overflow-hidden">
      <thead>
        <tr class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <th class="py-3 px-4">Image</th>
          <th class="py-3 px-4">Name</th>
          <th class="py-3 px-4">Price</th>
          <th class="py-3 px-4">Quantity</th>
          <th class="py-3 px-4">Total</th>
          <th class="p-2  px-4">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in cartItems"
          :key="item.id"
          class="border-t text-gray-700 hover:bg-gray-50"
        >
          <td class="py-3 px-4">
            <img :src="item.images[0]" class="h-16 w-16 object-contain rounded" />
          </td>
          <td class="py-3 px-4">{{ item.title }}</td>
          <td class="py-3 px-4">${{ item.price }}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <button
                @click="decreaseQty(item.id)"
                class="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                :disabled="item.quantity <= 1"
                >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                @click="increaseQty(item.id)"
                class="bg-green-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </td>
          <td class="py-3 px-4 font-semibold">
            ${{ item.price * item.quantity }}
          </td>
           <td class="p-2">
            <button @click="remove(item.id)" class="text-red-600 text-lg">✖</button>
          </td>
        </tr>
      </tbody>  
    </table>

    <div class="text-right mt-6 text-xl font-bold">
      Total: ${{ totalAmount }}
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    name:'Cart',
    components:{
      Navbar
    },
  computed: {
    cartItems() {
      return this.$store.getters['auth/getCartItems'];
    },
    totalAmount() {
  return this.$store.getters['auth/getCartTotalPrice'];
}

  },
  methods: {
    increaseQty(id) {
      this.$store.commit("auth/INCREMENT_QUANTITY", id);
    },
    decreaseQty(id) {
      this.$store.commit("auth/DECREMENT_QUANTITY", id);
    },
     remove(id) {
      this.$store.dispatch("auth/removeFromCart", id);
    },  
    logout() {
  localStorage.removeItem('token');          // remove login token
  this.$store.dispatch('auth/clearCart');         // clear Vuex state
  localStorage.removeItem('vuex');           // ✅ remove persisted Vuex (like cart!)
  this.$store.commit('auth/LOGOUT');              // also clear loggedInUser from Vuex
  this.$router.push('/login');               // go to login page
}

  },
 
};
</script>
