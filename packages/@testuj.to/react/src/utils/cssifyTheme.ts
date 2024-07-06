import { TenantTheme } from "@lib/types";

export interface ThemeCSS {
    readonly cssVariables: {
        variables: {
            name: string;
            value: string;
        }[];
        toString(): string;
    };
    readonly cssFontImports: {
        imports: string[];
        toString(): string;
    };
    readonly cssFontFaces: {
        fontFaces: {
            family: string;
            src: string;
            style?: string;
            weight?: string;
        }[];
        toString(): string;
    };
    readonly cssGlobal: string;
};

export const cssifyTheme = (theme: TenantTheme): ThemeCSS => {
    const themeCSS: ThemeCSS = {
        ...theme,
        get cssVariables() {
            const variables = [];

            const addVariable = (name: string, value: string) => {
                if (value) {
                    variables.push({ name, value });
                }
            };

            addVariable("--color-primary", theme?.colorScheme?.primary);
            addVariable("--color-secondary", theme?.colorScheme?.secondary);
            addVariable("--color-text", theme?.colorScheme?.text);
            addVariable("--color-link", theme?.colorScheme?.link);
            addVariable("--color-button", theme?.colorScheme?.button);
            addVariable("--color-button-bg", theme?.colorScheme?.buttonBg);
            addVariable("--color-button-secondary-bg", theme?.colorScheme?.buttonSecBg);
            addVariable("--color-button-secondary-text", theme?.colorScheme?.buttonSecText);
            addVariable("--color-button-secondary-border", theme?.colorScheme?.buttonSecBorder);
            addVariable("--color-button-secondary-border-hover", theme?.colorScheme?.buttonSecBorderHov);
            addVariable("--color-border", theme?.colorScheme?.border);
            addVariable("--color-error", theme?.colorScheme?.error);
            addVariable("--color-categories-bg", theme?.colorScheme?.categoriesBg);
            addVariable("--font-text", theme?.fontFamily?.text);
            addVariable("--font-heading", theme?.fontFamily?.heading);
            addVariable("--border-radius", theme?.borderRadius);

            return {
                variables,
                toString() {
                    return `\n${variables.map(({ name, value }) => `  ${name}: ${value};`).join("\n")}\n`;
                },
            };
        },
        get cssFontImports() {
            const imports = (theme?.fontFamily?.imports || []).map((_import) => {
                return _import?.statement;
            });

            return {
                imports,
                toString() {
                    return imports.map((_import) => `  ${_import}\n`).join("");
                },
            };
        },
        get cssFontFaces() {
            const fontFaces = (theme?.fontFamily?.fontFaces || []).map((fontFace) => {
                return {
                    ...fontFace,
                    toString() {
                        const properties = [
                            `    font-family: ${fontFace.family};`,
                            `    src: ${fontFace.src};`,
                        ];

                        if (fontFace.style) {
                            properties.push(`    font-style: ${fontFace.style};`);
                        }

                        if (fontFace.weight) {
                            properties.push(`    font-weight: ${fontFace.weight};`);
                        }

                        return `  @font-face{\n${properties.join("\n")}\n  }\n`;
                    },
                };
            });

            return {
                fontFaces,
                toString() {
                    return fontFaces.map((fontFace) => fontFace.toString()).join("\n");
                },
            };
        },
        get cssGlobal() {
            return `
${themeCSS?.cssFontImports?.toString?.()}
${themeCSS?.cssFontFaces?.toString?.()}

html,
body {
    padding: 0;
    margin: 0;
    font-family: var(--font-text);
}

* {
    box-sizing: border-box;
    color: var(--color-text);
}

a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-link);
}

h1,
h2 {
    font-family: var(--font-heading);
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: normal;
}

/* @media (prefers-color-scheme: dark) {
    html {
        color-scheme: dark;
    }

    body {
        color: white;
        background: black;
    }
} */
`;
        },
    };

    return themeCSS;
};
