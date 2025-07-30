import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import auth from './modules/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
modules:{
  auth
},
    state:{
        users:[],
        loggedInUser:null,
        products:[],
        cart:[],
         selectedProduct: null,
           filteredProducts: [],
            searchTerm: '',
          showResults: false,
        
    },
    mutations:{
        ADD_USER(state,user){
            state.users.push(user);
        },
        
        SET_LOGGED_IN_USER(state, user) {
        state.loggedInUser = user;
  localStorage.setItem('loggedInUser', JSON.stringify(user)); 
  const key = `cart_${user.email}`;
  const savedCart = JSON.parse(localStorage.getItem(key)) || [];
  state.cart = savedCart;
}
,
LOGOUT(state) {
  state.loggedInUser = null;
   localStorage.removeItem('loggedInUser'); 
}
,
     setProducts(state, products) {
        state.products = products;
         state.filteredProducts = products; 
     },
     
     setSelectedProduct(state, product) {
    state.selectedProduct = product;
  },
   clearSelectedProduct(state) {
    state.selectedProduct = null;
  },

ADD_TO_CART(state, product) {
  const exists = state.cart.some(item => item._id === product._id);
  if (!exists) {
    state.cart.push(product);
    localStorage.setItem("cart", JSON.stringify(state.cart)); // Optional persistence
  }
}
,

  INCREMENT_QUANTITY(state, productId) {
      const email = state.loggedInUser?.email;
     if (!email) return;
     const key = `cart_${email}`;

  const item = state.cart.find((item) => item.id === productId);
   if (item) {
    item.quantity++;
    localStorage.setItem(key, JSON.stringify(state.cart));
  }
  
},
DECREMENT_QUANTITY(state, productId) {
  const email = state.loggedInUser?.email;
if (!email) return;
const key = `cart_${email}`;

  const item = state.cart.find((item) => item.id === productId);
   if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem(key, JSON.stringify(state.cart));
  }
   
},
REMOVE_FROM_CART(state, productId) {
  const email = state.loggedInUser?.email;
if (!email) return;
const key = `cart_${email}`;

  state.cart = state.cart.filter((item) => item.id !== productId);
  localStorage.setItem(key, JSON.stringify(state.cart));
},
  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term;
     state.showResults = !!term;
  },
    CLEAR_CART(state) {
      const email = state.loggedInUser?.email;
      if (!email) return;
     state.cart = [];
     const key = `cart_${email}`;
    localStorage.removeItem(key);
   
  },
  SET_CART(state, cartItems) {
      state.cart = cartItems;
    },
    clearSearch(state) {
    state.searchTerm = '';
    state.showResults = false;
  }
  
    },

    actions:{
      signup({ commit, state }, user) {
     const existing = state.users.find(u => u.email === user.email);
      if (existing) {
    throw new Error ("Email already exists");
    }
  commit('ADD_USER', user);
}, 
  initializeAuth({ commit }) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      commit("SET_LOGGED_IN_USER", user);
    }
  },
    async fetchProducts({ commit }) {
    const res = await axios.get('https://dummyjson.com/products');
    commit('setProducts', res.data.products);
  },
  setSelectedProduct({ commit }, product) {
    commit("setSelectedProduct", product);
  },
  selectProductByName({ commit, state }, title) {
    const product = state.products.find(p => p.title.toLowerCase() === title.toLowerCase());
    commit("setSelectedProduct", product  || null);
  },

  addToCart({commit},product){
    commit("ADD_TO_CART",product);
  },
  incrementQuantity({ commit }, id) {
  commit('INCREMENT_QUANTITY', id);
},
decrementQuantity({ commit }, id) {
  commit('DECREMENT_QUANTITY', id);
},
removeFromCart({ commit }, id) {
  commit('REMOVE_FROM_CART', id);
},
 clearCart({ commit }) {
    commit('CLEAR_CART');
  },
  selectProduct(title) {
  this.$store.dispatch("selectProductByName", title);
  this.searchTerm = title;
  this.showResults = false;
}
 },
    getters:{
        getUsers(state){
            return state.users;
        },
        getLoggedInUser(state){
            return state.loggedInUser;
        },
        getAllProducts(state){
           return state.products||[];
        },
         getfilteredProducts(state){
           return state.filteredProducts;
        },
         getSelectedProduct(state){
           return state.selectedProduct;
        },
          getSearchTerm: state => state.searchTerm,
         getShowResults: state => state.showResults,
        
        getCartItems:(state)=>state.cart,
        getCartCount:(state)=>state.cart.length,
        getCartTotalPrice: (state) => {
  return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

    },
     plugins: [createPersistedState()]
});