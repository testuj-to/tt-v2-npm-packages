
import { type HttpClientMethodOptions } from '@lib/utils'

export interface RequestOptions extends Pick<HttpClientMethodOptions, 'headers'|'signal'> {}
