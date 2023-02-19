
import {
    GrantType,
    Credentials,
} from '@lib/types'

export interface RefreshingCredentialsOptions {}
export class RefreshingCredentials implements Credentials {
    constructor(options: RefreshingCredentialsOptions) {
    }

    getGrantType(): GrantType {
        return 'refresh_token'
    }

    getClientId(): string {
        return null
    }

    setClientId(clientId: string) {}

    getAccessToken(): string {
        return null
    }

    setAccessToken(accessToken: string) {}

    getRefreshToken(): string {
        return null
    }

    setRefreshToken(refreshToken: string) {}
}
