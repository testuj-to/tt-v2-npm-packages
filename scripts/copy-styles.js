
const path = require('path')
const fs = require('fs')

const deepListCSSPaths = (basePath) => {
    let cssPaths = []

    for (const name of fs.readdirSync(basePath)) {
        const _path = path.join(basePath, name)
        const stat = fs.statSync(_path)

        if (stat.isFile()) {
            if (/\.css$/.test(_path)) {
                cssPaths.push(_path)
            }

            continue
        } else if (stat.isDirectory()) {
            cssPaths = [
                ...cssPaths,
                ...deepListCSSPaths(_path)
            ]
        }
    }

    return cssPaths
}

const main = () => {
    const args = require('minimist')(process.argv.slice(2))

    if (!args.pkg) {
        throw Error('Missing --pkg option (package.json path)')
    }

    let packageJson
    let rootPath

    try {
        if (!fs.statSync(args.pkg).isFile()) {
            throw Error()
        }

        rootPath = path.parse(args.pkg).dir

        packageJson = JSON.parse(fs.readFileSync(args.pkg))
    } catch (err) {
        throw Error('Invalid package.json: \'' + args.pkg + '\'')
    }

    const cssPaths = deepListCSSPaths(path.join(rootPath, 'src'))

    for (const cssPath of cssPaths) {
        console.log('Copying CSS file', cssPath)

        fs.copyFileSync(cssPath, path.join('build', packageJson.name, cssPath))
    }
}

if (require.main === module) {
    main()
}
