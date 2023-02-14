
import {
    type FunctionComponent,
    useState,
    useEffect,
    useRef,
    useContext,
    createElement,
    createContext,
} from 'react'

import {
    AuthApi,
} from '../../../auth/src'

export interface Auth extends AuthApi {}

export const authContext = createContext<AuthApi>(null)

export const useAuth = (): Auth => {
    const auth = useContext(authContext)

    return auth
}
