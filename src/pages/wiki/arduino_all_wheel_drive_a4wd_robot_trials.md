---
layout: ../../layouts/Layout.astro
title: Arduino All-Wheel-Drive (A4WD) Robot Trials
---

# Arduino All-Wheel-Drive (A4WD) Robot Trials

## Contents

* [1 Review](#review)

  * [1.1 Summary](#summary)

    * [1.1.1 Good Points](#good-points)
    * [1.1.2 Bad Points](#bad-points)
  * [1.2 My Thoughts](#my-thoughts)
* [2 Media](#media)

## Review

### Summary

#### Good Points

* Fantastic build quality
* Plenty of space for both sensors and hardware
* Easy to add additional layers
* Very powerful motors which can provide a surprisingly amount of speed
* Cheap, cheap!

#### Bad Points

* Battery pack is a nightmare to get to
* Be careful of reverse current when you move the Robot. It'll generate power the wrong way through your MCU!
* Brackets are a pain to get hold of (read: expensive)
* No way to add wheel encoders easily

### My Thoughts

Below are some early shots of my experiences with the DF-Robot AWD from YeRobot. So far it's been great, a fantastic & versatile platform. I've coupled the chassis with two sharp sensors which have been mounted to the front and back of the robot. The main sensor (which also provides single servo & temperature control) is a URM37, which is used to provide positional correction, whilst the Sharp sensors provide continual *sanity* checking. For those of you wondering, I believe you can pick-up brackets for the Sharp sensors but sadly they are quite expensive, ActiveRobots has them in the UK for about £8(inc) per piece.

The Arduino 4WD has a surprising number of miscellaneous holes and mount for your components. It would be nice to see a list of suggest components for those mounts so you can build a highly effective robot. I've upgraded the robot to include two additional sensors, a photo-resister and an adapted led mouse to provide position information.

Power is definitely an issue when you move away from your house outlets. The single on-board battery holder (6xAA) is more than sufficient for an Arduino and a couple of sensors; You'll get about 10-15 minutes of normal usage. I did however find a second battery pack a necessity when I install and use the pan-tilt mechanism. The sudden draw in power can cause the Romeo to reset and it's generally not healthy to draw to much power from a single source.

The Romeo (Review Arduino Clone - Romeo Robotics Board *(coming soon)*) - which is an amazing board (if lacking memory) provides several power inputs, one of which is dedicated for servos. I found the many power outputs to be particularly useful for powering various sensors, strictly they're intended for powering servos (etc) but I saw no harm in re-purposing them for my other devices ;).

When I can get hold of a dremel I'd like to bore a hole in the bottom of the robot so the mouse sensor can be mounted to detect the position but that's a little drastic for the moment! One handy feature will be an RF transceiver which can be used to control the robot - like a remote control car - or relay sensor data to another machine.

That's all for now, let me know if you have any questions!

\-Miles

## Media

Base with components:

<span class="image-placeholder" title="ArduinoAWD Base.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

Comparison against "net-top"

<span class="image-placeholder" title="ArduinoAWD Base Comparison.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

The upper level of the AWD

<span class="image-placeholder" title="Arduino 4WD MCUShelf2.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

Close up of the Romeo for reference

<span class="image-placeholder" title="Romeo.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

AWD with extra battery pack, Pan+Tilt mechanism and custom URM37 sensor mount.

<span class="image-placeholder" title="ArduinoAWD Loaded.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

Same as above

<span class="image-placeholder" title="ArduinoAWD Loaded3.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

AWD with DF-Robot Mega and servo shield (from YeRobot) mounted without upper panel

<span class="image-placeholder" title="ArduinoAWDBase Mega.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

With LED sensor

<span class="image-placeholder" title="Arduino4WD MouseSensor.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

..another shot

<span class="image-placeholder" title="Arduino4WD MouseSensor2.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>
