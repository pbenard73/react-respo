import Pixel from'./Respo'

function App() {
  return (
    <div className="Appa">
	<div style={{width:'50vw'}}>	

	  <Pixel container md={500} lg={604}>
		<Pixel xs={12} md={6} lg={3}>
	  		<p style={{background:'green'}}>content 1</p>
	  	</Pixel>
		<Pixel xs={12} md={3} lg={3}>
	  		<p style={{background:'red'}}>content 2</p>
	  	</Pixel>
		<Pixel xs={12} md={3} lg={6}>
	  		<p style={{background:'cyan'}}>content 3</p>
	  	</Pixel>
	  </Pixel>
	  </div>
    </div>
  )
}

export default App;
