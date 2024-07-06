
export const hasWindow = new Function(`
try {
    return this === window;
} catch(err) {
    return false;
}
`);

export const hasBuffer = new Function(`
try {
    return typeof Buffer === 'function';
} catch(err) {
    return false;
}
`);
