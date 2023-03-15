/**
 * A simple interface for using the [US-100 Ultrasonic Distance Sensor](https://thepihut.com/products/us-100-ultrasonic-distance-sensor-3v-or-5v-logic.
 */
class US100 {
  constructor(triggerPin, echoPin, samples = 5) {
    this.triggerPin = triggerPin
    this.echoPin = echoPin
    this.samples = samples
    pinMode(this.triggerPin, OUTPUT)
    pinMode(this.echoPin, INPUT)
  }

  /**
   * Caclulates the normalised distance between the provided `minDistance` and
   * `maxDistance`.
   *
   * @param {number} minDistance - Minimum distance in mm
   * @param {number} maxDistance - Maximum distance in mm
   */
  getNormalisedDistance(minDistance, maxDistance) {
    const distance = this.getAverageDistanceInMillimeters()
    const clampedDistance = Math.min(
      Math.max(distance, minDistance),
      maxDistance
    )
    const range = maxDistance - minDistance
    return ((clampedDistance - minDistance) / range).toFixed(2)
  }

  getAverageDistanceInMillimeters() {
    const readings = new Array(0)

    for (let i = 0; i < this.samples; i++) {
      const distance = this.getDistanceInMilimeters()
      if (distance) {
        readings.push(distance)
      }
    }

    const sum = readings.reduce((a, b) => Number(a) + Number(b), 0)
    return sum / readings.length || 0
  }

  getDistanceInMilimeters() {
    const pulse = pulseRead(this.echoPin, 1, {
      mode: INPUT,
      startState: HIGH,
      trigger: {
        pin: this.triggerPin,
        startState: LOW,
        interval: [2, 10],
      },
    })

    if (pulse) {
      return (pulse[0] * 0.343) / 2
    }

    return null
  }
}
