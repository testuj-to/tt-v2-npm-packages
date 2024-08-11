export { productCategories } from "./enums";

export interface PaginationOptions {
    defaultOffset?: number;
    defaultLimit?: number;
}

export interface PaginationBase {
    offset: number;
    limit: number;
}

export interface Pagination extends PaginationBase {
    page: number;
    searchParams: Record<string, string | number | boolean>;
    setOffset(offset: number);
    setLimit(limit: number);
    setPage(page: number);
    previousPage();
    nextPage();
}

export interface RichText {
    json: string;
}

export interface CDNFile {
    id: string;
    blob?: string;
    key?: string;
    objectKey?: string;
    src: string;
}

export interface ProductCategory {
    id?: string;
    parentId?: string;
    name?: string;
}

export interface Product {
    categoryId?: string;
    manufacturer?: string;
    model?: string;
    imageId?: string;

    // Aggregation
    category?: {
        key?: string;
    };
    thumbnailImage?: CDNFile;

    // V2
    id?: string;
    name?: string;
    slug?: string;
    general?: {
        productCategory?: string;
        description?: RichText;
        brand?: string;
    };
    ratings?: {
        ratingCategory?: string;
        ratingType: ProductRatingType;
    };
    attributes?: {
        id: string;
        name: string;
    }[];
    codes?: {
        ean?: string;
    }[];
    info?: {
        manufacturer?: {
            id?: string;
            name?: string;
            logo?: CDNFile;
        };
        model?: string;
    };
    detailPageLinks?: {
        label?: string;
        src?: string;
    }[];
    description?: RichText;

    reviewFocusInstructions?: RichText;

    userManualLink?: string;
}

export enum ProductRatingType {
    main = "main",
    category = "category",
    client = "client",
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
