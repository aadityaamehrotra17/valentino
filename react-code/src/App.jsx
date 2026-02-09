import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [showPopup, setShowPopup] = useState(false)
  const noButtonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (noButtonRef.current) {
      const buttonRect = noButtonRef.current.getBoundingClientRect()
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2
      
      const distanceX = e.clientX - buttonCenterX
      const distanceY = e.clientY - buttonCenterY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
      if (distance < 150) {
        const angle = Math.atan2(distanceY, distanceX)
        const moveDistance = 150 - distance
        
        const newX = noButtonPos.x - Math.cos(angle) * moveDistance
        const newY = noButtonPos.y - Math.sin(angle) * moveDistance
        
        const maxX = window.innerWidth / 2 - buttonRect.width
        const maxY = window.innerHeight / 2 - buttonRect.height
        
        setNoButtonPos({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        })
      }
    }
  }

  const handleYesClick = () => {
    setShowPopup(true)
  }

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <h1 className="question">Will you be my Valentine?</h1>
      <div className="buttons">
        <button className="bubble yes-bubble" onClick={handleYesClick}>YES</button>
        <button 
          ref={noButtonRef}
          className="bubble no-bubble"
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: 'none'
          }}
        >
          NO
        </button>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="popup-message">YAYYYYY!!! See you on the 14th 😘</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
