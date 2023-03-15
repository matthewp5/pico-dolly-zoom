const { Button } = require('button')
const { MG966R } = require('./MG966R')

const zoomServo = new MG966R(14)
const focusServo = new MG966R(15)
const dollyZoomButton = new Button(16, { mode: INPUT_PULLDOWN })
const resetButton = new Button(17, { mode: INPUT_PULLDOWN })

resetButton.on('click', () => {
  zoomServo.setServoRotation(0)
  focusServo.setServoRotation(180)
})

dollyZoomButton.on('click', () => {
  zoomServo.rotate(0, 150, 2000)
  focusServo.rotate(180, 130, 2000)
})
