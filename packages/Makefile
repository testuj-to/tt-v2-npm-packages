
PACKAGES := @testuj.to/auth @testuj.to/api @testuj.to/react
PUBLISH_PREFIXED_PACKAGES := $(foreach NAME,$(PACKAGES),"publish--$(NAME)")

.PHONY: build publish $(PACKAGES) $(PUBLISH_PREFIXED_PACKAGES)

$(PACKAGES):
	@echo "Building NPM package '$@'"

	cd $@ && \
		make build

$(PUBLISH_PREFIXED_PACKAGES):
	$(eval NAME := $(shell echo "$@" | sed 's/publish--//'))

	@echo "Publishing NPM package '$(NAME)'"

	$(eval CURRENT_VERSION := $(shell cd $(NAME) && npm pkg get version | sed 's/"//g'))
	$(eval LATEST_VERSION := $(shell npm show $(NAME) version))

	@if [ "$(CURRENT_VERSION)" = "$(LATEST_VERSION)" ]; then \
		echo "A version '$(CURRENT_VERSION)' of NPM package '$(NAME)' is already published. Skipping..."; \
	else \
		cd $(NAME) && \
			make publish; \
	fi

build: $(PACKAGES)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are built 🎉"

publish: $(PUBLISH_PREFIXED_PACKAGES)
	@echo "🙌 🙌 🙌"
	@echo "All NPM packages are published 🎉"
