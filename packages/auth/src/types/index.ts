
import {
    GrantType,
} from '../../../../lib/types'

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
