
import { type ApiClient } from '@testuj.to/api'

import { useTTContext } from '../context'

export const useApi = (): ApiClient => {
    return useTTContext().api
}
