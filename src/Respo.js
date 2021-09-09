import React, { useState, useEffect } from "react"
import "./Respo.scss"

const Respo = props => {
    const isContainerAvailable = breakpoint =>
        props.container !== undefined && props[breakpoint] !== undefined && props[breakpoint] > 0
    const available = (breakpoint, defaultValue) =>
        props[breakpoint] === undefined || props[breakpoint] < 0 || props[breakpoint] > 12 ? defaultValue : props[breakpoint]

    const [md_breakpoint, setMd_breakPoint] = useState(isContainerAvailable("md") === true ? props.md : 769)
    const [lg_breakpoint, setLg_breakPoint] = useState(
        isContainerAvailable("lg") === true && props.lg > md_breakpoint ? props.lg : 1024
    )
    const [xs, setXs] = useState(available("xs", 12))
    const [md, setMd] = useState(available("md", xs))
    const [lg, setLg] = useState(available("lg", md))

    const [width, setWidth] = useState("md")

    const [resizeObserver, setResizeObserver] = useState(
        new ResizeObserver(entries => {
            for (let entry of entries) {
                let containerWidth = entry.contentRect.width
                console.log(containerWidth)
                if (containerWidth < md_breakpoint) {
                    setWidth("xs")
                    break
                } else if (containerWidth >= lg_breakpoint) {
                    setWidth("lg")
                    break
                } else {
                    setWidth("md")
                    break
                }
            }
        })
    )

    const ref = React.createRef()
    const {
        xs: givenXs,
        md: givenMd,
        lg: givenLg,
        container,
        style,
        xsComponent,
        mdComponent,
        lgComponent,
        ...otherProps
    } = props
    const isToggle = mdComponent !== undefined || xsComponent !== undefined || lgComponent !== undefined

    useEffect(() => {
        if (props.container === undefined && isToggle === false) {
            return
        }
        resizeObserver.observe(ref.current)

        return () => {
            resizeObserver.unobserve(ref.current)
        }
    }, [])

    const mergeStyle = givenStyle => {
        if (style === undefined) {
            return givenStyle
        }

        return { ...style, ...givenStyle }
    }

    const isSolo = props.wrapper !== undefined

    if (isToggle === true) {
        if (width === "lg") {
            return (
                <>
                    <h1>{width}</h1>
                    <div {...otherProps} ref={ref}>
                        {lgComponent || mdComponent || xsComponent}
                    </div>
                </>
            )
        }

        if (width === "md") {
            return (
                <>
                    <h1>{width}</h1>
                    <div {...otherProps} ref={ref}>
                        {mdComponent || xsComponent}
                    </div>
                </>
            )
        }

        return (
            <>
                <h1>{width}</h1>
                <div {...otherProps} ref={ref}>
                    {xsComponent}
                </div>
            </>
        )
    }

    if (container !== undefined) {
        let compStyle = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
        }

        const childrenWithProps = React.Children.map(props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { width })
            }

            return child
        })

        return (
            <div {...otherProps} width={width} style={mergeStyle(compStyle)} ref={ref}>
                {isSolo === true ? props.children : childrenWithProps}
            </div>
        )
    }

    const value = props.width === "lg" ? lg : props.width === "md" ? md : xs

    let compStyle = {
        width: (value !== 0 ? (value / 12) * 100 : 0) + "%",
    }

    if (value === 0) {
        compStyle.display = "none"
    }

    return (
        <div {...otherProps} style={mergeStyle(compStyle)}>
            {props.children}
        </div>
    )
}

export default Respo
