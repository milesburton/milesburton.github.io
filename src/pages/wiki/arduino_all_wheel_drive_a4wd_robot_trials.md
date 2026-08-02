---
layout: ../../layouts/Layout.astro
title: Arduino All-Wheel-Drive (A4WD) Robot Trials
---

# Arduino All-Wheel-Drive (A4WD) Robot Trials

<p class="wiki-date">Earliest known revision <time datetime="2009-11-08T19:15:19Z">8 Nov 2009</time></p>

## Contents

* [1 Review](#review)
  * [2 Summary](#summary)
  * [3 My Thoughts](#my-thoughts)
* [4 Media](#media)

## Review
### Summary
#### Good Points
- Fantastic build quality
- Plenty of space for both sensors and hardware
- Easy to add additional layers
- Very powerful motors which can provide a surprisingly amount of speed
- Cheap, cheap!

#### Bad Points
- Battery pack is a nightmare to get to
- Be careful of reverse current when you move the Robot. It'll generate power the wrong way through your MCU!
- Brackets are a pain to get hold of (read: expensive)
- No way to add wheel encoders easily

### My Thoughts
Below are some early shots of my experiences with the DF-Robot AWD from YeRobot. So far it's been great, a fantastic & versatile platform. I've coupled the chassis with two sharp sensors which have been mounted to the front and back of the robot. The main sensor (which also provides single servo & temperature control) is a URM37, which is used to provide positional correction, whilst the Sharp sensors provide continual *sanity* checking. For those of you wondering, I believe you can pick-up brackets for the Sharp sensors but sadly they are quite expensive, ActiveRobots has them in the UK for about £8(inc) per piece.

The Arduino 4WD has a surprising number of miscellaneous holes and mount for your components. It would be nice to see a list of suggest components for those mounts so you can build a highly effective robot. I've upgraded the robot to include two additional sensors, a photo-resister and an adapted led mouse to provide position information.

Power is definitely an issue when you move away from your house outlets. The single on-board battery holder (6xAA) is more than sufficient for an Arduino and a couple of sensors; You'll get about 10-15 minutes of normal usage. I did however find a second battery pack a necessity when I install and use the pan-tilt mechanism. The sudden draw in power can cause the Romeo to reset and it's generally not healthy to draw to much power from a single source. 

The Romeo (Review [Arduino Clone - Romeo Robotics Board](/wiki/arduino_clone_romeo_robotics_board/)) - which is an amazing board (if lacking memory) provides several power inputs, one of which is dedicated for servos. I found the many power outputs to be particularly useful for powering various sensors, strictly they're intended for powering servos (etc) but I saw no harm in re-purposing them for my other devices ;).

When I can get hold of a dremel I'd like to bore a hole in the bottom of the robot so the mouse sensor can be mounted to detect the position but that's a little drastic for the moment! One handy feature will be an RF transceiver which can be used to control the robot - like a remote control car - or relay sensor data to another machine.

That's all for now, let me know if you have any questions! 

-Miles

## Media
Base with components:

![ArduinoAWD Base](/wiki-media/ArduinoAWD_Base.JPG)

Comparison against "net-top"

![ArduinoAWD Base Comparison](/wiki-media/ArduinoAWD_Base_Comparison.JPG)

The upper level of the AWD

![Arduino 4WD MCUShelf2](/wiki-media/Arduino_4WD_MCUShelf2.JPG)

Close up of the Romeo for reference

![Romeo](/wiki-media/Romeo.JPG)

AWD with extra battery pack, Pan+Tilt mechanism and custom URM37 sensor mount.

![ArduinoAWD Loaded](/wiki-media/ArduinoAWD_Loaded.JPG)

Same as above

![ArduinoAWD Loaded3](/wiki-media/ArduinoAWD_Loaded3.JPG)

AWD with DF-Robot Mega and servo shield (from YeRobot) mounted without upper panel

![ArduinoAWDBase Mega](/wiki-media/ArduinoAWDBase_Mega.JPG)

With LED sensor

![Arduino4WD MouseSensor](/wiki-media/Arduino4WD_MouseSensor.JPG)

..another shot

![Arduino4WD MouseSensor2](/wiki-media/Arduino4WD_MouseSensor2.JPG)
