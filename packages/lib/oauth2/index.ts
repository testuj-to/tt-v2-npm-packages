
import {
    User,
} from '@lib/types'
import {
    hasWindow,
    base64Encode,
    generateAlphaNumericString,
    HttpClient,
    HttpClientOptions,
    Listenable,
} from '@lib/utils'

import {
    OAuth2Response,
    OAuth2AuthorizeRequest,
    Credentials,
} from './types'
import { mustCredentials } from './credentials'

export type {
    Credentials,
    OAuth2AuthorizeRequest,
    OAuth2TokenRequest,
    OAuth2Response,
    GrantType,
    ResponseType,
} from './types'
export {
    type ClientCredentialsOptions,
    ClientCredentials,
} from './credentials/clientCredentials'
export {
    type RefreshingCredentialsOptions,
    RefreshingCredentials,
} from './credentials/refreshingCredentials'

export interface OAuth2ClientOptions extends Omit<HttpClientOptions, 'credentials'> {
    credentials: Credentials
    stateLength?: number
    onRedirect?(url: string): void
}

const rotationIntervals: {
    [instanceKey: string]: NodeJS.Timeout
} = {}

const clearRotationInterval = (instanceKey: string) => {
    clearInterval(rotationIntervals[instanceKey])
    rotationIntervals[instanceKey] = null
}

const rotateAuthorization = async(oAuth2Client: OAuth2Client) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Encode(`${oAuth2Client.credentials.getClientId()}:`)}`,
    }

    const body = new FormData()

    body.set('grant_type', 'refresh_token')
    body.set('refresh_token', oAuth2Client.credentials.getRefreshToken())

    const response = await oAuth2Client.httpClient.post('/oauth2/token', body, { headers })

    const oAuth2Response: OAuth2Response = await response.json()
    await oAuth2Client.handleOAuth2Response(oAuth2Response)
}

export class OAuth2Client extends Listenable {
    public instanceKey: string

    public credentials: Credentials
    public httpClient: HttpClient
    public isAuthenticated: boolean = false
    // public isAuthenticating: boolean = true
    public loggedAs?: User
    public onRedirect?(url: string): void

    // const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    // const [ isAuthenticating, setIsAuthenticating ] = useState(true)
    // const [ user, setUser ] = useState<User>(null)
    // public get isAuthenticated() {
    //     if (this.credentials.getTokenType() && this.credentials.getAccessToken()) {
    //     }
    //     return false
    // }

    constructor(options: OAuth2ClientOptions) {
        super()

        const { credentials, stateLength, onRedirect, ...httpClientOptions } = options || {} as OAuth2ClientOptions

        this.instanceKey = generateAlphaNumericString((stateLength && stateLength > 0) ? stateLength : 32)
        this.credentials = mustCredentials(credentials)
        this.httpClient = new HttpClient(httpClientOptions)

        this.httpClient.addRequestMiddleware(async(request) => {
            if (credentials.getTokenType() && credentials.getAccessToken()) {
                request.headers.set('Authorization', `${credentials.getTokenType()} ${credentials.getAccessToken()}`)
            }

            return request
        })

        this.onRedirect = typeof onRedirect === 'function' ? onRedirect : (
            (url: string) => {
                if (hasWindow()) {
                    new Function(`window.location.replace('${(url || '').replace(/\'/g, '\\\'')}');`)()
                }
            }
        )
    }

    async signUp(options?: OAuth2AuthorizeRequest): Promise<void> {
        let currentLocation: string
        if (hasWindow()) {
            currentLocation = new Function(`return window.location.toString();`)()
        }

        const oAuth2Request: OAuth2AuthorizeRequest = {
            response_type: options?.response_type || 'token',
            client_id: encodeURIComponent(options?.client_id || this.credentials.getClientId()),
            redirect_uri: encodeURIComponent(options?.redirect_uri || currentLocation),
            state: encodeURIComponent(this.instanceKey),
        }

        if (options?.scope) {
            oAuth2Request.scope = encodeURIComponent(options.scope)
        }

        const url = `${this.httpClient.options.baseUrl}/signup?redirect_uri=${encodeURIComponent(`/authorize?${Object.keys(oAuth2Request).map(key => `${key}=${oAuth2Request[key]}`).join('&')}`)}`

        if (typeof this.onRedirect === 'function') {
            this.onRedirect(url)
        }
    }

    async logIn(options?: OAuth2AuthorizeRequest): Promise<void> {
        let currentLocation: string
        if (hasWindow()) {
            currentLocation = new Function(`return window.location.toString();`)()
        }

        const oAuth2Request: OAuth2AuthorizeRequest = {
            response_type: options?.response_type || 'token',
            client_id: encodeURIComponent(options?.client_id || this.credentials.getClientId()),
            redirect_uri: encodeURIComponent(options?.redirect_uri || currentLocation),
            state: encodeURIComponent(this.instanceKey),
        }

        if (options?.scope) {
            oAuth2Request.scope = encodeURIComponent(options.scope)
        }

        const url = `${this.httpClient.options.baseUrl}/oauth2/authorize?${Object.keys(oAuth2Request).map(key => `${key}=${oAuth2Request[key]}`).join('&')}`

        if (typeof this.onRedirect === 'function') {
            this.onRedirect(url)
        }
    }

    async logOut(): Promise<void> {
        // window?.location?.replace(`${this.baseUrl}/signout?redirect_uri${
        //     encodeURIComponent(options?.redirectUri || window?.location?.toString?.())
        // }`)
    }

    async handleOAuth2Response(oAuth2Response: OAuth2Response) {
        if (oAuth2Response?.token_type) {
            this.credentials.setTokenType(oAuth2Response.token_type)
        }

        if (oAuth2Response?.access_token) {
            this.credentials.setAccessToken(oAuth2Response.access_token)
        }

        if (oAuth2Response?.refresh_token) {
            this.credentials.setRefreshToken(oAuth2Response.refresh_token)
        }

        if (oAuth2Response?.expires_in) {
            clearRotationInterval(this.instanceKey)
            rotationIntervals[this.instanceKey] = setTimeout(() => rotateAuthorization(this), oAuth2Response.expires_in * 1000 * (1 / 4))
        }

        if (!this.loggedAs) {
            // console.log('load user after handling oAuth2 response:', oAuth2Response)

            try {
                this.loggedAs = await this.getProfile()

                this.isAuthenticated = true
            } catch (err) {
                clearRotationInterval(this.instanceKey)

                throw err
            } finally {
                this.dispatch()
            }
        }
    }

    async getAccessToken(): Promise<void> {
        const headers = {
            Authorization: `Basic ${base64Encode(`${this.credentials.getClientId()}:`)}`,
        }

        const body = new FormData()
        const grantType = this.credentials.getGrantType()

        body.set('grant_type', grantType)

        switch (grantType) {
        case 'refresh_token':
            body.set('refresh_token', this.credentials.getRefreshToken())
            break
        case 'client_credentials':
            body.set('client_id', this.credentials.getClientId())
            body.set('client_secret', this.credentials.getClientSecret())
            break
        }

        try {
            const response = await this.httpClient.post('/oauth2/token', body, { headers })
            const oAuth2Response = await response.json()
            await this.handleOAuth2Response(oAuth2Response)
        } catch (err) {
            console.error(err)
        }
    }

    async getProfile(): Promise<User> {
        try {
            const response = await this.httpClient.get<User>('/api/profile', {})
            const user = await response.json()
            return user
        } catch (err) {
            console.error(err)
        }
    }
}
