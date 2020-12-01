# React Respo

React responsive depending on container width, based on resizeObserver.

## Usage

```js
import Respo from 'react-respo'

const App = () => (
  <Pixel container md={500} lg={604}>
	<Pixel xs={0} md={6} lg={3}>
		<p>column one</p>
	</Pixel>
	<Pixel xs={6} md={0} lg={3}>
		<p>column two</p>
	</Pixel>
	<Pixel xs={6} md={3} lg={3}>
		<p>column three</p>
	</Pixel>
	<Pixel xs={12} md={3} lg={3}>
		<p>column four</p>
	</Pixel>
  </Pixel>
)
```

## Params

### Container

The container takes the `md` and `lg` breakpoint. By default `769` and `1024`

### Children

The children take the `xs`, `md` and `lg` properties, corresponding on the rendering size on 12 columns depending on the container width. By default all this value are at `12`
If a value is set to `0` it will be interpreted as `display:none`


