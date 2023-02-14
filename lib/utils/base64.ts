
import { hasBuffer } from './env'

const encodeProcedures = {
    buffer: (escapedValue: string) => `return Buffer.from('${escapedValue}').toString('base64');`,
    btoa:   (escapedValue: string) => `return btoa('${escapedValue}');`,
}

const decodeProcedures = {
    buffer: (escapedValue: string) => `return Buffer.from('${escapedValue}', 'base64').toString('utf8');`,
    atob:   (escapedValue: string) => `return atob('${escapedValue}');`,
}

export const base64Encode = (value: string) => {
    const escapedValue = (value || '').replace(/\'/g, '\\\'')
    const encodeFunction = hasBuffer() ?
        encodeProcedures.buffer(escapedValue) :
        encodeProcedures.btoa(escapedValue)

    return new Function(encodeFunction)()
}

export const base64Decode = (value: string) => {
    const escapedValue = (value || '').replace(/\'/g, '\\\'')
    const encodeFunction = hasBuffer() ?
        decodeProcedures.buffer(escapedValue) :
        decodeProcedures.atob(escapedValue)

    return new Function(encodeFunction)()
}
