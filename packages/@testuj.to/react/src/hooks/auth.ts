
import { useCallback, useEffect, useState } from 'react'
import { User } from '@lib/types'
import { type OAuth2Client } from '@lib/oauth2'

import { useTTContext } from '../context'

export const useAuth = (): {
    oAuth2Client: OAuth2Client
    isAuthenticated: boolean
    // isAuthenticating: boolean
    loggedAs: User
    // logout(): Promise<void>
    // signUp(options?: SignUpOptions): Promise<void>
    // login(options?: LoginOptions): Promise<void>
    // reloadUser(): Promise<void>
} => {
    const oAuth2Client = useTTContext().auth

    const [ isAuthenticated, setIsAuthenticated ] = useState(oAuth2Client.isAuthenticated)
    const [ loggedAs, setLoggedAs ] = useState(oAuth2Client.loggedAs)

    const handleClientChange = useCallback(() => {
        setIsAuthenticated(oAuth2Client.isAuthenticated)
        setLoggedAs(oAuth2Client.loggedAs)
    }, [])

    useEffect(() => {
        oAuth2Client.addListener(handleClientChange)

        return () =>
        oAuth2Client.removeListener(handleClientChange)
    }, [])

    const handleOAuth2Callback = useCallback(async(params: URLSearchParams) => {
        const expiresIn = params.get('expires_in')

        await oAuth2Client.handleOAuth2Response({
            access_token: params.get('access_token'),
            refresh_token: params.get('refresh_token'),
            expires_in: (expiresIn && !isNaN(Number(expiresIn))) ? Number(expiresIn) : null,
            state: params.get('state'),
            token_type: params.get('token_type'),
        })

        oAuth2Client.onRedirect(`${window.location?.pathname}${window.location?.search}`)
    }, [])

    useEffect(() => {
        if (window?.location?.hash?.length > 1) {
            const params = new URLSearchParams(
                /^#/.test(window?.location?.hash) ?
                    window.location.hash.substring(1) :
                    window?.location?.hash,
            )

            if (params.get('access_token') || params.get('refresh_token')) {
                handleOAuth2Callback(params)
            }
        }
    }, [])

    return {
        oAuth2Client,
        isAuthenticated,
        loggedAs,
    }
}
