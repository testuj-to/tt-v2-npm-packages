
import { createElement, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { addons } from '@storybook/addons'
import { useParameter } from '@storybook/manager-api'

import defaultPresets from '../storiesPresets.json'
import { TTContextProvider } from './context'

export const TTContextDecorator = (Story, context) => {
    const presetsRef = useRef(defaultPresets)
    const activePresetRef = useRef(presetsRef.current?.length > 0 ? 0 : null)
    const [ preset, setPreset ] = useState(typeof activePresetRef.current === 'number' ? presetsRef.current[activePresetRef.current] : {})

    useEffect(() => {
        let presets = [ ...defaultPresets ]

        try {
            const presetsJson = JSON.parse(localStorage.getItem('ttcontext:presets'))

            for (const preset of presetsJson) {
                if (preset?.isCustom) {
                    presets.push(preset)
                }
            }
        } catch (err) {}

        let activePreset = presets?.length > 0 ? 0 : null

        const activePresetRaw = localStorage.getItem('ttcontext:activepreset')
        if (activePresetRaw) {
            if (Number(activePresetRaw) < presets?.length) {
                activePreset = Number(activePresetRaw)
            }
        }

        presetsRef.current = presets
        activePresetRef.current = activePreset

        handleReadPresets(presets)
        handleReadActivePreset(activePreset)

        localStorage.setItem('ttcontext:presets', JSON.stringify(presets))
    }, [])

    const handleApplyPreset = useCallback((index: number) => {
        setPreset(presetsRef.current[index])

        localStorage.setItem('ttcontext:activepreset', String(activePresetRef.current))
    }, [])

    const handleReadPresets = useCallback((presets = null) => {
        const channel = addons.getChannel()
        channel.emit('tt-context:presets', presets || presetsRef.current)
    }, [])

    const handleReadActivePreset = useCallback((activePreset = null) => {
        const channel = addons.getChannel()
        channel.emit('tt-context:active-preset', typeof activePreset === 'number' ? activePreset : activePresetRef.current)
    }, [])

    useEffect(() => {
        const channel = addons.getChannel()

        channel.on('tt-context:apply-preset', handleApplyPreset)
        channel.on('tt-context:read-presets', handleReadPresets)
        channel.on('tt-context:read-active-preset', handleReadActivePreset)

        return () => {
            channel.removeListener('tt-context:apply-preset', handleApplyPreset)
            channel.removeListener('tt-context:read-presets', handleReadPresets)
            channel.removeListener('tt-context:read-active-preset', handleReadActivePreset)
        }
    }, [])

    return createElement(
        TTContextProvider,
        preset || {},
        createElement(Story, {}),
    )
}

// export const withTTContext = <Props>(Component: FunctionComponent) => {
//     return (props: Props) => {
//         const presetsRef = useRef(defaultPresets)
//         const activePresetRef = useRef(presetsRef.current?.length > 0 ? 0 : null)
//         const [ preset, setPreset ] = useState(typeof activePresetRef.current === 'number' ? presetsRef.current[activePresetRef.current] : {})

//         useEffect(() => {
//             let presets = [ ...defaultPresets ]

//             try {
//                 const presetsJson = JSON.parse(localStorage.getItem('ttcontext:presets'))

//                 for (const preset of presetsJson) {
//                     if (preset?.isCustom) {
//                         presets.push(preset)
//                     }
//                 }
//             } catch (err) {}

//             let activePreset = presets?.length > 0 ? 0 : null

//             const activePresetRaw = localStorage.getItem('ttcontext:activepreset')
//             if (activePresetRaw) {
//                 if (Number(activePresetRaw) < presets?.length) {
//                     activePreset = Number(activePresetRaw)
//                 }
//             }

//             presetsRef.current = presets
//             activePresetRef.current = activePreset

//             handleReadPresets(presets)
//             handleReadActivePreset(activePreset)

//             localStorage.setItem('ttcontext:presets', JSON.stringify(presets))
//         }, [])

//         const handleApplyPreset = useCallback((index: number) => {
//             setPreset(presetsRef.current[index])

//             localStorage.setItem('ttcontext:activepreset', String(activePresetRef.current))
//         }, [])

//         const handleReadPresets = useCallback((presets = null) => {
//             const channel = addons.getChannel()
//             channel.emit('tt-context:presets', presets || presetsRef.current)
//         }, [])

//         const handleReadActivePreset = useCallback((activePreset = null) => {
//             const channel = addons.getChannel()
//             channel.emit('tt-context:active-preset', typeof activePreset === 'number' ? activePreset : activePresetRef.current)
//         }, [])

//         useEffect(() => {
//             const channel = addons.getChannel()

//             channel.on('tt-context:apply-preset', handleApplyPreset)
//             channel.on('tt-context:read-presets', handleReadPresets)
//             channel.on('tt-context:read-active-preset', handleReadActivePreset)

//             return () => {
//                 channel.removeListener('tt-context:apply-preset', handleApplyPreset)
//                 channel.removeListener('tt-context:read-presets', handleReadPresets)
//                 channel.removeListener('tt-context:read-active-preset', handleReadActivePreset)
//             }
//         }, [])

//         return createElement(
//             TTContextProvider,
//             preset || {},
//             createElement(Component, props),
//         )
//     }
// }
