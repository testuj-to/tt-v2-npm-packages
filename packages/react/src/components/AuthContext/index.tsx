
import { ReactNode, useRef } from 'react'

import {
    AuthApi,
    AuthApiOptions,
} from '../../../../auth/src'
import { authContext } from '../../hooks/auth'

export interface AuthContextProps extends AuthApiOptions {
    children?: ReactNode
}

export const AuthContext = ({ children, ...options }: AuthContextProps) => {
    const authApiRef = useRef(new AuthApi(options))

    return (
        <authContext.Provider value={authApiRef.current}>
            {children}
        </authContext.Provider>
    )
}
