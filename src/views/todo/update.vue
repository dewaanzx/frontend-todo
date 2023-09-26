<template>
	<div class="flex justify-between items-center">
	  <h1 class="font-semibold text-lg">Update Todo Page</h1>
  
	</div>
  
	<form action="" @submit.prevent="update">
	  <div class="mb-6">
		  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name <span class="text-red-600">*</span></label>
		  <input v-model="formData.name" type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required>
	  </div>
	  <div class="mb-6">
		  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address <span class="text-red-600">*</span></label>
		  <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required>
	  </div>
	  <div class="mb-6">
		  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
		  <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••">
	  </div>
	  <ButtonPrimary :type="'submit'">
		Submit
	  </ButtonPrimary>
	  <ButtonDanger @click="$router.push('/todo')" class="ml-3">
		Cancel
	  </ButtonDanger>
	</form>
  </template>
  
  <script>
	// import {
	//   usetodoStore
	// } from "@/stores/todo.store.js"
  
	export default {
	  data() {
		return {
		  todoStore: usetodoStore(),
		  formData: {
			name: null,
			email: null,
			password: null,
		  }
		}
	  },
	  mounted(){
		if(!this.todoStore.todo){
		  this.$router.push('/todo')
		}
  
		this.formData = {
		  name: this.todoStore.todo.name,
		  email: this.todoStore.todo.email,
		}
	  },
	  methods: {
		async update(){
		  let todo = await this.todoStore.update(this.todoStore.todo.id, this.formData)
  
		  if(todo){
			this.$router.push('/todo')
		  }
		}
	  }
	}
  
  </script>
  