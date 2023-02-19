
import {
    type Middleware,
    type HttpResponse,
} from './httpClient'

export const ValidateStatusCodeSuccess: Middleware<HttpResponse<any>> = async<Response>(response: HttpResponse<Response>) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    throw response
}

export const ValidateStatusCodeRedirect: Middleware<HttpResponse<any>> = async<Response>(response: HttpResponse<Response>) => {
    if (response.status >= 300 && response.status < 400) {
        return response
    }

    throw response
}
