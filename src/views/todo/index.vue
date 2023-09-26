<template>
	<div class="flex justify-center items-center h-screen">
	  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
		<h1 class="font-semibold text-lg text-center mb-4">Add Todo</h1>
		<div class="relative">
		  <select class="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 mb-4" v-model="selectedStatus">
			<option value="0">Incomplete</option>
			<option value="1">Completed</option>
		  </select>
		</div>
		<div class="relative overflow-x-auto mt-5">
		  <table class="w-full text-sm text-left text-gray-700 bg-white border rounded-lg shadow-md">
			<tbody>
			  <tr v-for="todo in todoStore.todos" :key="todo.id" class="border-b">
				<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
				  {{ todo.task }}
				</td>
				<td class="px-6 py-4 text-center">
				  <div v-if="todo.checked == 0" class="text-red-500">X</div>
				  <div v-else class="text-green-500">✓</div>
				</td>
				<td class="px-6 py-4 text-center">
				  <div class="flex justify-center space-x-2">
					<button class="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-3" @click="updateData(todo.id)">
					  <i class="ri-edit-box-line"></i>
					</button>
					<button class="bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-3" @click="deleteData(todo.id)">
					  <i class="ri-delete-bin-line"></i>
					</button>
				  </div>
				</td>
			  </tr>
			</tbody>
		  </table>
		</div>
		<button class="block bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 mx-auto mb-2" @click="addTask">
			Add Task
		  </button>
	  </div>
	</div>
  </template>
  
  <style scoped>
  .text-red-500 {
	color: #EF4444;
  }
  
  .text-green-500 {
	color: #10B981;
  }
  
  /* Styling untuk kotak dropdown */
  select {
	appearance: none;
	padding-right: 2rem;
	background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M6 9l6 6 6-6"></path></svg>');
	background-repeat: no-repeat;
	background-position: right 0.5rem center;
	background-size: 1.5rem;
  }
  </style>
  
  <script>
  import { useTodoStore } from "@/stores/todo.store.js";
  
  export default {
	data() {
	  return {
		todoStore: useTodoStore(),
		selectedStatus: "0",
	  };
	},
	mounted() {
	  this.todoStore.fetch();
	},
	methods: {
	  async deleteData(id) {
		this.$swal({
		  title: "Are you sure?",
		  text: "You won't be able to revert this!",
		  icon: "warning",
		  showCancelButton: true,
		  confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
		  if (result.isConfirmed) {
			await this.todoStore.delete(id);
			this.todoStore.fetch();
		  }
		});
	  },
	  async updateData(id) {
		await this.todoStore.update(id);
		this.todoStore.fetch();
	  },
	  addTask() {
		const newTask = {
		  task: "New Task",
		  checked: parseInt(this.selectedStatus),
		};
		this.todoStore.add(newTask);
		this.todoStore.fetch();
	  },
	},
  };
  </script>
  