import React, { useState, useEffect, useRef } from 'react'
import classes from './Modal.module.css'

interface DialogProps {
  animationType: string
  enterAnimation: string
  leaveAnimation: string
  animation: string
  showCloseButton: boolean
  onClose: () => void
  width: number
  height: number
  size: string
  measure: string
  duration: number
  customStyles: React.CSSProperties
  id: string | undefined
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({
  animationType,
  enterAnimation,
  leaveAnimation,
  animation,
  showCloseButton,
  onClose,
  width,
  height,
  size,
  measure,
  duration,
  customStyles,
  id,
  children,
}) => {
  const animationStyle = (animationType === 'enter' ? enterAnimation : leaveAnimation) || animation

  const className = `${classes['modal-dialog']} ${classes[`modal-${animationStyle}-${animationType}`]}`

  const CloseButton = showCloseButton ? (
    <span className={classes['modal-close']} onClick={onClose} tabIndex={0} aria-label='Close modal' />
  ) : null

  switch (size) {
    case 'sm':
      width = 400
      break
    case 'md':
      width = 600
      break
    case 'lg':
      width = 800
      break
    case 'xl':
      width = 1000
      break
    default:
      width = 400
  }

  const style = {
    width: `${width}${measure}`,
    height: `${height}${measure}`,
    animationDuration: `${duration}ms`,
    WebkitAnimationDuration: `${duration}ms`,
  }

  return (
    <div style={{ ...style, ...customStyles }} className={className} id={id}>
      {children}
      {CloseButton}
    </div>
  )
}

interface ModalProps {
  width?: number
  height?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  measure?: string
  backdrop?: boolean
  visible?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  animation?: 'zoom' | 'fade' | 'flip' | 'door' | 'rotate' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  enterAnimation?: string
  leaveAnimation?: string
  duration?: number
  className?: string
  customStyles?: React.CSSProperties
  onClose: () => void
  id?: string
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  width = 400,
  height = 240,
  measure = 'px',
  size = 'sm',
  visible = false,
  backdrop = false,
  closeOnEsc = false,
  showCloseButton = true,
  animation = 'fade',
  enterAnimation = '',
  leaveAnimation = '',
  duration = 300,
  className = '',
  customStyles = {},
  onClose,
  id,
  children,
}) => {
  const [isShow, setIsShow] = useState(false)
  const [animationType, setAnimationType] = useState('leave')
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (visible) {
      enter()
    } else {
      leave()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const enter = () => {
    setIsShow(true)
    setAnimationType('enter')
  }

  const leave = () => {
    setTimeout(() => {
      setIsShow(false)
    }, duration)
    setAnimationType('leave')
  }

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (closeOnEsc && event.keyCode === 27) {
      onClose()
    }
  }

  const style = {
    display: isShow ? '' : 'none',
    animationDuration: `${duration}ms`,
    WebkitAnimationDuration: `${duration}ms`,
  }

  return (
    <div
      style={style}
      className={`${classes.modal} ${classes[`modal-fade-${animationType}`]} ${className}`}
      tabIndex={-1}
      ref={ref}
      onKeyUp={onKeyUp}
    >
      <div className={`${classes['modal-mask']}`} onClick={backdrop ? void 0 : onClose} />
      <Dialog
        animationType={animationType}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
        animation={animation}
        showCloseButton={showCloseButton}
        onClose={onClose}
        width={width}
        height={height}
        size={size}
        measure={measure}
        duration={duration}
        customStyles={customStyles}
        id={id}
      >
        {children}
      </Dialog>
    </div>
  )
}

export const useModal = ({ isOpen }: { isOpen?: boolean } = {}) => {
  const [visible, setVisible] = useState(isOpen || false)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  return {
    open,
    close,
    visible,
  }
}

export default Modal
