import React, { type ReactNode, type ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface VideoPlayerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const VideoPlayer = React.forwardRef<HTMLButtonElement, VideoPlayerProps>(({ ...rest }, ref) => {
    return (
        null
    )
})
