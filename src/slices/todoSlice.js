import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils";


const initialState = getLocalStorage('todos') ? JSON.parse(getLocalStorage('todos')) : {todos: []};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const item = action.payload;
            state.todos = [...state.todos, item];
            setLocalStorage('todos', JSON.stringify(state));
        },
        removeTodo: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== id);
            setLocalStorage('todos', JSON.stringify(state));
        },
        toggleComplete: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            setLocalStorage('todos', JSON.stringify(state));
        },
    }
})

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;