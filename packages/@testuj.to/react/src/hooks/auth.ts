
import { type OAuth2Client } from '@lib/oauth2'

import { useTTContext } from '../context'

export const useAuth = (): OAuth2Client => {
    return useTTContext().auth
}
