
import { type Api } from '@testuj.to/api'

import { useTTContext } from '../context'

export const useApi = (): Api => {
    return useTTContext().api
}
