<template>
    <nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
        <button type="button" aria-controls="mobile-menu" aria-expanded="false" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
         
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="block size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
         
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="hidden size-6">
            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex shrink-0 items-center">
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="h-8 w-auto" />
        </div>

       <div class="hidden sm:block w-full">
  <div class="flex items-center justify-between px-4 py-2">

  
<router-link to="/cart" class="relative inline-flex items-center gap-2 text-white hover:text-gray-300 transition">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h14l1-5H6.4M7 13L5.6 6H21m-1 11a2 2 0 100 4 2 2 0 000-4zm-10 0a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
  <span>Cart</span>
  <span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
    {{ cartCount }}
  </span>
</router-link>



   <Searchbar />

 
    <div>
      <a href="#" @click="logout" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
        Logout
      </a>
    </div>

  </div>
</div>

      </div>
      </div>
    </div>


 
</nav>

</template>



<script>
import Searchbar from './Searchbar.vue'
export default {
  components: { Searchbar },
    name:'Navbar',
  methods:{
    logout(){
     this.$store.dispatch('auth/logout');
      this.$router.push('/login').catch(()=>{}); 
    }
  },
  computed:{
    cartCount(){
      return this.$store.getters['auth/getCartCount'];
  }
    }
  
}
</script>

<style>

</style>