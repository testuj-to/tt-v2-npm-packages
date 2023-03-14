
const path = require('path')
const fs = require('fs')

exports.listPackages = () => {
    const basePath = path.resolve(__dirname, '../packages/@testuj.to')
    const packages = []

    for (const pkg of fs.readdirSync(basePath)) {
        try {
            const packageJson = require(path.join(basePath, pkg, 'package.json'))

            if (!/^\@testuj\.to\//.test(packageJson.name)) {
                continue
            }

            packages.push(packageJson.name)
        } catch (err) {
            // console.error('Failed to load package:', package)
            continue
        }
    }

    return packages
}

const main = () => {
    const args = require('minimist')(process.argv.slice(2))

    const packages = exports.listPackages()

    if (args['one-line']) {
        console.log(packages.join(' '))
        return
    }

    for (const pkg of packages) {
        console.log(pkg)
    }
}

if (require.main === module) {
    main()
}
