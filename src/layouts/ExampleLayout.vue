<template>
	<div class="w-screen h-[75px] bg-gray-800 flex justify-center items-center text-white">
	  <router-link to="/" class="link">Home</router-link>
	  <router-link to="/user" class="link">User</router-link>
	  <router-link to="/todo" class="link">Todo</router-link>
	  <div class="link cursor-pointer" @click="authStore.logout()">Logout</div>
	</div>
	<div class="p-5">
	  <slot />
	</div>
  </template>
  

<script>
  import {
    useAuthStore
  } from "@/stores/auth.store.js"

export default {
  name: 'ExampleLayout',
  data(){
    return {
      authStore: useAuthStore()
    }
  }
};
</script>

<style>
  .link{
    @apply px-2 cursor-pointer hover:text-red-400;
  }
</style>
