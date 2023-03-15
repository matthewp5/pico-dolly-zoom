const { PWM } = require('pwm')

const MG966R_MIN_DUTY = 0.05
const MG966R_MAX_DUTY = 0.1
const MG966R_FREQUENCY = 50 // 50hz
const MG966R_MAX_ROTATION_DEGREES = 180
// Change in duty cycle per 1 degree of rotation
const MG966R_DUTY_DETLA_PER_DEGREE =
  (MG966R_MAX_DUTY - MG966R_MIN_DUTY) / MG966R_MAX_ROTATION_DEGREES

/**
 * A simple interface for using the [TowerPro MG966R 180 servo motor](https://thepihut.com/products/towerpro-servo-motor-mg996r-metal-gear-180).
 */
export class MG966R {
  /**
   * @param {number} pin - GPIO pin number for the servo.
   */
  constructor(pin) {
    this.pin = pin
    this.pwm = new PWM(this.pin, MG966R_FREQUENCY, MG966R_MIN_DUTY)
  }

  /**
   * Rotates the servo motor between two specified degree angles.
   *
   * @param {number} fromDegrees - Angle you want the rotation to start in degrees.
   * @param {number} toDegrees - Angle you want the rotation to end in degrees.
   * @param {number} duration  - Duration of the rotation in ms.
   * @param {number} [rotationIncrements=100] - Number of rotation increments you want the servo motor to perform during the rotation. The higher the number, the smoother the rotation.
   */
  rotate(fromDegrees, toDegrees, duration, rotationIncrements = 100) {
    this.pwm.start()
    this.pwm.setDuty(this.degreesToDuty(fromDegrees))

    const delta = toDegrees - fromDegrees
    const rotationIncrementDegrees = delta / rotationIncrements
    const rotationIncrementDuration = duration / rotationIncrements
    const isReverseRotation = fromDegrees > toDegrees

    const intervalId = setInterval(() => {
      const currentDegrees = this.dutyToDegrees(this.pwm.getDuty())

      if (
        (isReverseRotation && currentDegrees <= toDegrees) ||
        (!isReverseRotation && currentDegrees >= toDegrees)
      ) {
        this.pwm.stop()
        clearInterval(intervalId)
        return
      }

      const newDegrees = currentDegrees + rotationIncrementDegrees
      this.pwm.setDuty(this.degreesToDuty(newDegrees))
    }, rotationIncrementDuration)
  }

  /**
   * Instantly rotates the servo to a specified degree angle.
   *
   * @param {number} degrees - Angle to rotate the servo to in degrees.
   */
  setServoRotation(degrees) {
    this.pwm.start()
    this.pwm.setDuty(this.degreesToDuty(degrees))
    setTimeout(() => this.pwm.stop(), 500)
  }

  dutyToDegrees = (duty) =>
    +((duty - MG966R_MIN_DUTY) / MG966R_DUTY_DETLA_PER_DEGREE).toFixed(5)

  degreesToDuty = (degrees) =>
    +(MG966R_MIN_DUTY + MG966R_DUTY_DETLA_PER_DEGREE * degrees).toFixed(5)
}
