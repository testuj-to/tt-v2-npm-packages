export { productCategories } from "./enums";

export interface Edges<Edge> {
    edges?: Edge[];
    edgesTotal?: number;
}

export interface PaginationOptions {
    defaultOffset?: number;
    defaultLimit?: number;
}

export interface BarePagination {
    offset: number;
    limit: number;
}

export interface Pagination extends BarePagination {
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

export interface File {
    id: string;
    blob?: string;
    key?: string;
    objectKey?: string;
    src: string;
}

export interface Address {
    country: string;
    city: string;
    postalCode: string;
    line1: string;
    line2: string;
}

export interface User {
    id: string;
    // role?: string
    firstName: string;
    lastName: string;
    username: string;
    gender: Gender;
    birthDate: Date;
    address: Address;

    associatedTenants: AssociatedTenant[];

    // email: string
    // image?: string
}

export interface AssociatedTenant {
    tenantId: string;
    associatedAt: Date;
    acceptedAgreements: {
        agreementId: string;
        revisionIndex: 1;
        acceptedBy: string;
        acceptedAt: Date;
    }[];
    role?: string;
    tenant: {
        id: string;
        name: string;
        domains: {
            isDefault: boolean;
            scheme: string;
            name: string;
        }[];
    };
}

export interface Questionnaire {
    id?: string;
    type: QuestionnaireType;
    name: string;
    questions: QuestionnaireQuestion[];
}

export interface QuestionnaireQuestion {
    key: string;
    content: string;
    placeholder?: string;
    isRequired: boolean;
    type: QuestionnaireQuestionType;
    options: QuestionnaireQuestionOption[];
}

export interface QuestionnaireQuestionOption {
    key: string;
    value: string;
}

export interface QuestionnaireResponse {
    questionnaireId?: string;
    answers: QuestionnaireResponseAnswer[];
}

export interface QuestionnaireResponseAnswer {
    key: string;
    value: any;
    optionKeys: string[];
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
    thumbnailImage?: File;

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
            logo?: File;
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

export interface Tenant {
    id?: string;
    isDefault?: boolean;
    name: string;
    domains?: TenantDomain[];
    theme?: TenantTheme;

    // V2
    domainName?: string;
    locale?: string;
    logo?: File;
}

export interface TenantDomain {
    isDefault: boolean;
    scheme: string;
    name: string;
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
    file?: File;
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

export interface Campaign {
    id?: string;
    tenantIds?: string[];
    productIds?: string[];
    status?: CampaignStatus;
    slug?: string;
    name?: string;
    openAt?: Date;
    hasAutoOpen?: boolean;
    applications?: {
        slotsCount?: number;
        registrationPeriodDays?: number;
        submissionPeriodDays?: number;
        hasAutoProlongRegistration?: boolean;
    };
    privacyConsentText?: string;
    marketingConsentText?: string;
    web?: {
        slug?: string;
        title?: string;
        description?: RichText;
        criteria?: RichText;
    };
    thumbnailImage?: File;
    images?: CampaignImage[];
    questionnaireId?: string;
    settings?: CampaignSettings;
    tags?: {
        key: string;
        value: string;
    }[];

    // Aggregation
    tenants?: Tenant[];
    products?: Product[];
    questionnaire?: Questionnaire;

    // V2
    state: CampaignState;
    isHidden?: boolean;

    pricing?: {
        discountPercent?: number;
        discountCoupons?: string[];
    };

    campaignApplication?: CampaignApplication;

    reviews?: Review[];

    mainTenant: Tenant;

    outcome?: {
        includeImages?: boolean;
        includeVideo?: boolean;
        includeSocialPosts?: boolean;
        fbMentions?: string[];
        hashtags?: string[];
        igMentions?: string[];
    };

    general?: {
        description?: RichText;
        descriptionImages?: File[];
        tags?: Tag[];
        capacity?: number;
    };

    delivery?: {
        freeOfCharge?: boolean;
        type?: DeliveryType;
        expectedDeliveryDays?: number;
        confirmType?: string
        notes?: string;
        company?: string;
        instructions?: RichText;
    };

    milestones?: CampaignMilestone[];

