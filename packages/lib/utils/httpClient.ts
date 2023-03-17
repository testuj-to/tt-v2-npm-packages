
import { ValidateStatusCodeSuccess } from './httpMiddlewares'

export class HttpRequest extends Request {
    constructor(url: string, options: RequestInit) {
        super(url, options)
    }
}

export interface HttpResponse<T> extends Omit<Response, 'json'> {
    json(): Promise<T>
}

export type Middleware<T> = (value: T) => Promise<T|false>

export type HttpClientURLResolver = (path: string, options: HttpClientOptions) => string

export interface RequestWithObjectHeaders extends Omit<RequestInit, 'headers'> {
    headers?: Record<string, string>
}

export interface HttpClientMethodOptions extends RequestWithObjectHeaders {
    requestMiddlewares?: Middleware<HttpRequest>[]
    responseMiddlewares?: Middleware<HttpResponse<any>>[]
}

export interface HttpClientOptions extends HttpClientMethodOptions {
    baseUrl: string

    urlResolver?: HttpClientURLResolver
}

const resolveRequestUrl: HttpClientURLResolver = (path: string, options: HttpClientOptions) => {
    let url = options?.urlResolver?.(path, options)

    if (url) {
        return url
    }

    url = path || '/'

    if (options?.baseUrl) {
        if (url[0] !== '/') {
            url = `/${url}`
        }

        let baseUrl = options.baseUrl
        if (baseUrl[baseUrl.length - 1] === '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1)
        }

        url = `${baseUrl}${url}`
    }

    if (url === '/') {
        return ''
    }

    return url
}

const resolveRequestOptions = (httpClient: HttpClient, method: string, methodOptions?: HttpClientMethodOptions, body?: BodyInit): HttpClientOptions => {
    const requestMiddlewares = [
        ...(httpClient?.options?.requestMiddlewares || []),
        ...(methodOptions?.requestMiddlewares || []),
    ]

    const responseMiddlewares = [
        ...(httpClient?.options?.responseMiddlewares || []),
        ...(methodOptions?.responseMiddlewares || []),
    ]

    const headers = {
        ...(httpClient?.options?.headers || {}),
        ...(methodOptions?.headers || {}),
    }

    return {
        ...httpClient?.options,
        ...methodOptions,
        requestMiddlewares,
        responseMiddlewares,
        headers,
        method,
        body,
    }
}

export class HttpClient {
    readonly options: HttpClientOptions

    constructor(options: HttpClientOptions) {
        if (!/^http(s)?:\/\//.test(options?.baseUrl)) {
            throw Error(`Invalid baseUrl '${options?.baseUrl}'`)
        }

        this.options = {
            ...options,
            headers: {
                ...(options?.headers || {}),
            },
            requestMiddlewares: (typeof options?.requestMiddlewares === 'object' && typeof options?.requestMiddlewares?.length === 'number') ?
                options.requestMiddlewares : [],
            responseMiddlewares: (typeof options?.responseMiddlewares === 'object' && typeof options?.responseMiddlewares?.length === 'number') ?
                options.responseMiddlewares : [ ValidateStatusCodeSuccess ],
        }
    }

    addRequestMiddleware(middleware: Middleware<HttpRequest>) {
        this.options.requestMiddlewares = [ ...(this.options?.requestMiddlewares || []), middleware ]
    }

    addResponseMiddleware(middleware: Middleware<HttpResponse<any>>) {
        this.options.responseMiddlewares = [ ...(this.options?.responseMiddlewares || []), middleware ]
    }

    async call<Response>(url: string, options: HttpClientOptions): Promise<HttpResponse<Response>> {
        let httpRequest = new HttpRequest(url, options)
    
        for (const requestMiddleware of this?.options?.requestMiddlewares || []) {
            httpRequest = await requestMiddleware(httpRequest) as HttpRequest
    
            if (!httpRequest) {
                return
            }
        }
    
        let httpResponse = await fetch(httpRequest) as HttpResponse<Response>
    
        for (const responseMiddleware of this?.options?.responseMiddlewares || []) {
            httpResponse = await responseMiddleware(httpResponse) as HttpResponse<Response>
    
            if (!httpResponse) {
                return
            }
        }
    
        return httpResponse
    }

    get<Response>(path: string, options: HttpClientMethodOptions = {}): Promise<HttpResponse<Response>> {
        const requestOptions = resolveRequestOptions(this, 'GET', options)
        return this.call(resolveRequestUrl(path, requestOptions), requestOptions)
    }

    post<Response>(path: string, body: any, options: HttpClientMethodOptions = {}): Promise<HttpResponse<Response>> {
        const requestOptions = resolveRequestOptions(this, 'POST', options, body)
        return this.call(resolveRequestUrl(path, requestOptions), requestOptions)
    }

    put<Response>(path: string, body: any, options: HttpClientMethodOptions = {}): Promise<HttpResponse<Response>> {
        const requestOptions = resolveRequestOptions(this, 'PUT', options, body)
        return this.call(resolveRequestUrl(path, requestOptions), requestOptions)
    }

    patch<Response>(path: string, body: any, options: HttpClientMethodOptions = {}): Promise<HttpResponse<Response>> {
        const requestOptions = resolveRequestOptions(this, 'PATCH', options, body)
        return this.call(resolveRequestUrl(path, requestOptions), requestOptions)
    }

    delete<Response>(path: string, options: HttpClientMethodOptions = {}): Promise<HttpResponse<Response>> {
        const requestOptions = resolveRequestOptions(this, 'DELETE', options)
        return this.call(resolveRequestUrl(path, requestOptions), requestOptions)
    }
}
