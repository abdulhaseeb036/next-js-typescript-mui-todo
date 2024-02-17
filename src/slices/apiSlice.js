


// fetchBaseQuery is for when we malke api call to backend
'use client'
import { createApi, fetchBaseQuery} from  '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../constant.js';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Todos'],
    endpoints: (builder) => ({})
})
