
import { TenantTheme } from '@lib/types'

export interface ThemeCSS {
    readonly cssVariables: {
        variables: {
            name: string
            value: string
        }[]
        toString(): string
    }
    readonly cssFontFaces: {
        fontFaces: {
            family: string
            src: string
            style?: string
            weight?: string
        }[]
        toString(): string
    }
}

export const cssifyTheme = (theme: TenantTheme): ThemeCSS => {
    return {
        ...theme,
        get cssVariables() {
            const variables = []

            const addVariable = (name: string, value: string) => {
                if (value) {
                    variables.push({ name, value })
                }
            }

            addVariable('--color-primary',       theme?.colorScheme?.primary)
            addVariable('--color-secondary',     theme?.colorScheme?.secondary)
            addVariable('--color-text',          theme?.colorScheme?.text)
            addVariable('--color-link',          theme?.colorScheme?.link)
            addVariable('--color-button',        theme?.colorScheme?.button)
            addVariable('--color-button-bg',     theme?.colorScheme?.buttonBg)
            addVariable('--color-error',         theme?.colorScheme?.error)
            addVariable('--color-categories-bg', theme?.colorScheme?.categoriesBg)
            addVariable('--font-text',           theme?.fontFamily?.text)
            addVariable('--font-heading',        theme?.fontFamily?.heading)

            return {
                variables,
                toString() {
                    return `\n${variables.map(({ name, value }) => `  ${name}: ${value};`).join('\n')}\n`
                },
            }
        },
        get cssFontFaces() {
            const fontFaces = (theme?.fontFamily?.fontFaces || []).map(fontFace => {
                return {
                    ...fontFace,
                    toString() {
                        const properties = [
                            `    font-family: ${fontFace.family};`,
                            `    src: ${fontFace.src};`,
                        ]

                        if (fontFace.style) {
                            properties.push(`    font-style: ${fontFace.style};`)
                        }

                        if (fontFace.weight) {
                            properties.push(`    font-weight: ${fontFace.weight};`)
                        }

                        return `  @font-face{\n${properties.join('\n')}\n  }\n`
                    },
                }
            })

            return {
                fontFaces,
                toString() {
                    return fontFaces.map(fontFace => fontFace.toString()).join('\n')
                },
            }
        },
    }
}
