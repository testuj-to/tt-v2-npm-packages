
const path = require('path')
const fs = require('fs')

const args = require('minimist')(process.argv.slice(2))

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
    const packageJsonPath = args.pkg || path.resolve(__dirname, 'package.json')
    const rootPath = path.parse(packageJsonPath).dir

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

    const cssPaths = deepListCSSPaths(path.join(rootPath, 'src'))

    for (const cssPath of cssPaths) {
        console.log('Copying CSS file', cssPath)

        fs.copyFileSync(cssPath, path.join('build/packages', packageJson.name, cssPath))
    }
}

main()
