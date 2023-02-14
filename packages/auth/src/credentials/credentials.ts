
import {
    GrantType,
    Credentials,
} from '../../../../lib/types'

export const mustCredentials = (tokenStore: Partial<Credentials>): Credentials => {
    let _tokenType: string
    let _accessToken: string
    let _refreshToken: string
    let _clientId: string
    let _clientSecret: string

    let _listeners: Function[] = []

    const dispatch = () => {
        for (const listener of _listeners) {
            listener()
        }
    }

    return {
        getGrantType(): GrantType {
            if (typeof tokenStore?.getGrantType === 'function') {
                return tokenStore.getGrantType()
            }

            return null
        },

        getTokenType(): string {
            if (typeof tokenStore?.getTokenType() === 'function') {
                return tokenStore.getTokenType()
            }

            return _tokenType
        },
        setTokenType(tokenType: string) {
            if (typeof tokenStore?.setTokenType === 'function') {
                tokenStore.setTokenType(tokenType)
                return dispatch()
            }

            _tokenType = tokenType
            dispatch()
        },

        getAccessToken(): string {
            if (typeof tokenStore?.getAccessToken === 'function') {
                return tokenStore.getAccessToken()
            }

            return _accessToken
        },
        setAccessToken(accessToken: string) {
            if (typeof tokenStore?.setAccessToken === 'function') {
                tokenStore.setAccessToken(accessToken)
                return dispatch()
            }

            _accessToken = accessToken
            dispatch()
        },

        getRefreshToken(): string {
            if (typeof tokenStore?.getRefreshToken === 'function') {
                return tokenStore.getRefreshToken()
            }

            return _refreshToken
        },
        setRefreshToken(refreshToken: string) {
            if (typeof tokenStore?.setRefreshToken === 'function') {
                tokenStore.setRefreshToken(refreshToken)
                return dispatch()
            }

            _refreshToken = refreshToken
            dispatch()
        },

        getClientId(): string {
            if (typeof tokenStore?.getClientId === 'function') {
                return tokenStore.getClientId()
            }

            return _clientId
        },
        setClientId(clientId: string) {
            if (typeof tokenStore?.setClientId === 'function') {
                tokenStore.setClientId(clientId)
                return dispatch()
            }

            _clientId = clientId
            dispatch()
        },

        getClientSecret(): string {
            if (typeof tokenStore?.getClientSecret === 'function') {
                return tokenStore.getClientSecret()
            }

            return _clientSecret
        },
        setClientSecret(clientSecret: string) {
            if (typeof tokenStore?.setClientSecret === 'function') {
                tokenStore.setClientSecret(clientSecret)
                return dispatch()
            }

            _clientSecret = clientSecret
            dispatch()
        },

        addListener(listener: Function) {
            _listeners.push(listener)
        },
        removeListener(listener: Function) {
            const index = _listeners.indexOf(listener)

            if (index >= 0) {
                _listeners.splice(index, 1)
            }
        },
    }
}
