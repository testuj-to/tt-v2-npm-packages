import {
    type ReactNode,
    useRef,
    useContext,
    createElement,
    createContext,
    useMemo,
    useState,
    useCallback,
} from "react";
import { Helmet } from "react-helmet";
import merge from "lodash.merge";
import {
    type TenantTheme,
} from "@lib/types";

import {
    type Locale,
    locales,
} from "./locales";
import { type Theme } from "./hooks/theme";
import { cssifyTheme } from "./utils/cssifyTheme";
import { ToastProvider } from "./components/Toast";

const ttContext = createContext<{
    theme: Theme
    locale: Locale
    setLocale(locale: Locale)
    t(key: string): string
}>({
    theme: null,
    locale: null,
    setLocale() {},
    t(): string {
        return null
    },
});

export const useTTContext = () =>
    useContext(ttContext);

export interface TTContextProviderProps {
    theme?: TenantTheme;
    injectRootVariablesCSS?: boolean;
    injectFontsCSS?: boolean;
    locale?: Locale;
    fallbackLocale?: Locale;
    children?: ReactNode;
    onLocaleChange?(locale: Locale);
    t?(key: string): string;
}

export const TTContextProvider = ({
    injectRootVariablesCSS,
    injectFontsCSS,
    fallbackLocale,
    children,
    theme: themeOptions,
    locale: currentLocale,
    onLocaleChange,
    t,
}: TTContextProviderProps) => {
    const [locale, setLocale] = useState<Locale>(currentLocale || fallbackLocale || "en");

    const handleLocaleChange = useCallback((locale: Locale) => {
        if (typeof onLocaleChange === "function") {
            onLocaleChange(locale);
            return;
        }

        setLocale(locale);
    }, [onLocaleChange]);

    // yes, lack of useCallback is intentional
    const translate = (key: string) => {
        if (typeof t === "function") {
            return t(key);
        }

        const namespace = locales[locale] || locales[fallbackLocale] || locales.en;
        return namespace[key] ? namespace[key] : key;
    };

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
        }, themeOptions);

        return {
            ...preNullifiedTheme,
            ...cssifyTheme(preNullifiedTheme),
        };
    }, [themeOptions]);

    const style = {};
    for (const variable of (theme?.cssVariables?.variables || [])) {
        style[variable.name] = variable.value;
    }

    const renderGlobalCSS = () => {
        if (injectRootVariablesCSS || injectFontsCSS) {
            return createElement(Helmet, { key: "head" }, [
                (injectRootVariablesCSS && theme?.cssVariables?.variables?.length > 0) &&
                    createElement("style", { key: "variables" }, `\n:root {\n${theme.cssVariables.toString()}\n}\n`),
                (injectFontsCSS && theme?.cssGlobal) &&
                    createElement("style", { key: "globals" }, theme.cssGlobal),
            ]);
        };

        return null
    };

    const value = {
        theme,
        locale,
        t: translate,
        setLocale: handleLocaleChange,
    };

    return createElement(
        "div",
        { style },
        createElement(
            ttContext.Provider,
            { value },
            renderGlobalCSS(),
            createElement(ToastProvider, {}, children),
        ),
    );
};
