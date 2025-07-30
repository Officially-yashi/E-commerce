<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login </h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="email" >Email:</label>
            <input v-model="email" name="email" type="email" placeholder="enter the email"  autocomplete="off" required  class="w-full px-4 py-2 border rounded" />
            </div>

            <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="password" autocomplete="new-password" required  >Password:</label>
              <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter the password"
            autocomplete="new-password"
            :readonly="passwordReadonly"
            @focus="passwordReadonly = false"
            required
            class="w-full px-4 py-2 border rounded"
          />
            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">Login</button>

            <p class="mt-4 text-center text-sm text-gray-600">Don't have an account?
            <router-link to="/signup" class="text-blue-600 hover:underline">Sign up</router-link>
           </p>
        </form>
    </div>
    </div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
            error:'',
            loading:false
        }
    },
    methods:{
        
        async handleLogin(){
            console.log("handlelogin");
            this.error='';
            this.loading=true;

            try{
                console.log("yes")
                await this.$store.dispatch('auth/login', {
                email: this.email,
               password: this.password,
            });

            console.log("Login success");
             this.$router.push('/home');
           
        
         console.log("navigated to home")

        }
        catch(err){
            this.error='login failed'
        }
        finally{
            this.loading=false;
        }
    }
    }
}
</script>