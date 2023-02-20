
# SCRIPTS_BASE_PATH := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

# define run_script
# 	stdOut = $(shell cd $(SCRIPTS_BASE_PATH) && node $(SCRIPTS_BASE_PATH)$(1).js $(2))

# 	ifdef $(3)
# 		$(3) := $$(stdOut)
# 	endif
# endef
