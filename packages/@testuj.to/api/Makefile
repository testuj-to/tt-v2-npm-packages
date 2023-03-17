
BUILD := build
DIST := dist

INCLUDE := README.md .npmignore .gitignore

.PHONY: clean build publish

clean:
	rm -Rf $(BUILD) || true
	rm -Rf $(DIST) || true

build: clean
	npm i
	npm run build:ts
	npm run build:bundle

	cp -r $(INCLUDE) $(DIST)

	node ../../../scripts/preparePackageJson.js \
		-i package.json \
		-o $(DIST)/package.json

publish:
	cd $(DIST) && \
		npm publish --access public
