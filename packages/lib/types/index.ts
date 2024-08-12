export { productCategories } from "./enums";

export interface RichText {
    json: string;
}

export interface CDNFile {
    id?: string;
    objectKey?: string;
    src: string;
    isBeingProcessed?: boolean;
    videoDetails?: VideoFileDetails;
}

export interface VideoFileDetails {
    durationMs?: number;
    widthPx?: number;
    heightPx?: number;
    orientation?: "landscape" | "portrait";
}

export interface TenantTheme {
    logo: TenantThemeLogo;
    colorScheme?: TenantThemeColorScheme;
    fontFamily?: TenantThemeFontFamily;
    borderRadius?: string;
}

export interface TenantThemeLogo {
    fileId?: string;

    // Aggregation
    file?: CDNFile;
}

export interface TenantThemeColorScheme {
    primary: string;
    secondary: string;
    text: string;
    link: string;
    button: string;
    buttonBg: string;
    error: string;
    categoriesBg: string;
    buttonSecBg: string;
    buttonSecText: string;
    buttonSecBorder: string;
    buttonSecBorderHov: string;
    border: string;
}

export interface TenantThemeFontFamily {
    text: string;
    heading: string;
    imports: {
        name: string;
        statement: string;
    }[];
    fontFaces: {
        family: string;
        style: string;
        weight: string;
        src: string;
    }[];
}

export interface Tag {
    key: string;
    color: string;
}
