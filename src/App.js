import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [layers, setLayers] = useState([])
  const [canvas, setCanvas] = useState()

  useEffect(() => {
    setCanvas(document.getElementById('canvas'))
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

  return (
    <div className="flex w-full min-h-screen">
      <div id="sidebar" className="w-1/4 p-4">
        <button className="bg-gray-900 rounded-lg py-2 px-4 text-white font-bold" onClick={handleSelectLayerArea}>Add New Layer</button>
      </div>

      <div
        id="canvas"
        className="w-3/4 h-auto bg-gray-50 relative">

        <div id="layer-hl" className="bg-red-100 border-2 border-red-100 absolute"></div>

        {
          layers.map((layer, key) => {
            return (
              <div key={key} className="bg-red-100 border-2 border-red-100 absolute" style={{ top: layer.y1, left: layer.x1, width: (layer.x2 - layer.x1), height: (layer.y2 - layer.y1), zIndex: (key + 1)}} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
