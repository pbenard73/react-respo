import Pixel from "./Respo"
import React from "react"

function App() {
    const Xs = <p>Jsuis XS</p>
    const Md = <p>Jsuis MD</p>
    const Lg = <p>Jsuis LG</p>

    return (
        <div className='Appa'>
            <div style={{ width: "70vw" }}>
                <Pixel container md={500} lg={604}>
                    <Pixel xs={12} md={6} lg={3}>
                        <p style={{ background: "green" }}>content 1</p>
                    </Pixel>
                    <Pixel xs={12} md={3} lg={3}>
                        <p style={{ background: "red" }}>content 2</p>
                    </Pixel>
                    <Pixel xs={12} md={3} lg={6}>
                        <p style={{ background: "cyan" }}>content 3</p>
                    </Pixel>
                </Pixel>
            </div>
            <div style={{ width: "75vw" }}>
                <Pixel
                    md={500}
                    lg={604}
                    xsComponent={Xs}
                    mdComponent={Md}
                    lgComponent={Lg}
                />
            </div>
        </div>
    )
}

export default App
