
import {
    type Edges,
    type BarePagination,
    type CampaignApplication,
    CampaignApplicationStatus,
} from '@lib/types'
import {
    type HttpClient,
} from '@lib/utils'

import {
    type RequestOptions,
} from '../types'
import {
    resolveRequestUrl,
    resolveRequestOptions,
    parsePaginationParams,
} from '../utils'

export interface GetCampaignApplicationAggregationOptions {
    includeCampaign?: boolean
    includeCampaignProducts?: boolean
    includeCampaignQuestionnaire?: boolean
}

const parseAggregationParams = (options: GetCampaignApplicationAggregationOptions): Record<string, string> => {
    let searchParams: Record<string, string>

    if (options?.includeCampaign) {
        searchParams = { ...searchParams, 'include.campaign': '1' }
    }

    if (options?.includeCampaignProducts) {
        searchParams = { ...searchParams, 'include.campaign.products': '1' }
    }

    if (options?.includeCampaignQuestionnaire) {
        searchParams = { ...searchParams, 'include.campaign.questionnaire': '1' }
    }

    return searchParams
}

export interface GetCampaignApplicationsOptions extends RequestOptions, GetCampaignApplicationAggregationOptions {
    pagination?: BarePagination
    status?: CampaignApplicationStatus[]
}

export interface GetCampaignApplicationOptions extends RequestOptions, GetCampaignApplicationAggregationOptions {}

export const createCampaignApplicationsApi = (client: HttpClient) => {
    return {
        async getCampaignApplications(options: GetCampaignApplicationsOptions = {}) {
            const searchParams = new URLSearchParams({
                ...parsePaginationParams(options?.pagination),
                ...parseAggregationParams(options),
            })

            if (options?.status?.length > 0) {
                searchParams.set('status', options.status.join(','))
            }

            const response = await client.get<Edges<CampaignApplication>>(
                resolveRequestUrl(`/campaignApplications`, searchParams),
                resolveRequestOptions(options),
            )

            return response.json()
        },
        async getCampaignApplication(id: string, options: GetCampaignApplicationsOptions = {}) {
            const searchParams = new URLSearchParams({
                ...parseAggregationParams(options),
            })

            const response = await client.get<CampaignApplication>(
                resolveRequestUrl(`/campaignApplications/${id}`, searchParams),
                resolveRequestOptions(options),
            )

            return response.json()
        },
        async createCampaignApplication(campaignApplication: CampaignApplication, options: RequestOptions = {}) {
            const response = await client.post<CampaignApplication>(
                resolveRequestUrl(`/campaignApplications`),
                campaignApplication,
                resolveRequestOptions(options),
            )

            return response.json()
        },
    }
}
