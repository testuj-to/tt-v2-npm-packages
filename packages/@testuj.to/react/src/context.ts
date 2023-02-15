
import {
    type ReactNode,
    useRef,
    useContext,
    createElement,
    createContext,
} from 'react'
import { Credentials } from '@lib/types'
import { AuthApi, AuthApiOptions } from '@testuj.to/auth'
import { Api, ApiOptions } from '@testuj.to/api'

const ttContext = createContext<{
    auth: AuthApi
    api: Api
}>({
    auth: null,
    api: null,
})

export const useTTContext = () =>
    useContext(ttContext)

export interface TTContextProviderProps {
    credentials?: Credentials
    auth?: Omit<AuthApiOptions, 'credentials'>
    api?: Omit<ApiOptions, 'credentials'>
    children?: ReactNode
}

export const TTContextProvider = ({ credentials, auth: authOptions, api: apiOptions, children }: TTContextProviderProps) => {
    const { current: auth } = useRef(new AuthApi({
        credentials,
        ...authOptions,
    }))

    const { current: api } = useRef(new Api({
        credentials,
        ...apiOptions,
    }))

    return createElement(
        ttContext.Provider,
        { value: { auth, api } },
        children,
    )
}
