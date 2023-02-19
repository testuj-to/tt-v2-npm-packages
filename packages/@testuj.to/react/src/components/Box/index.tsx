
import { type HTMLAttributes } from 'react'
// import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.css'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}
export const Box = ({ ...rest }: BoxProps) => {
    return (
        <div
            {...rest}
            className={cx('tt-box', rest?.className)}
        />
    )
}

// Box.propTypes = {}
