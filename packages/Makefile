
# include ../scripts/scripts.mk
# $(call run_script,listPackages,"--one-line",PACKAGES)
PACKAGES := $(shell node ../scripts/listPackages.js --one-line)

PUBLISH_PREFIX := publish--
PUBLISH_PREFIXED_PACKAGES := $(foreach NAME,$(PACKAGES),"$(PUBLISH_PREFIX)$(NAME)")

.PHONY: build publish $(PACKAGES) $(PUBLISH_PREFIXED_PACKAGES)

$(PACKAGES):
	@echo "Building NPM package '$@'"

	cd $@ && \
		make build

$(PUBLISH_PREFIXED_PACKAGES):
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

build: $(PACKAGES)
	@echo "PACKAGES: $(PACKAGES)"
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are built 🎉"

publish: $(PUBLISH_PREFIXED_PACKAGES)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are published 🎉"
