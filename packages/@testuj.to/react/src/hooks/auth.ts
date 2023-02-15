
import { type AuthApi } from '@testuj.to/auth'

import { useTTContext } from '../context'

export const useAuth = (): AuthApi => {
    return useTTContext().auth
}
