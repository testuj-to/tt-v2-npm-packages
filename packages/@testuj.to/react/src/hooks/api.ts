
import {
    type FunctionComponent,
    useState,
    useEffect,
    useRef,
    useContext,
    createElement,
    createContext,
} from 'react'
import { Api } from '@testuj.to/api'

export const apiContext = createContext<Api>(null)

export const useApi = (): Api => {
    const api = useContext(apiContext)

    return api
}
