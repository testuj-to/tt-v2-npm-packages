
PATH_BUILD := build
PATH_DIST := dist

NPM_INCLUDE := .gitignore .npmignore README.md

BUNDLE_ENV := \
	PATH_BUILD=$(PATH_BUILD) \
	PATH_DIST=$(PATH_DIST)

.PHONY: clean build publish

clean:
	rm -Rf $(PATH_BUILD) || true
	rm -Rf $(PATH_DIST) || true

build: clean
	npm i
	npm run build:ts
	$(BUNDLE_ENV) npm run build:bundle

	cp $(NPM_INCLUDE) $(PATH_DIST)

	node ../../scripts/transform-package-json.js \
		-i package.json \
		-o $(PATH_DIST)/package.json

publish: build
	npm publish --access public
