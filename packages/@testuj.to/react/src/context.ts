
import {
    type ReactNode,
    useRef,
    useContext,
    createElement,
    createContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Helmet } from 'react-helmet'
import merge from 'lodash.merge'
import { TenantTheme } from '@lib/types'
import {
    Credentials,
    OAuth2ClientOptions,
    OAuth2Client,
} from '@lib/oauth2'
import {
    ApiClientOptions,
    ApiClient,
} from '@testuj.to/api'

import { type Theme } from './hooks/theme'
import { cssifyTheme } from './utils/cssifyTheme'
import { ToastProvider } from './components/Toast'

const ttContext = createContext<{
    auth: OAuth2Client
    api: ApiClient
    theme: Theme
}>({
    auth: null,
    api: null,
    theme: null,
})

export const useTTContext = () =>
    useContext(ttContext)

export interface TTContextProviderProps {
    credentials?: Credentials
    auth?: Omit<OAuth2ClientOptions, 'credentials'>
    api?: Omit<ApiClientOptions, 'credentials'>
    theme?: TenantTheme
    injectRootVariablesCSS?: boolean
    injectFontsCSS?: boolean
    children?: ReactNode
}

export const TTContextProvider = ({
    credentials, injectRootVariablesCSS, injectFontsCSS, children,
    auth: authOptions,
    api: apiOptions,
    theme: themeOptions,
}: TTContextProviderProps) => {
    const { current: auth } = useRef(new OAuth2Client({
        credentials,
        ...authOptions,
    }))

    const { current: api } = useRef(new ApiClient({
        credentials,
        ...apiOptions,
    }))

    const theme = useMemo<Theme>(() => {
        const preNullifiedTheme = merge({
            logo: {
                fileId: null,
                file: null,
            },
            colorScheme: {
                primary: null,
                secondary: null,
                text: null,
                link: null,
                button: null,
                buttonBg: null,
                error: null,
                categoriesBg: null,
            },
            fontFamily: {
                text: null,
                heading: null,
                src: [],
            },
        }, themeOptions)

        return {
            ...preNullifiedTheme,
            ...cssifyTheme(preNullifiedTheme),
        }
    }, [ themeOptions ])

    const style = {}
    for (const variable of (theme?.cssVariables?.variables || [])) {
        style[variable.name] = variable.value
    }

    const renderGlobalCSS = () => {
        if (injectRootVariablesCSS || injectFontsCSS) {
            return createElement(Helmet, { key: 'head' }, [
                (injectRootVariablesCSS && theme?.cssVariables?.variables?.length > 0) &&
                    createElement('style', { key: 'variables' }, `\n:root {\n${theme.cssVariables.toString()}\n}\n`),
                (injectFontsCSS && theme?.cssGlobal) &&
                    createElement('style', { key: 'globals' }, theme.cssGlobal),
            ])
        }

        return null
    }

    return createElement(
        'div',
        { style },
        createElement(
            ttContext.Provider,
            { value: { auth, api, theme } },
            renderGlobalCSS(),
            createElement(ToastProvider, {}, children),
        ),
    )
}
