
TARGETS := $(shell node ../scripts/listPackages.js --one-line)

PUBLISH_PREFIX := publish--
PUBLISH_TARGETS := $(foreach NAME,$(TARGETS),"$(PUBLISH_PREFIX)$(NAME)")

.PHONY: build publish $(TARGETS) $(PUBLISH_TARGETS)

$(TARGETS):
	@echo "Building NPM package '$@'"

	cd $@ && \
		make build

$(PUBLISH_TARGETS):
	$(eval PACKAGE := $(shell echo "$@" | sed 's/$(PUBLISH_PREFIX)//'))

	@echo "Publishing NPM package '$(PACKAGE)'"

	$(eval CURRENT_VERSION := $(shell cd $(PACKAGE) && npm pkg get version | sed 's/"//g'))
	$(eval LATEST_VERSION := $(shell npm show $(PACKAGE) version))

	@if [ "$(CURRENT_VERSION)" = "$(LATEST_VERSION)" ]; then \
		echo "A version '$(CURRENT_VERSION)' of NPM package '$(PACKAGE)' is already published. Skipping..."; \
	else \
		cd $(PACKAGE) && \
			make publish; \
	fi

build: $(TARGETS)
	@echo "PACKAGES: $(TARGETS)"
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are built 🎉"

publish: $(PUBLISH_TARGETS)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are published 🎉"
