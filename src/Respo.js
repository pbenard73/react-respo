import React from "react"
import './Respo.scss'

class Respo extends React.Component {
    constructor(props) {
        super(props)

        const isContainerAvailable = breakpoint =>
            props.container !== undefined && props[breakpoint] !== undefined && props[breakpoint] > 0
        const available = (breakpoint, defaultValue) =>
            props[breakpoint] === undefined || props[breakpoint] < 0 || props[breakpoint] > 12
                ? defaultValue
                : props[breakpoint]

        this.md_b = isContainerAvailable("md") === true ? props.md : 769
        this.lg_b = isContainerAvailable("lg") === true && props.lg > this.md_b ? props.lg : 1024
        this.xs = available("xs", 12)
        this.md = available("md", this.xs)
        this.lg = available("lg", this.md)

        this.state = {
            width: "md",
        }

        this.ref = React.createRef()

        const self = this
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                let width = entry.contentRect.width

                if (width < this.md_b) {
                    self.setState({ width: "xs" })
                    break
                } else if (width >= this.lg_b) {
                    self.setState({ width: "lg" })
                    break
                } else {
                    this.setState({ width: "md" })
                    break
                }
            }
        })
    }

    componentDidMount() {
        if (this.props.container === undefined) {
            return
        }

        this.resizeObserver.observe(this.ref.current)
    }

    componentWillUnmount() {
        if (this.props.container === undefined) {
            return
        }

        this.resizeObserver.unobserve(this.ref.current)
    }

    render() {
        const { xs, md, lg, container, style, ...otherProps } = this.props
        const mergeStyle = givenStyle => {
            if (style === undefined) {
                return givenStyle
            }

            return { ...style, ...givenStyle }
        }

	const isSolo = this.props.wrapper !== undefined

        if (this.props.container !== undefined) {
            let compStyle = {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }

            const childrenWithProps = React.Children.map(this.props.children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { width: this.state.width })
                }
                return child
            })

            return (
                <div {...otherProps} width={this.state.width} style={mergeStyle(compStyle)} ref={this.ref}>
                    {isSolo === true ? this.props.children : childrenWithProps}
                </div>
            )
        }

        const value = this[this.props.width]

        let compStyle = {
            width: (value !== 0 ? (value / 12) * 100 : 0) + "%",
        }

        if (value === 0) {
            compStyle.display = "none"
        }

        return (
            <div {...otherProps} style={mergeStyle(compStyle)}>
                {this.props.children}
            </div>
        )
    }
}

export default Respo
