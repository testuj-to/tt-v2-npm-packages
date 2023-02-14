
PACKAGES := auth api react
PUBLISH_PREFIXED_PACKAGES := $(foreach NAME,$(PACKAGES),"publish-$(NAME)")

.PHONY: build publish $(PACKAGES) $(PUBLISH_PREFIXED_PACKAGES)

$(PACKAGES):
	@echo "Building NPM package '$@'"

	cd $@ && \
		make build

$(PUBLISH_PREFIXED_PACKAGES):
	$(eval NAME := $(shell echo "$@" | sed 's/publish-//'))

	@echo "Publishing NPM package '@testuj.to/$(NAME)'"

build: $(PACKAGES)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are built 🎉"

publish: $(PUBLISH_PREFIXED_PACKAGES)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are published 🎉"
