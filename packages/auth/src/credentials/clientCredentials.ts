
import { GrantType, Credentials } from '../../../../lib/types'

export interface ClientCredentialsOptions {}
export class ClientCredentials implements Credentials {
    constructor(options: ClientCredentialsOptions) {
    }

    getGrantType(): GrantType {
        return 'client_credentials'
    }

    getClientId(): string {
        return null
    }

    setClientId(clientId: string) {}

    getClientSecret(): string {
        return null
    }

    setClientSecret(clientSecret: string) {}
}
