# React Respo

React responsive depending on container width, based on resizeObserver.

[Demonstration](https://pbenard73.github.io/react-respo/)

## Usage

### Components Switch

```js
import { Respo } from "react-respo"

const App = () => {
  const XsComponent = <p>I'm the XS</p>
  const MdComponent = <p>I'm the MD</p>
  const LgComponent = <p>I'm the LG</p>

  return (
    <Respo
      md={500}
      lg={604}
      xsComponent={XsComponent}
      mdComponent={MdComponent}
      lgComponent={LgComponent}
    />
}
```

### Grid System

```js
import { Respo } from "react-respo"

const App = () => (
    <>
        <Respo container md={500} lg={604}>
            <Respo xs={0} md={6} lg={3}>
                <p>column one</p>
            </Respo>
            <Respo xs={6} md={0} lg={3}>
                <p>column two</p>
            </Respo>
            <Respo xs={6} md={3} lg={3}>
                <p>column three</p>
            </Respo>
            <Respo xs={12} md={3} lg={3}>
                <p>column four</p>
            </Respo>
        </Respo>

        <Respo container wrapper md={500} lg={900}>
            <p style={{ color: "white" }}>
                Hi, just resize this container. The next text will appear or disappear depending the classes{" "}
                <code>show-xs</code>, <code>show-md</code>, <code>show-lg</code>, <code>hidden-xs</code>,{" "}
                <code>hidden-md</code>, <code>hidden-lg</code>
                <ul>
                    <li className='show-xs'>This text is shown only on xs</li>
                    <li className='show-md'>This text is show only on md</li>
                    <li className='show-lg'>This text is shown just on lg</li>
                    <li className='hidden-xs'>This text is hidden on xs</li>
                    <li className='hidden-md'>This text is hidden on md</li>
                    <li className='hidden-lg'>This text is hidden on lg</li>
                </ul>
            </p>
        </Respo>
    </>
)
```

### Params For Grid System

#### Container

The container takes the `md` and `lg` breakpoint. By default `769` and `1024`

It can take the attribute `wrapper` : In this case, the grid system is not provided, but the class utility is available.

#### Children for Grid System

The children take the `xs`, `md` and `lg` properties, corresponding on the rendering size on 12 columns depending on the container width. By default all this value are at `12`
If a value is set to `0` it will be interpreted as `display:none`
