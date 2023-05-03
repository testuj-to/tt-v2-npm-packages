
BUILD := build
DIST := dist

INCLUDE := README.md .npmignore .gitignore src/locales

.PHONY: default clean build build-storybook publish

default:

clean:
	rm -Rf $(BUILD) || true
	rm -Rf $(DIST) || true

build: clean
	npm i

	npm run build:ts
	node ../../../scripts/copyStyles.js \
		--pkg package.json

	npm run build:bundle

	cp -r $(INCLUDE) $(DIST)

	node ../../../scripts/preparePackageJson.js \
		-i package.json \
		-o $(DIST)/package.json

# build-storybook:
# 	npm i
# 	npm run docs:build

publish:
	cd $(DIST) && \
		npm publish --access public
