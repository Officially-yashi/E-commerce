<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login </h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="email" >Email:</label>
            <input v-model="email" type="email" placeholder="enter the email" required class="w-full px-4 py-2 border rounded" />
            </div>

            <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="password" >Password:</label>
            <input v-model="password" type="password" placeholder="enter the password" required class="w-full px-4 py-2 border rounded"/>
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
            error:''
        }
    },
    methods:{
        handleLogin(){
            const users=this.$store.getters.getUsers;
           
            console.log("users in store:",users);

            const user=users.find(u=>u.email===this.email && u.password===this.password);

            if(user){
                this.$store.commit('SET_LOGGED_IN_USER',user);
                console.log('Logged in:',user);
                this.$router.push('/home');
            }
            else{
              alert("Invalid email or password ");
            }
        }
    }
}
</script>