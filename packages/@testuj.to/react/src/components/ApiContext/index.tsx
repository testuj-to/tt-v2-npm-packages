
import { ReactNode, useRef } from 'react'
import { Api, ApiOptions } from '@testuj.to/api'

import { apiContext } from '../../hooks/api'

export interface ApiContextProps extends ApiOptions {
    children?: ReactNode
}

export const ApiContext = ({ children, ...options }: ApiContextProps) => {
    const apiRef = useRef(new Api(options))

    return (
        <apiContext.Provider value={apiRef.current}>
            {children}
        </apiContext.Provider>
    )
}
