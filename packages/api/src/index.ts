
import {
    Credentials,
    CampaignApplication,
} from '../../../lib/types'
import {
    HttpClient,
    HttpClientOptions,
} from '../../../lib/utils'
import {
    Edges,
} from './types'

export interface ApiOptions extends Omit<HttpClientOptions, 'credentials'> {
    credentials: Credentials
}

export class Api {
    public httpClient: HttpClient

    constructor(options: ApiOptions) {
        const { credentials, ...httpClientOptions } = options || {} as ApiOptions

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
