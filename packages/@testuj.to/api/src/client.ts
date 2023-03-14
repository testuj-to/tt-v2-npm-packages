
import {
    type CampaignApplication,
} from '@lib/types'
import {
    type Credentials,
} from '@lib/oauth2'
import {
    type HttpClientOptions,
    HttpClient,
} from '@lib/utils'

import {
    type Edges,
} from './types'

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
