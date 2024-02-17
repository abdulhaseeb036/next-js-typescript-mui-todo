
'use client'
import { getLocalStorage } from "@/utils";
import { BASE_URL } from "../constant";
import { apiSlice} from "./apiSlice";

const token = localStorage.getItem('token');

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLogin: builder.query({
            query: () => ({
                url: `${BASE_URL}/auth/login`
            }),
            keepUnusedDataFor: 5
        }),
        postLogin: builder.mutation({
            query: ({ username, password }) => ({
                url: `${BASE_URL}/auth/login`,
                method: 'POST',
                body: { username, password }
            }),
        }),
        getCurrentUser: builder.query({
            query: (token) => ({
                url: `${BASE_URL}/auth/me`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        postTodo: builder.mutation({
            query: ({ todo, complete, userId }) => ({
                url: `${BASE_URL}/todos/add`,
                method: 'POST',
                body: { todo, complete, userId },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
                },
            }),
        }),
        getTodo: builder.query({
            query: (userId) => ({
                url: `${BASE_URL}/todos/user/${userId}`,
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
                // },
            }),
            keepUnusedDataFor: 5,
        }),
        getDeleteTodo: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/todos/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
                },
            }),
        }),

    }),

});

export const { useGetLoginQuery, usePostLoginMutation, useGetCurrentUserQuery, usePostTodoMutation, useGetTodoQuery, useGetDeleteTodoMutation } = userApiSlice