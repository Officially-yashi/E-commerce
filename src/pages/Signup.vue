
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="name" >Name:</label>
            <input v-model="name" type="text" id="name" required  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
         <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="email">Email:</label>
            <input v-model="email" type="text" id="email" required  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
         <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="password">Password:</label>
            <input v-model="password" type="password" id="password" required  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
         <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="contact">Contact:</label>
            <input v-model="contact" type="text" id="contact" required  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">SignUp</button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Log in</router-link>
      </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Signup',
    data(){
        return{
            name:'',
            email:'',
            password:'',
            contact:'',
            error: '',
            loading: false
        };
    },
    methods:{
        async handleSignup(){
          console.log("Dispatching signup"); 
      this.loading = true;
      this.error = '';
            try{
                const res= await this.$store.dispatch('auth/signup',{
                name:this.name,
                email:this.email,
                password:this.password,
                contact:this.contact,
            });
            console.log("Signup success, redirecting");
                  if (res.status === 201 || res.status === 200) {
                  console.log(" Signup successful. Redirecting to login...");
                  this.$router.push('/login');
                  } else {
                 console.log( "Signup failed. Please try again.");
                }
         
            }
            catch(err){
                this.error='singup failed';
            }
            finally{
                this.loading=false;
            }
          
           

        },
    },
};
</script>