---
layout: ../../layouts/Layout.astro
title: URM37 Ultrasonic Sensor Review
---

# URM37 Ultrasonic Sensor Review

## Contents

* [1 URM37 In Brief](#urm37-in-brief)
* [2 Drawbacks](#drawbacks)
* [3 Summary](#summary)

## URM37 In Brief
Excellent accuracy. The URM37 is pretty easy to interface with the Arduino (especially with my library ;)). It can be a little fiddly to get the wires correctly setup - make sure you take care as you can damage the sensor!

Unlike similar distance measurement devices (for example infrared) the URM37 doesn't suffer from the same level of refraction. The signal spread is particularly handy for robotics projects when you need to build sophisticated detection. I personally find my robot likes to charge at walls when I use a Sharp sensor whereas the URM37 avoids most obstacles very gracefully.

## Drawbacks
The only drawback of sonar based devices is they are a little "slower" than infrared (speed of light vs. speed of sound). As a result you really need to keep it static when you take a measurement or you may have problems.

You may also be surprised at the size of the URM37 vs. the Sharp series of sensors. We're not talking much, approximately twice the size of a sharp sensor (which is about the size of an AA battery), but it can make all the difference if you're using a few.

I would like DF-Robot to drop the price a little bit (so distributors such as YeRobot can pass that saving onto us).

## Summary
In summary I'd definitely recommend the URM37 for applications where you require precision. If you are looking for simple "if near object do X" then you'll be better off saving a few pounds and buying one of the infrared Sharp sensors.
