import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../../feautures/users/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4500/usuarios/me',
    credentials: 'include',
    jsonContentType: "application/json",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.accessToken
        if (token) {
            return headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await ('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshResult.data, user}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
        console.log('base query with re auth')
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})