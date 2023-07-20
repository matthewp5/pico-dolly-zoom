# pico-dolly-zoom

## Introduction

This repository contains code for a [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/) microcontroller running [Kaluma.js](https://kalumajs.org/). The code operates two servos to control zoom and focus for a camera lens, creating the 'dolly zoom' camera shot (example below).

![Example of ‘dolly-zoom’ camera shot from Jaws (1975).](https://media.tenor.com/aGjB0c7wgOYAAAAC/jaws-dolly.gif)

*Example of ‘dolly-zoom’ camera shot from Jaws (1975).*

## Project Background

The 'dolly-zoom' shot is a notorious technique in cinema that is frequently employed to depict a character's sudden realisation or a significant turning point. In the example above from the film Jaws, it captures the moment when Martin Brody becomes aware of a deadly shark attack.

Executing a 'dolly-zoom' shot necessitates the involvement of at least three crew members: one to handle the zoom adjustment, another to control the focus, and a third to operate the camera dolly for forward movement.

<img src="https://github.com/matthewp5/pico-dolly-zoom/assets/77885910/60b2e79f-d050-476e-8a94-698fbfd8eb83" width="512" />

*Behind-the-scenes photo of the Jaws example above. Cinematographer Bill Butler is aided by 4 members of crew to achieve the iconic shot.*

By utilising a microcontroller, we can automate the zoom and focus aspects of the 'dolly-zoom' shot, achieving professional results without the need for additional crew members. This is the idea behind the project.

### Equipment and set-up

The following equipment is used to run the servos and attach them to the camera:

- Raspberry Pi Pico
- 2x MG996R 180° servo
- 2x Servo bracket for 15mm rod
- 2x 56 tooth gear for servo
- Battery Holder 3xAA with MicroUSB  (to power the Pico)
- Battery Holder 4xAA with jumper header wires (to power the servos)
- Lots and lots of jumper cables

You can see this equipment used in the set-up photo below:

<img src="https://github.com/matthewp5/pico-dolly-zoom/assets/77885910/c61744f0-54d1-4e11-b8d1-52451847762d" width="512" />

*The system uses servos that are mounted using 3D-printed brackets. These brackets securely attach to the 15mm rails located beneath the camera, which is a standard component in filmmaking equipment.*

### Calibration

The code is currently calibrated for a Sigma 18-35mm lens moving forward on a 60cm track. To calibrate to a different lens and distance, the `fromDegrees`, `toDegrees`, and `duration` arguments cant be altered for the `rotate` function(s) in the `index.js` file.

## Example

You can see an example of the device in action in the GIF below, which is an excerpt from a short film I made!

![Example](https://github.com/matthewp5/pico-dolly-zoom/assets/77885910/5686159f-13e5-4965-9c1d-55993189fe72)

*The effect is far less pronounced on a 60cm rail but still adds emphasis to the shot.*

## Further improvements

This movement could be automated even further by utilising an ultrasonic distance sensor and doing the following:

1. Measure the distance in real-time between the camera and the subject using the ultrasonic distance sensor.
2. Integrate the distance measurements obtained from the ultrasonic sensor into the zoom and focus adjustment mechanism.

As a starting point, the `US100.js` file included in the repository to gather readings from the US100 ultrasonic distance sensor.
