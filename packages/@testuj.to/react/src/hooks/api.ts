
import { createApiClient } from '@testuj.to/api'

import { useTTContext } from '../context'

export const useApi = (): ReturnType<typeof createApiClient> => {
    return useTTContext().api
}
