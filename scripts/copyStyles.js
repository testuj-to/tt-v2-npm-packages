
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

exports.copyStyles = (options = {
    src: null,
    dest: null,
}) => {
    const cssPaths = deepListCSSPaths(options.src)

    for (const cssPath of cssPaths) {
        console.log('Copying CSS file', cssPath)

        fs.copyFileSync(cssPath, path.join(options.dest, cssPath))
    }
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

    exports.copyStyles({
        src: path.join(rootPath, 'src'),
        dest: path.join('build', packageJson.name),
    })
}

if (require.main === module) {
    main()
}
