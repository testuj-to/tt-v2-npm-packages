
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
import { Helmet, HelmetProvider } from 'react-helmet-async'
import merge from 'lodash.merge'
import { Credentials, TenantTheme } from '@lib/types'
import { OAuth2, OAuth2Options } from '@lib/oauth2'
import { Api, ApiOptions } from '@testuj.to/api'

import { type Theme } from './hooks/theme'
import { cssifyTheme } from './utils/cssifyTheme'

const ttContext = createContext<{
    auth: OAuth2
    api: Api
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
    auth?: Omit<OAuth2Options, 'credentials'>
    api?: Omit<ApiOptions, 'credentials'>
    theme?: TenantTheme
    injectFontsCSS?: boolean
    children?: ReactNode
}

export const TTContextProvider = ({
    credentials, injectFontsCSS, children,
    auth: authOptions,
    api: apiOptions,
    theme: themeOptions,
}: TTContextProviderProps) => {
    const { current: auth } = useRef(new OAuth2({
        credentials,
        ...authOptions,
    }))

    const { current: api } = useRef(new Api({
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

    const [ globalCSS, setGlobalCSS ] = useState<string>()

    useEffect(() => {
        if (injectFontsCSS && theme && theme?.cssGlobal) {
            setGlobalCSS(theme.cssGlobal)
        }
    }, [ injectFontsCSS, theme?.cssGlobal ])

    const renderGlobalCSS = () => {
        if (globalCSS) {
            return createElement(Helmet, { key: 'globalcss' }, [
                createElement('style', {
                    key: 'style',
                    dangerouslySetInnerHTML: { __html: globalCSS },
                }),
            ])
        }

        return null
    }

    return createElement(HelmetProvider, {},
        createElement(
            'div',
            { style },
            createElement(
                ttContext.Provider,
                { value: { auth, api, theme } },
                children,
                renderGlobalCSS(),
            ),
        ),
    )
}
