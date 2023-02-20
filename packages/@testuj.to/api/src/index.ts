
import {
    CampaignApplication,
} from '@lib/types'
import {
    Credentials,
} from '@lib/oauth2'
import { HttpClient, HttpClientOptions } from '@lib/utils'

import {
    Edges,
} from './types'

export {
    type Credentials,
    type OAuth2AuthorizeRequest,
    type OAuth2TokenRequest,
    type OAuth2Response,
    type GrantType,
    type ResponseType,
    type ClientCredentialsOptions,
    type RefreshingCredentialsOptions,
    type OAuth2ClientOptions,
    ClientCredentials,
    RefreshingCredentials,
    OAuth2Client,
} from '@lib/oauth2'

export interface ApiClientOptions extends Omit<HttpClientOptions, 'credentials'> {
    credentials: Credentials
}

export class ApiClient {
    public httpClient: HttpClient

    constructor(options: ApiClientOptions) {
        const { credentials, ...httpClientOptions } = options || {} as ApiClientOptions

        this.httpClient = new HttpClient(httpClientOptions)
        this.httpClient.addRequestMiddleware(async(request) => {
            if (credentials.getTokenType() && credentials.getAccessToken()) {
                request.headers.set('Authorization', `${credentials.getTokenType()} ${credentials.getAccessToken()}`)
            }

            return request
        })
    }

    async getCampaignApplications(): Promise<Edges<CampaignApplication>> {
        try {
            const response = await this.httpClient.get<Edges<CampaignApplication>>('/api/campaignApplications', {})
            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    // async postCampaignApplications(campaignApplication: CampaignApplication): Promise<CampaignApplication> {
    //     try {
    //         const response = await this.httpClient.post<CampaignApplication>('/api/campaignApplications', campaignApplication)
    //         return await response.json()
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
}