    notificationSubscription: CampaignNotificationSubscription;
}

export enum CampaignState {
    draft = "draft",
    publishable = "publishable",
    approved = "approved",
    published = "published",
    opened = "opened",
    closed = "closed",
    finished = "finished",
}

export interface CampaignNotificationSubscription {
    campaign: Campaign;
    reviewer: Reviewer;
    enableEmailNotifications: boolean;
}

export enum DeliveryType {
    deliverByUs = "deliverByUs",
    deliveryByClient = "deliveryByClient",
    deliveryByEshop = "deliveryByEshop",
    personalPickup = "personalPickup",
}

export interface Tag {
    key: string;
    color: string;
}

export interface CampaignSettings {
    hasAutoOpen: boolean;
    openAt: Date;
    closeAt: Date;
    capacity: number;
    registrationPeriodDays: number;
    submissionPeriodDays: number;
}

export interface CampaignMilestone {
    type: string;
    timestamp: number;
}

export interface CampaignImage {
    isThumbnail: boolean;
    fileId?: string;
    file: File;
}

export interface CampaignApplication {
    id?: string;
    tenantId?: string;
    campaignId?: string;
    reviewerId?: string;
    status?: CampaignApplicationStatus;
    appliedAt?: Date;
    resolvedBy?: string;
    resolvedAt?: Date;
    resolutionMessage?: string;
    questionnaireResponse: QuestionnaireResponse;
    deliveryAddress: Address;

    latestResolution?: CampaignApplicationResolution;
    state?: CampaignApplicationStatus;

    // V2
    isDelivered?: boolean;
    isOrdered?: boolean;
    deliveryConfirmedAt?: number;
    submitedAt?: number;
    discountCode?: string;
    deadlineAt?: number;

    // Aggregation
    campaign?: Campaign;
}

export interface CampaignApplicationResolution {
    message?: string;
    resolvedAt?: Date;
    status?: CampaignApplicationResolutionStatus;
}

export enum CampaignApplicationResolutionStatus {
    selected = "selected",
    alternate = "alternate",
    rejected = "rejected",
}

export enum Gender {
    female = "female",
    male = "male",
    whoKnows = "whoknows",
}

export enum QuestionnaireType {
    campaignApplication = "campaignapplication",
    survey = "survey",
}

export enum QuestionnaireQuestionType {
    text = "text",
    textLong = "textlong",
    checkbox = "checkbox",
    radio = "radio",
}

export enum CampaignStatus {
    draft = "draft",
    opened = "opened",
    inProgress = "inprogress",
    closed = "closed",
}

export enum CampaignApplicationStatus {
    draft = "draft",
    submitted = "submitted",
    pending = "pending",
    resolved = "resolved",
}

export interface Review {
    id: string;
    campaign: Campaign;
    product: Product;
    state: ReviewState;
    contents: ReviewContent[];
    submittedContents: string[];
    pros: string[];
    cons: string[];
    images: File[];
    videos: File[];
    wouldRecommend?: boolean;
    wouldRecommendPercent: number | null;
    totalRating: number;
    attributeRatings: ProductAttributeRating[];
    rejectionMessage: string;
    censureMessage: string;
}

export enum ReviewState {
    draft = "draft",
    submitted = "submitted",
    approved = "approved",
    rejected = "rejected",
    censured = "censured",
}

export type ProductAttributeRating = {
    id: string;
    name: string;
    rating: number;
};

export type ReviewContent = {
    destination: ReviewDestination;
    content: string;
};

export type ReviewDestination = {
    type: string;
    name: string;
    config?: string;
    key?: string;
};

export interface Reviewer {
    id: string;
    email: string;
    profile: ReviewerProfile;
    profileImage: File;
    socials: ReviewerSocials;
    isBlacklisted: boolean;

    favoriteCampaigns: Campaign[];
}

export interface ReviewerProfile {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: number;
    phoneNumber: string;
    address: Address;
}

export interface ReviewerSocials {
    hasFb: boolean;
    fbFollowers: number;
    fbUrl: string;

    hasIg: boolean;
    igFollowers: number;
    igUrl: string;
}

export interface TestedProduct {
    id: string;
    image?: File;
    name?: string;
    slug?: string;
    userManualLink?: string;
    urlAddress?: string;
    info?: {
        manufacturer?: {
            id: string;
            name: string;
            logo: File;
        };
        model?: string;
    };
    attributes?: {
        key: string;
        value: string;
    }[];
    category?: {
        key?: string;
    }[];
    description?: RichText;
    detailPageLinks?: {
        label?: string;
        src?: string;
    }[];
}
