---
layout: ../../layouts/Layout.astro
title: URM37 Ultrasonic Distance Measurement Library
---

# URM37 Ultrasonic Distance Measurement Library

<p class="wiki-date">Earliest known revision <time datetime="2012-05-06T18:14:16Z">6 May 2012</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Purpose](#purpose)
* [3 Library Features](#library-features)
* [4 Download](#download)
  * [5 Latest](#latest)
  * [6 History](#history)
* [7 URM37 Setup](#urm37-setup)
* [8 Limitations](#limitations)
* [9 Commands](#commands)
* [10 Installation](#installation)
* [11 Contributors](#contributors)
* [12 Technical](#technical)
* [13 License](#license)
* [14 Roadmap](#roadmap)
* [15 Bugs](#bugs)
* [16 Links](#links)

## Introduction
DFRobot have produced a fantastic little Ultra Sonic Distance Measurement device which provides industrial precision. Though a bit of a pain to setup initally, it's ideal for devices such as the [Arduino](/wiki/arduino/).

![Urm37](/wiki-media/Urm37.jpg)

## Purpose
So what's the purpose of the URM37 Library? 

Sadly I have yet to come across any reusable code for the Arduino, all the examples I've seen rely on nasty inline code with various MCU blocking code which generally makes it far harder to develop seemless programs. The example code by DFRobot (In the Far-East) uses the hardware UART/Serial ports on the Arduino which ties up useful ports and can cause problems when you upload code to your device. My library is supposed to avoid these problems for you!

## Library Features
- All the nasty code is hidden away from innocent eyes. All functionality can be accessed through simple object-oriented messages.
- No blocking! You can call any of the URMSerial methods as often as you like, only a single request will ever be sent. This means you can safely use any methods within your loop code without any extra checks
- One message to rule them all.  You may generically use the two main functions and process the result depending on the measurement recieved (*this'll make sense later)
- Support for multiple sensors! You are only limited by the number of pins you have at your disposal (Digital Out/In)

## Download
### Latest
Github: https://github.com/milesburton/URM37

### History
- 2.0.0 Includes servo support, read/write to EEPROM and reduced memory consumption [Download](http://download.milesburton.com/Arduino/URM37/URM37_2.0.zip)
Miguel Sanchez has suggested the following patch to the main example sketch. URM37 2.0 Patch

- 0.5 Provides functionality for distance measurement only. [Download](http://milesburton.com/downloads/Arduino/URM37/arduino.rar)

- 1.0 Introduces both temperature and distance commands generically [Download](http://milesburton.com/downloads/Arduino/URM37/URM37_V1.0.rar)

- 1.5.0 Code refactored and now includes a RequestMeasurementWithTimeout option which blocks until it receives a value. [Download](http://download.milesburton.com/Arduino/URM37/URM37_1.5.0.zip)

## URM37 Setup
Before you wire anything up, dependant on the version you have make sure the two jumpers to the right hand side of the device are set to **TTL mode**. You'll also find a secondary jumper on the left hand side, you must break this connection or you may damage your device.

The 9 outputs (1 through 9) on the back of the device. If you lay the URM37 with the transducers face-down with the pins facing towards you pin 1 is on the right hand side. If you look carefully it has a square embossed on the PCB. Be careful to wire it up carefully, the last thing you want to do is send 5v down the data channel and fry both your Arduino and URM37.

For your reference, TTL pins 9-8 should be wired to Arduino pins 2-3 for the example sketch to work. Wire URM37 pin 1 and 7 to VCC (5v) with pin 2 going to ground.

The URM37 has a VCC (5v Power) and PWR_ON (Enable device) pin. My theory is (unless your running on battery power), you may aswell provide VCC to both of these pins and save a couple of outputs on your Arduino. Infact, for this library to work you must either provide your own initalisation code or wire these pins to VCC. For your information, these are pins 1 and 7.

It may seem misleading but pin 8 (RXD) and 9 (TXD) should be mapped to your selected Arduino TX and RX ports on a digital output. You want to send data to the URM37 recieve port (Arduino TX > URM37 RX) and, conversly, the Arduino should *listen* for data transmitted from the URM37 (URM37 TX > Arduino RX). There is no risk if you get these the wrong way around.

## Limitations
- You may send multiple measurement "types" (For example Distance and Temperature) to the device but it may cause problems if the serial buffer on the URM37 and Arduino become saturated. I would suggest you avoid this possibility.
- No support (at the moment) for powering and enabling the device. I assume you wire both to VCC (5v).
- I am not entirely sure what value is returned by the temperature command (more on this later)

## Commands
- void:begin(rx, tx, baud) - This must be the first command to be called within your code. RX represents your "virtual" serial receive power and TX is your transmission port. baud should be set to 9200.
- bool:hasReading()* - You may call this to see whether the device has a reading. The getMeasurement method will *always* call this aswell to avoid crashing.
- void:requestMeasurement(measurementType)* - measurementType is an integer. Distance is 1, Temperature is 2. I would suggest defining these per my example code
- int:getMeasurement(populateThisValue)* - Returns a measurement type. In addition to the above, if an error occured 3 is returned whilst 4 represents not ready. Populate this value is passed by reference, this
- int:requestMeasurementOrTimeout(measurementType, populateThisValue)* - Return measurement type. Block till timeout or has value
means it will be populated by the method and you may use it when the method has finished executing (it will *always* initalise it for you)

Methods marked with an astrix(*) may be called as often as required. It has no affect on the library. For example, the following code is entirely valid. I would suggest you follow the provided examples for good practise.

## Installation
This installation is based on the Arduino 0.17 IDE version (see [Arduino](/wiki/arduino/) to download the IDE)

Find the installation folder where "arduino-0017" resides. [Unrar](http://rarlabs.com) the above file to arduino-0017\\hardware\\libraries\\URM37 

(in arduino-0019 : move the file to arduino-0019/libraries/URM37)

Load up the Arduino 'processing' IDE and [navigate](http://milesburton.com/downloads/arduino/um37/loadUpLibrary.jpg) to the examples directory. I have provided 3 examples. The Hardware Serial example is purely available for reference, this code was originally provided by DF-Robot and should help you understand how this library works. The second two examples, TemperatureBySoftwareSerial and DistanceBySoftwareSerial explain the basic functionality in this library.

I would suggest you investigate the library itself and understand how it works with the examples. That'll give you a foot up and describe what's going on! - Enjoy

Under Linux there is problem while using URMSerial.h, resulting in the following error:
 arduino-0019/libraries/URM37/URMSerial.h:41:28: fatal error: hardwareSerial.h: No such file or directory compilation terminated.

To fix this: Change in URMSerial.h on line 41: hardwareSerial.h to HardwareSerial.h

## Contributors
If you're interested in contributing to this library, please contact me

## Technical
This library is founded on the [NewSoftwareSerial](http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1233298805/60) library. Their fantastic work has made this library possible. I'd like to extend my thanks to those developers.

We [MnetCS] have made a couple of small additions to the NewSoftwareSerial (NSS) library, which is included with our library, to allow us to dynamically instance any number of virtual-serial objects. The Arduino (128/328) only has one set of UART/Serial ports (0,1) which is shared by the IDE to write to the Arduino. NSS can emulate a serial port at the cost of some speed.

Our branch of the NSS includes a New and Delete operator which manually allocates and initalises the memory required for a new instance. Hopefully the NSS team will include this modification in their future libraries. 

Please be aware, we have included the library for the moment. In future iterations we may rely on the bundled copy.

## License
 URM 37 Control Library Version 1.5.0

 Author: Miles Burton, <Email removed for privacy reasons>

 Copyright (c) 2009 Miles Burton All Rights Reserved

 This library is free software; you can redistribute it and/or

 modify it under the terms of the GNU Lesser General Public

 License as published by the Free Software Foundation; either

 version 2.1 of the License, or (at your option) any later version.

 This library is distributed in the hope that it will be useful,

 but WITHOUT ANY WARRANTY; without even the implied warranty of

 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU

 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public

 License along with this library; if not, write to the Free Software

 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

In addition, this library is not intended for COMMERICAL USE. Do not reproduce this code without the correct references and credit. The URM37 library is copyrighted Miles Burton 2009 and MnetCS 2009.

## Roadmap
- Introduce Servo channel and control

- Use interrupts and inversion of control (IOC) to "callback" when a measurement is recieved

- Fix bugs

## Bugs
Code seems to "stall" and never receives confirmation. 
This sporadic bug seems to be caused by the way NewSoftwareSerial listens for data on the receive port. I am considering how to handle this emergent problem at the moment. The short term solution appears to be to forceReset the booleans protecting the requestMeasurement method. By allowing additional commands to be sent, we can re-request the "lost" message. This bug may also be seen if a serial message is corrupted.

If you find any bugs or have any suggestions please drop me a line at tmcsmiles^at^gmail dot^com

## Links
[Arduino Homepage](http://arduino.cc) 

[URM37 Datasheet](http://download.milesburton.com/Arduino/URM37/URM3.2_Mannual_Rev2.pdf)
