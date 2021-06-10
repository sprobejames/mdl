import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'

function App() {
  const [layers, setLayers] = useState([])
  const [canvas, setCanvas] = useState()
  const [bgImage, setBgImage] = useState()

  useEffect(() => {
    setCanvas(document.getElementById('canvas'))

    const imgInput = document.getElementById('bg-image')

    imgInput.addEventListener('change', function(e) {
      const url = window.URL.createObjectURL(imgInput.files[0])
      setBgImage(url)
    })
  }, [])

  let container = {x1: 0, y1: 0, x2: 0, y2: 0}

  const handleMouseDown = (e) => {
    container = { x1: e.offsetX, y1: e.offsetY, x2: 0, y2: 0 }
    // track mouse movement
    canvas.addEventListener('mousemove', handleMouseMove)
    // handle selection end
    canvas.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    container = {...container, ...{ x2: e.offsetX, y2: e.offsetY }}

    let selection = document.getElementById('layer-hl')
    selection.style.color = "blue"
    selection.style.top = container.y1 + "px"
    selection.style.left = container.x1 + "px"
    selection.style.width = (e.offsetX - container.x1) + "px"
    selection.style.height = (e.offsetY - container.y1) + "px"
  }

  const handleMouseUp = (e) => {
    canvas.removeEventListener('mousedown', handleMouseDown, false)
    canvas.removeEventListener('mousemove', handleMouseMove, false)
    container = {...container, ...{ x2: e.offsetX, y2: e.offsetY }}
    let newArr = [...layers]
    newArr.push(container)
    setLayers(newArr)
    canvas.removeEventListener('mouseup', handleMouseUp, false)
  }

  const handleSelectLayerArea = () => {
    canvas.addEventListener('mousedown', handleMouseDown)
  }

  const handleBackgroundSelect = () => {
    document.getElementById('bg-image').click()
  }

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen">
        <div
          className="h-auto bg-gray-50 p-16"
          style={{ width: 'calc(100% - 320px)' }}
        >
          <div
            id="canvas"
            className="w-full bg-cover bg-no-repeat bg-center bg-white relative shadow-lg"
            style={ bgImage ? { backgroundImage: `url(${bgImage})`, height: "768px" } : { height: "768px" }}
          >
            <div id="layer-hl" className="bg-blue-200 border-2 border-blue-200 absolute" style={{ opacity:0.8 }}></div>

            {
              layers.map((layer, key) => {
                return (
                  <div key={key} className="bg-blue-200 border-2 border-blue-200 absolute" style={{ top: layer.y1, left: layer.x1, width: (layer.x2 - layer.x1), height: (layer.y2 - layer.y1), zIndex: (key + 1), opacity: "0.8"}}>
                    <div className="absolute left-2 top-2 text-xs rounded-full w-6 h-6 items-center flex justify-center bg-white text-center">{ (key + 1) }</div>
                    <button className="absolute right-2 w-6 h-6 items-center flex justify-center top-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div id="sidebar" className="p-4 border-l border-gray-200" style={{ width: "320px" }}>
          <div className="mb-8">
            <button className="border border-gray-900 rounded-lg py-2 px-4 font-bold text-sm" onClick={handleBackgroundSelect}>Change Background Image</button>
            <input type="file" id="bg-image" className="hidden" accept="image/png, image/gif, image/jpeg" />
          </div>
          <div>
            <button className="bg-gray-900 rounded-lg py-2 px-4 text-white font-bold text-sm" onClick={handleSelectLayerArea}>Add Range</button>

            <div className="w-full h-48 flex-col space-y-4 overflow-y-auto bg-gray-50 border border-gray-100 mt-4 p-4">
              {
                layers.map((layer, key) => {
                  return (
                    <div key={key} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                        <h3 className="text-sm">Range { (key + 1) }</h3>
                      </div>

                      <div>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                        </svg>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
