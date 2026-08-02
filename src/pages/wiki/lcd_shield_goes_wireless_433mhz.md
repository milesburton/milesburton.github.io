---
layout: ../../layouts/Layout.astro
title: LCD Shield Goes Wireless 433Mhz
---

# LCD Shield Goes Wireless 433Mhz

## Contents

* [1 Introduction](#introduction)
* [2 The Kit](#the-kit)
* [3 The Libraries](#the-libraries)
* [4 Prototype One](#prototype-one)
  * [5 The Code](#the-code)
* [6 Future ideas](#future-ideas)

## Introduction
Upon reciept of a couple 433Mhz kits from Seeedstudio I was struggling to think of something useful to do with them (Oh come on, they were cheap ;)). At the moment I've been sitting on an [Async-labs WiShield](http://asynclabs.com/store?page=shop.product_details&flypage=flypage.tpl&product_id=17&category_id=6) but can't bring myself to use it for any "prototype" applications - it cost more than the MCU!.

So what to do? ...What to do? Well I recently built a [Arduino Homebrew LCD Shield](/wiki/arduino_homebrew_lcd_shield/). What would be more cool than a entirely wireless LCD?!

## The Kit
[China] [433Mhz RF Kit](http://www.seeedstudio.com/depot/433mhz-rf-link-kit-p-127.html?zenid=018acaf067a10d6fa5f4ebcc711ee267) ~$4 + delivery [$7]

2xArduino - I'm using a Seeeduino AtMega168 & a Freeduino AtMega 328 for this prototype. One becomes the host for the LCD Shield, the other provides transmitter to ping your messages.

LCD Shield (Read above)

Various hookup wire

## The Libraries
[VirtualWire Library](http://milesburton.com/wiki/index.php?title=Arduino_RF_Kit_Library_-_Get_your_Arduino_talking_over_the_air) - Provides a well engineered approach to transmitting and recieving data over these low cost devices. I wont go into detail as it is VERY well documented, infact one of the best I've seen.

[LCD4Bit Library](http://milesburton.com/downloads/Arduino/LCD4Bit.zip) - Refer to my guide on the [Arduino Homebrew LCD Shield](/wiki/arduino_homebrew_lcd_shield/) for more details.
## Prototype One
![ArduinoWirelessLCD Prototype1b](/wiki-media/ArduinoWirelessLCD_Prototype1b.jpg)

![ArduinoWirelessLCD Prototype1](/wiki-media/ArduinoWirelessLCD_Prototype1.jpg)

Very simply, a small application on the desktop pc listens for string sent over the serial port and sends those messages across VirutalWire to the reciever. The reciever decodes the messages and outputs to the LCD using the LCD4Bit library.

[As you can see in this video](http://download.milesburton.com/Arduino/WirelessLCD/VIDEO_012.mp4) it's buggy, very buggy. I know what's going on, basically VirtualWire uses a UDP style packet. Ordering is not implied and nothing is guarenteed to be delivered. Unless we send a message under the maximum packet size, chances are it'll be garbled. The fix for this isn't quite as easy and I'll look into this for my second prototype.

### The Code
If there is interest I'll upload the source code. It's so close the examples found in the VirtualWire library (fixed for Arduino IDE 0015/16 above) that it shouldn't take you a moment to write.

## Future ideas
After investigating the problems and potential for these devices I'd like to create a wireless Rainbowduino. Imagine ultra cheap intelligent lights, anywhere you like!
