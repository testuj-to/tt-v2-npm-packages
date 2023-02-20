
PATH_BUILD := build
PATH_DIST := dist

NPM_INCLUDE := .gitignore .npmignore README.md

.PHONY: clean build build-storybook publish

clean:
	rm -Rf $(PATH_BUILD) || true
	rm -Rf $(PATH_DIST) || true

build: clean
	npm i

	npm run build:ts
	node ../../../scripts/copyStyles.js \
		--pkg package.json

	npm run build:bundle

	cp $(NPM_INCLUDE) $(PATH_DIST)

	node ../../../scripts/preparePackageJson.js \
		-i package.json \
		-o $(PATH_DIST)/package.json

# build-storybook:
# 	npm i
# 	npm run docs:build

publish:
	cd $(PATH_DIST) && \
		npm publish --access public
