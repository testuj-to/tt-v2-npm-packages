
import {
    type Credentials,
} from '@lib/oauth2'
import {
    type HttpClientOptions,
    HttpClient,
} from '@lib/utils'

import { createCampaignApplicationsApi } from './campaignApplications'

export interface ApiClientOptions extends Omit<HttpClientOptions, 'credentials'> {
    credentials: Credentials
}

export const createApiClient = (options: ApiClientOptions) => {
    const { credentials, ...httpClientOptions } = options || {} as ApiClientOptions

    const httpClient = new HttpClient(httpClientOptions)

    httpClient.addRequestMiddleware(async(request) => {
        const tokenType = credentials.getTokenType()
        const accessToken = credentials.getAccessToken()

        if (tokenType && accessToken) {
            request.headers.set('Authorization', `${tokenType} ${accessToken}`)
        }

        return request
    })

    return {
        ...createCampaignApplicationsApi(httpClient),
    }
}
