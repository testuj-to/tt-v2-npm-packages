
import { useState, useEffect, useCallback } from 'react'
import {
    type CampaignApplication,
} from '@lib/types'
import {
    type PaginationOptions,
    type GetCampaignApplicationsOptions,
    type GetCampaignApplicationOptions,
} from '@testuj.to/api'

import { useTTContext } from '../context'
import { useToast } from '../components/Toast'
import { usePagination } from './pagination'

export interface CampaignApplicationsOptions extends Omit<GetCampaignApplicationsOptions, 'pagination'>, PaginationOptions {}

export const useCampaignApplications = (options: CampaignApplicationsOptions) => {
    const { api, t } = useTTContext()
    const toast = useToast()

    const [ campaignApplications, setCampaignApplications ] = useState<CampaignApplication[]>([])
    const [ campaignApplicationsTotal, setCampaignApplicationsTotal ] = useState(0)
    const [ isLoadingCampaignApplications, setIsLoadingCampaignApplications ] = useState(false)

    const campaignApplicationsPagination = usePagination(options)

    const loadCampaignApplications = useCallback(async(abortController: AbortController) => {
        setIsLoadingCampaignApplications(true)

        try {
            const { edges, edgesTotal } = await api.getCampaignApplications({
                signal: abortController.signal,
                pagination: campaignApplicationsPagination,
                ...options,
            })

            setCampaignApplications(edges)
            setCampaignApplicationsTotal(edgesTotal)
        } catch (err) {
            if (abortController.signal.aborted) {
                return
            }

            toast.open({
                title: t('campaignapplications_load_failed'),
                description: String(err),
            })
        } finally {
            setIsLoadingCampaignApplications(false)
        }
    }, [ JSON.stringify(campaignApplicationsPagination.searchParams), JSON.stringify(options) ])

    useEffect(() => {
        const abortController = new AbortController()

        loadCampaignApplications(abortController)

        return () =>
            abortController.abort()
    }, [ JSON.stringify(campaignApplicationsPagination.searchParams), JSON.stringify(options) ])

    return {
        campaignApplications,
        campaignApplicationsTotal,
        isLoadingCampaignApplications,
        campaignApplicationsPagination,
        reloadCampaignApplications: () =>
            loadCampaignApplications(new AbortController()),
    }
}

export interface CampaignApplicationOptions extends GetCampaignApplicationOptions {}

export const useCampaignApplication = (campaignApplicationId: string, options: CampaignApplicationsOptions) => {
    const { api, t } = useTTContext()
    const toast = useToast()

    const [ campaignApplication, setCampaignApplication ] = useState<CampaignApplication>(null)
    const [ isLoadingCampaignApplication, setIsLoadingCampaignApplication ] = useState(false)

    const loadCampaignApplication = useCallback(async(abortController: AbortController) => {
        if (!campaignApplicationId) {
            return
        }

        setIsLoadingCampaignApplication(true)

        try {
            const campaignApplication = await api.getCampaignApplication(campaignApplicationId, {
                signal: abortController.signal,
                ...options,
            })

            setCampaignApplication(campaignApplication)
        } catch (err) {
            if (abortController.signal.aborted) {
                return
            }

            toast.open({
                title: t('campaignapplication_load_failed'),
                description: String(err),
            })
        } finally {
            setIsLoadingCampaignApplication(false)
        }
    }, [ campaignApplicationId, JSON.stringify(options) ])

    useEffect(() => {
        const abortController = new AbortController()

        loadCampaignApplication(abortController)

        return () =>
            abortController.abort()
    }, [ campaignApplicationId, JSON.stringify(options) ])

    return {
        campaignApplication,
        isLoadingCampaignApplication,
        reloadCampaignApplication: () =>
            loadCampaignApplication(new AbortController()),
    }
}

export const useCreateCampaignApplication = () => {
    const { api, t } = useTTContext()
    const toast = useToast()

    const [ isCreatingCampaignApplication, setIsCreatingCampaignApplication ] = useState(false)

    const createCampaignApplication = useCallback(async(campaignApplication: CampaignApplication) => {
        setIsCreatingCampaignApplication(true)
        const closeCreatingCampaignApplicationToast = toast.open({
            title: t('campaignapplication_submitting'),
            timeoutMs: null,
        })

        try {
            return await api.createCampaignApplication(campaignApplication)
        } catch (err) {
            console.error(err)
            toast.open({
                title: t('campaignapplication_submitting_failed'),
                description: String(err),
            })
        } finally {
            closeCreatingCampaignApplicationToast()
            setIsCreatingCampaignApplication(false)
        }
    }, [])

    return {
        isCreatingCampaignApplication,
        createCampaignApplication,
    }
}
