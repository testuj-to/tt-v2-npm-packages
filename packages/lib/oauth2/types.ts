
export type GrantType = 'refresh_token'|'client_credentials'

export interface Credentials {
    getGrantType?(): GrantType

    getTokenType?(): string
    setTokenType?(tokenType: string): any

    getAccessToken?(): string
    setAccessToken?(accessToken: string): any

    getRefreshToken?(): string
    setRefreshToken?(refreshToken: string): any

    getClientId?(): string
    setClientId?(clientId: string): any

    getClientSecret?(): string
    setClientSecret?(clientSecret: string): any

    addListener?(listener: Function)
    removeListener?(listener: Function)
}

export type ResponseType = 'token'|'code'

export interface OAuth2AuthorizeRequest {
    response_type?: ResponseType
    client_id?: string
    redirect_uri?: string
    state?: string
    scope?: string
}

export interface OAuth2TokenRequest {
    grant_type?: GrantType
    refresh_token?: string
    client_id?: string
    client_secret?: string
}

export interface OAuth2Response {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    state?: string
    token_type?: string
}
