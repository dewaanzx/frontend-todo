import { defineStore } from 'pinia';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => ({
        todos: [],
        todo: null,
    }),
    actions: {
        async fetch() {
            let url = `${baseUrl}/todo`

            const todos = await axiosWrapper.get(url);

            if (todos) {
                this.todos = todos.data
            }
        },
        async add(data) {
          const todo = await axiosWrapper.post(`${baseUrl}/todo`, data, true);

          this.todo = todo.data

          return todo
        },
        async update(id, data) {
          return await axiosWrapper.put(`${baseUrl}/todo/${id}`, data, true);
        },
        async delete(id) {
          return await axiosWrapper.delete(`${baseUrl}/todo/${id}`, {}, true);
        },
    },
});
