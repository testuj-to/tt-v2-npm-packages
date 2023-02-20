
export interface RichText {
    json: string
}

export interface File {
    id?: string
    blob: string
}

export interface Address {
    country: string
    city: string
    postalCode: string
    line1: string
    line2: string
}

export interface User {
    id: string
    // role?: string
    firstName: string
    lastName: string
    username: string
    gender: Gender
    birthDate: Date
    address: Address

    associatedTenants: AssociatedTenant[]

    // email: string
    // image?: string
}

export interface AssociatedTenant {
    tenantId: string
    associatedAt: Date
    acceptedAgreements: {
        agreementId: string
        revisionIndex: 1,
        acceptedBy: string
        acceptedAt: Date
    }[]
    role?: string
    tenant: {
        id: string
        name: string
        domains: {
            isDefault: boolean
            scheme: string
            name: string
        }[]
    }
}

export interface Questionnaire {
    id?: string
    type: QuestionnaireType
    name: string
    questions: QuestionnaireQuestion[]
}

export interface QuestionnaireQuestion {
    key: string
    content: string
    placeholder?: string
    isRequired: boolean
    type: QuestionnaireQuestionType
    options: QuestionnaireQuestionOption[]
}

export interface QuestionnaireQuestionOption {
    key: string
    value: string
}

export interface QuestionnaireResponse {
    questionnaireId?: string
    answers: QuestionnaireResponseAnswer[]
}

export interface QuestionnaireResponseAnswer {
    key: string
    value: any
    optionKeys: string[]
}

export interface ProductCategory {
    id?: string
    parentId?: string
    name?: string
}

export interface Product {
    id?: string
    categoryId?: string
    name?: string
    manufacturer?: string
    model?: string
    imageId?: string

    // Aggregation
    category?: ProductCategory
    image?: File
}

export interface Tenant {
    id?: string
    isDefault?: boolean
    name: string
    domains?: TenantDomain[]
    theme?: TenantTheme
}

export interface TenantDomain {
    isDefault: boolean
    scheme: string
    name: string
}

export interface TenantTheme {
    logo: TenantThemeLogo
    colorScheme?: TenantThemeColorScheme
    fontFamily?: TenantThemeFontFamily
}

export interface TenantThemeLogo {
    fileId?: string

    // Aggregation
    file?: File
}

export interface TenantThemeColorScheme {
    primary: string
    secondary: string
    text: string
    link: string
    button: string
    buttonBg: string
    error: string
    categoriesBg: string
}

export interface TenantThemeFontFamily {
    text: string
    heading: string
    imports: {
        name: string
        statement: string
    }[]
    fontFaces: {
        family: string
        style: string
        weight: string
        src: string
    }[]
}

export interface Campaign {
    id?: string
    tenantIds?: string[]
    productIds?: string[]
    status?: CampaignStatus
    name?: string
    openAt?: Date
    hasAutoOpen?: boolean
    applications?: {
        slotsCount?: number
        registrationPeriodDays?: number
        submissionPeriodDays?: number
        hasAutoProlongRegistration?: boolean
    }
    web?: {
        slug?: string
        title?: string
        description?: RichText
        criteria?: RichText
    }
    images?: CampaignImage[]
    questionnaireId?: string

    // Aggregation
    tenants?: Tenant[]
    products?: Product[]
    questionnaire?: Questionnaire
}

export interface CampaignImage {
    isThumbnail: boolean
    fileId: string

    // Aggregation
    file?: File
}

export interface CampaignApplication {
    id?: string
    tenantId?: string
    campaignId?: string
    reviewerId?: string
    status?: CampaignApplicationStatus
    appliedAt?: Date
    resolvedBy?: string
    resolvedAt?: Date
    resolutionMessage?: string
    questionnaireResponse: QuestionnaireResponse
    deliveryAddress: Address

    // Aggregation
    campaign?: Campaign
}

export enum Gender {
    female   = 'female',
    male     = 'male',
    whoKnows = 'whoknows',
}

export enum QuestionnaireType {
    campaignApplication = 'campaignapplication',
    survey              = 'survey',
}

export enum QuestionnaireQuestionType {
    text     = 'text',
    textLong = 'textlong',
    checkbox = 'checkbox',
    radio    = 'radio',
}

export enum CampaignStatus {
    draft      = 'draft',
    opened     = 'opened',
    inProgress = 'inprogress',
    closed     = 'closed',
}

export enum CampaignApplicationStatus {
    applied   = 'applied',
    enrolled  = 'enrolled',
    alternate = 'alternate',
    rejected  = 'rejected',
}
