
import React, { createElement, useCallback, memo, useState, useEffect, useMemo } from 'react'
import { addons, types } from '@storybook/addons'
import { styled } from '@storybook/theming'
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components'

const PARAM_KEY = 'ttContext'

const ColorIcon = styled.span(({ background, marginRight }) => ({
    borderRadius: '1rem',
    display: 'block',
    height: '1rem',
    width: '1rem',
    background,
    marginRight,
}), ({ theme }) => ({
    boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`,
}))

const ToolbarItem = memo(() => {
    const [ presets, setPresets ] = useState([])
    const [ activePreset, setActivePreset ] = useState(null)

    const preset = useMemo(() => {
        return presets[activePreset] ? presets[activePreset] : null
    }, [ presets, activePreset ])

    const handlePresets = useCallback((presets) => {
        setPresets(presets)
    }, [])

    const handleActivePreset = useCallback((activePreset) => {
        setActivePreset(activePreset)
    }, [])

    useEffect(() => {
        const channel = addons.getChannel()

        channel.on('tt-context:presets', handlePresets)
        channel.on('tt-context:active-preset', handleActivePreset)

        channel.emit('tt-context:read-presets')
        channel.emit('tt-context:read-active-preset')
    }, [])

    const handlePresetChange = useCallback((preset, index) => {
        const channel = addons.getChannel()
        channel.emit('tt-context:apply-preset', index)
        setActivePreset(index)
    }, [])

    return createElement(
        WithTooltip,
        {
            placement: 'bottom',
            trigger: 'click',
            closeOnClick: true,
            closeOnOutsideClick: true,
            tooltip: () => {
                return createElement(TooltipLinkList, {
                    links: (presets || []).map((preset, index) => ({
                        id: `${index}${preset.name}`,
                        title: preset.name,
                        right: (preset && preset.theme && preset.theme.colorScheme && preset.theme.colorScheme.primary) ?
                            createElement(ColorIcon, { background: preset.theme.colorScheme.primary }) : undefined,
                        active: index === activePreset,
                        onClick() {
                            handlePresetChange(preset, index)
                        },
                    })),
                })
            },
        },
        createElement(IconButton, {
            key: 'preset',
            title: 'Change the preset',
        },
            (preset && preset.theme && preset.theme.colorScheme && preset.theme.colorScheme.primary) ?
                createElement(ColorIcon, { key: 'primarycolor', background: preset.theme.colorScheme.primary, style: { marginRight: '0.4rem' } }) :
                createElement(Icons, { key: 'icon', icon: 'paintbrush', style: { marginRight: '0.4rem' } }),
            (preset && preset.name) ? preset.name : 'Preset',
        ),
    )
})

addons.register(PARAM_KEY, () => {
    addons.add(PARAM_KEY, {
        title: 'Change the preset',
        type: types.TOOL,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: ({ active }) => {
            return createElement(ToolbarItem, {})
        },
    })
})
