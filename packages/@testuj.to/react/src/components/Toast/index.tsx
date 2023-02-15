
import { createContext, useState, ReactNode, useContext, useCallback } from 'react'
import cx from 'classnames'
import {
    Provider,
    Root,
    Title,
    Description,
    Action,
    Viewport,
} from '@radix-ui/react-toast'

import './styles.css'

const toastContext = createContext<{
    open(options: ToastProps): () => void
}>({ open: () => () => {} })

export const useToast = () =>
    useContext(toastContext)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [ toasts, setToasts ] = useState<ToastProps[]>([])

    const handleClose = useCallback((key: string) => {
        setToasts(toasts => toasts.filter(toast => toast?.key !== key))
    }, [])

    const handleOpen = useCallback((props: ToastProps) => {
        const key = Math.random().toString(36).substring(2)

        setToasts(toasts => [ ...toasts, {
            key,
            onClose: () =>
                handleClose(key),
            ...props,
        } ])

        return () =>
            handleClose(key)
    }, [])

    return (
        <Provider swipeDirection='right'>
            <toastContext.Provider
                value={{
                    open: handleOpen,
                }}
            >
                {children}
                {toasts.map(toast =>
                    <Toast {...toast} />)}
            </toastContext.Provider>
        </Provider>
    )
}

export interface ToastProps {
    key?: string
    title: string
    description?: ReactNode
    timeoutMs?: number
    onClose?()
}

export const Toast = ({ title, description, timeoutMs, onClose }: ToastProps) => {
    return (
        <>
            <Root
                className={cx('tt-toast-container')}
                duration={timeoutMs}
                onOpenChange={isOpen => {
                    if (typeof onClose === 'function' && !isOpen) {
                        onClose()
                    }
                }}
                open
            >
                <Title className={cx('tt-toast-title')}>
                    {title}
                </Title>
                {description && (
                    <Description className={cx('tt-toast-description')}>
                        {description}
                    </Description>
                )}
                {/* <Action className="ToastAction" asChild altText="Goto schedule to undo">
                    <button className="Button small green">Undo</button>
                </Action> */}
            </Root>
            <Viewport className={cx('tt-toast-viewport')} />
        </>
    )
}
