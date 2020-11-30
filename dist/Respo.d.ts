export default Respo;
declare class Respo {
    constructor(props: any);
    md_width: any;
    lg_width: any;
    xs_col: any;
    md_col: any;
    lg_col: any;
    state: {
        width: string;
    };
    myRef: any;
    resizeObserver: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
