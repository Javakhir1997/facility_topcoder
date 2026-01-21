import React, {useEffect} from 'react';
import FocusLock from 'react-focus-lock';
import MD from 'rodal';
import 'rodal/lib/rodal.css';
import classes from "./styles.module.scss"
import {Times} from "@app/assets";
import {createPortal} from "react-dom";

const customStyles = {
    maxHeight: "98vh",
    maxWidth: "98vw",
    width: "40rem",
    height: "20rem"
}

interface Props {
    animation: "zoom" | 'fade' | 'flip' | 'door' | 'rotate' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
    visible: boolean
    title?: string
    times?: boolean
    children?: React.ReactNode
    onClose?: () => void
    styles?: React.CSSProperties
}

const Modal = (
    {
        animation = 'zoom',
        title = "",
        visible = false,
        children,
        onClose,
        times = true,
        styles
    }: Props
) => {

    useEffect(() => {
        const body = document.querySelector("body") as HTMLBodyElement
        if (!visible) {
            body.style.overflow = "auto"
        } else {
            body.style.overflow = "hidden"
        }
    }, [visible])

    return (
        createPortal(
            <FocusLock>
                <MD
                    visible={visible}
                    onClose={onClose}
                    animation={animation}
                    customStyles={{...customStyles, ...styles}}
                    showCloseButton={false}
                    closeMaskOnClick={false}
                >
                    <div className={classes.root}>
                        {
                            times &&
                            <>
                                <div className={classes.times}>
                                    <button onClick={onClose}>
                                        <Times/>
                                    </button>
                                </div>
                                {
                                    !!title && <p className={classes.title}>{title}</p>
                                }
                            </>
                        }
                        {children}
                    </div>
                </MD>
            </FocusLock>,
            document.getElementById("modal") as HTMLElement
        )
    )
}

export default Modal;