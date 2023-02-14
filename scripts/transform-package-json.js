
const path = require('path')
const fs = require('fs')

const args = require('minimist')(process.argv.slice(2))

const main = () => {
    const input = args.i || args.in || path.resolve(__dirname, 'package.json')
    const output = args.o || args.out || path.resolve(__dirname, 'package.publish.json')

    const inputJson = JSON.parse(fs.readFileSync(input))

    const { devDependencies, ...outputJson } = inputJson

    fs.writeFileSync(output, JSON.stringify(outputJson, null, 4))
}

main()
