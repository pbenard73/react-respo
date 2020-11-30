import React from "react"

class Respo extends React.Component {
    constructor(props) {
        super(props)

        this.md_width = props.container !== undefined && props.md !== undefined && props.md > 0 ? props.md : 769
        this.lg_width =
            props.container !== undefined && props.lg !== undefined && props.lg > 0 && props.lg > this.md_width
                ? props.lg
                : 1024
        this.xs_col = props.xs === undefined || props.xs < 0 || props.xs > 12 ? 12 : props.xs
        this.md_col = props.md === undefined || props.md < 0 || props.md > 12 ? this.xs_col : props.md
        this.lg_col = props.lg === undefined || props.lg < 0 || props.lg > 12 ? this.md_col : props.lg

        this.state = {
            width: "md",
        }

        this.myRef = React.createRef()

        const self = this
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                let width = entry.contentRect.width
                console.log(width, this.md_width, this.lg_width)

                if (width < this.md_width) {
                    console.log("is inf")
                    self.setState({ width: "xs" }, () => {
                        console.log(this.state)
                    })
                    break
                } else if (width >= this.lg_width) {
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
        const node = this.myRef.current

        this.resizeObserver.observe(node)
    }

    componentWillUnmount() {
        if (this.props.container === undefined) {
            return
        }

        const node = this.myRef.current
        this.resizeObserver.unobserve(node)
    }

    render() {
        if (this.props.container !== undefined) {
            const style = {
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
                <div style={style} ref={this.myRef}>
                    {childrenWithProps}
                </div>
            )
        }

        let width = (this[`${this.props.width}_col`] / 12) * 100 + "%"

        return <div style={{ width }}>{this.props.children}</div>
    }
}

export default Respo
