---
layout: ../../layouts/Layout.astro
title: RainbowDuino Via Serial
---

# RainbowDuino Via Serial

<p class="wiki-date">Earliest known revision <time datetime="2009-06-15T15:08:26Z">15 Jun 2009</time></p>

## Contents

* [1 Introduction](#introduction)
  * [2 The Videos](#the-videos)
* [3 The Kit](#the-kit)
* [4 The Library](#the-library)
* [5 Getting Started](#getting-started)
* [6 Troubleshooting](#troubleshooting)
* [7 Comments](#comments)

## Introduction
The Rainbowduino is a brand new, Arduino compatible, LED driver. It has two rows of PWM outputs which can be accessed through a shift-register. 

After receiving my prototype board from Seeedstudio I eagerly wired up the I2C port to find nothing, that's right, nothing. At the time of writing I'm not quite sure what's wrong. As with all new products, especially prototypes like mine, problems are bound to come up.

Despite my efforts I couldn't get it working. Whilst hunting around I found the onboard AtMega168 was pre-loaded with the Arduino bootloader, with a little trial-and-error I used a Freeduino board to program the MCU. This led me to a sudden thought, if we know the UART ports work (UART is connected to the Freeduino RS232 chip which, in turn, is shared with Arduino ports 0 and 1) then why not use those same ports to interface with the Rainbowduino! 

Poking around the Seeeduino example code it seemed pretty easy to switch out the 'TwoWire' library in place of the serial library provided the base Arduino framework.

![RainbowDuino Marketing](/wiki-media/RainbowDuino_Marketing.jpg)

### The Videos
[Short version](http://download.milesburton.com/Arduino/RainbowDuino/RainbowDuino_Serial2.3gp)  1.4Meg - Please note: this has a 3GP extention.

[Long Version](http://download.milesburton.com/Arduino/RainbowDuino/RainbowDuino_Serial1.3gp) 11.5Meg - Please note: this has a 3GP extention.

## The Kit
[China] [RainbowDuino](http://www.seeedstudio.com/depot/rainbowduino-led-driver-platform-plug-and-shine-p-371.html) $20~ (+delivery) - The Rainbowduino mainboard

[China] [8x8 RGB Matrix](http://www.seeedstudio.com/depot/60mm-square-88-led-matrix-super-bright-rgb-p-113.html) $24~ (+delivery) - A plug and play board which sits on the Rainbowduino

[UK] [Freeduino board](http://earthshinedesign.co.uk/?page_id=3&category=3&product_id=9) £16-20 (Including delivery) - You need a Arduino with a removable chip

## The Library
[RainbowDuino V1.1 Serial 0.5](http://download.milesburton.com/Arduino/RainbowDuino/RainbowV1.1Serial0.5.rar) - Prototype RainbowDuino code (Buggy)

## Getting Started
**Step 1: Preparing the Rainbowduino - Remove the chip**

Remove the PDIP chip from the Arduino. Be VERY careful how you carry out the removable as you can damage the chip pins. I would suggest you ease each side up a little till it comes out.

**Step 2: Preparing the Rainbowduino - Get wired**

Grab some jumper leads and wire the Rainbowduino as follows

From the top down (ie going towards the power connector)
- [7] I2C Data (AKA Arduino Analog 1) *
- [6] I2C Clock (AKA Arduino Analog 0)*
- [5] GND*
- [4] VCC (+5V)
- [3] TXD (Serial Transmit, AKA Arduino Pin 1)
- [2] RXD (Serial Recieve, AKA Arduino Pin 0)
- [1] GND
- [0] DTR (Rainbowduino reset, wire this to the RST pin on your Freeduino)

- To be confirmed, not applicable for this stage

Pin 3 and 2 are TBC, feel free to switch them around if it doesn't work first time. It is unlikely you will damage the Arduino if you make a mistake.

**Step 3: Unzip The Library**

The easy part, unzip the library into your Arduino documents folder. This is usually under your home or 'my documents' folder.

**Step 4:  Writing the Rainbowduino Sketch**

Fire up the Arduino IDE and navigate to Sketchbook > RainbowV1.1Serial0.5 > RainbowDuino. 

When you connect the Freeduino correctly it should register like any other Arduino you have used. Make sure you select the correct chip type (AtMega 168) and the associated serial port. Upload the sketch as usual.

![RainbowDuino Chip](/wiki-media/RainbowDuino_Chip.JPG)

**Step 5: Write the master sketch**

Restore your Freeduino (or just use another Arduino) and upload the SeeedMaster sketch. Sketchbook > RainbowV1.1Serial0.5 > SeeedMaster.

**Step 6: Bringing it all together**

At this point you're ready to fire up the boards. Connect the TXD and RXD port (above) on the RainbowDuino to your Arduino, connect the power cables and fire up the host Arduino.

Congratulations, it should be working! Feel free to experiment with what you've learned.

## Troubleshooting
1 - Don't forget to disconnect the serial cables on the Rainbowduino when you are programming the host board. If you don't you risk a corrupt sketch! You've been warned.

2 - If nothing is happening, reverse the RXD/TXD cables. It's easy to get them the wrong way around.

3 - It's all garbled! The above is prototype code. If your host board is reset during transmittion the RainbowDuino made start displaying incorrect characters. It's an easy fix, just reset the RainbowDuino!

## Comments
The above library has been created as a stop-gap solution till Seeedstudio release the full version. It does not contain the handshake code and is liable to output incorrect data if the host board is reset.
