import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

export const Button = ({
  text,
  type = 'default',
  fullSize = false,
  ...props
}) => {
  const buttonClass = styles[type] || styles.default
  const fullSizeClass = fullSize ? styles.fullSize : styles.normalSize

  const [buttonSizeClass, setButtonSizeClass] = useState('')

  useEffect(() => {
    const button = document.querySelector(`.${styles.button}`)
    if (button) {
      const buttonHeight = button.clientHeight

      if (buttonHeight < 360) {
        setButtonSizeClass(styles.smallButton)
      } else if (buttonHeight >= 360 && buttonHeight < 480) {
        setButtonSizeClass(styles.mediumButton)
      } else {
        setButtonSizeClass(styles.largeButton)
      }
    }
  }, [])

  return (
    <button
      className={`${buttonSizeClass} ${buttonClass} ${styles.button} ${fullSizeClass}`}
      {...props}
    >
      <div className={styles.sakura}>
        <span>{text}</span>
      </div>
      <span style={{ opacity: 0 }}>{text}</span>
    </button>
  )
}
