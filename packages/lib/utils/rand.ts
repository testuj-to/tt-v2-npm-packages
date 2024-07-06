
export const generateAlphaNumericString = (length: number = 8) => {
    let output = '';

    for (const index of Array(length).fill(0).map((_, index) => index)) {
        const pool = Math.random().toString(36).substring(2);
        output += pool.charAt(Math.floor(Math.random() * pool.length));
    }

    return output;
}
