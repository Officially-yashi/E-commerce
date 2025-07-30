import axios from 'axios';
const state = {
  token: localStorage.getItem('token') || '',
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
  cart: []
};
const mutations ={
  SET_CART(state, cart) {
  state.cart = cart;
},
ADD_TO_CART(state, product) {
  const userId = state.loggedInUser?._id || state.loggedInUser?.id;
  if (!userId) return;

  const id = String(product._id || product.id);
  const existing = state.cart.find(item => String(item._id || item.id) === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  saveCartToLocal(state); // ✅ call helper
}
,
    SET_TOKEN(state,token){
        state.token=token;
         localStorage.setItem('token', token);
       
    },
    SET_LOGGED_IN_USER(state,user){
        state.loggedInUser=user;
          localStorage.setItem('loggedInUser', JSON.stringify(user));
    },
    LOGOUT(state){
      state.token=null;
      state.loggedInUser=null;
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    },
     CLEAR_TOKEN(state) {
    state.token = '';
  },

INCREMENT_QUANTITY(state, productId) {
  const id = String(productId);
  const existing = state.cart.find(item => String(item._id || item.id) === id);
  if (existing) {
    existing.quantity += 1;
    saveCartToLocal(state); // ✅
  }
},

DECREASE_QUANTITY(state, productId) {
  const id = String(productId);
  const existing = state.cart.find(item => String(item._id || item.id) === id);
  if (existing && existing.quantity > 1) {
    existing.quantity -= 1;
    saveCartToLocal(state); // ✅
  }
},

REMOVE_FROM_CART(state, productId) {
  const id = String(productId);
  state.cart = state.cart.filter(item => String(item._id || item.id) !== id);
  saveCartToLocal(state); // ✅
}



};

const actions={
    async signup(_,userData){
      try{
         return axios.post('http://localhost:7000/api/signup',userData);
      }
      catch (err) {
    console.error("Signup error in Vuex:");
    throw err;
  }
   },
     
   
async login({ commit }, { email, password }) {
  try {
    console.log("Sending login request with:", email, password);

    const res = await axios.post('http://localhost:7000/api/login', { email, password });
    const token = res.data.token;

   if (!token) console.log("token not received");  
    commit('SET_TOKEN', token);

  
    const profileRes = await axios.get('http://localhost:7000/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
     
    const user = profileRes.data.user;
    if (!user) throw new Error("No user profile returned");


    commit('SET_LOGGED_IN_USER', profileRes.data.user);
    const savedCart = localStorage.getItem(`cart_${user._id}`);
   commit('SET_CART', savedCart ? JSON.parse(savedCart) : []);

    localStorage.setItem('token', token);
    localStorage.setItem('loggedInUser', JSON.stringify(profileRes.data.user));

    console.log("Login success", profileRes.data.user);

  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}
,

tryAutoLogin({ commit }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  console.log("Auto login triggered. Token:", token);
  console.log("User restored:", user);
  if (token && user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    commit('SET_TOKEN', token);
    commit('SET_LOGGED_IN_USER', user);

  
  const userId = user._id||user.id  ;
const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
 console.log("Cart restored:", cart); 
    commit('SET_CART', cart); 
  }
  else {
    console.log("Auto login skipped — token or user missing");
  }
}

,
      logout({commit}){
      commit('LOGOUT');
      },
      decreaseQuantity({ commit }, productId) {
  commit('DECREASE_QUANTITY', productId);
},

removeFromCart({ commit }, productId) {
  commit('REMOVE_FROM_CART', productId);
},

     addToCart({ commit, state }, product) {
  console.log("Inside auth/addToCart:", product);
  console.log("Current cart:", JSON.parse(JSON.stringify(state.cart)));

  const productId = String(product._id || product.id);
  const exists = state.cart.some(
    item => String(item._id || item.id) === productId
  );

  console.log("Already in cart?", exists);
  if (!exists) {
    commit('ADD_TO_CART', product);
  } else {
    commit('INCREMENT_QUANTITY', productId);
    console.log("Product already exists, increased quantity.");
  }
}

};
  const getters = {
  getLoggedInUser: state => state.loggedInUser,
  isAuthenticated: state => !!state.token,
  getCartCount: state =>  state.cart.length,
  getCartItems: (state) => state.cart,

   getCartTotalPrice: state => {
    return state.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
};


function saveCartToLocal(state) {
  const userId = state.loggedInUser?._id || state.loggedInUser?.id;
  if (userId) {
    const key = `cart_${userId}`;
    localStorage.setItem(key, JSON.stringify(state.cart));
  }
}
export default {
    namespaced:true,
    state,mutations,actions,getters
};  



