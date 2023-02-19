
import { type OAuth2 } from '@lib/oauth2'

import { useTTContext } from '../context'

export const useAuth = (): OAuth2 => {
    return useTTContext().auth
}
