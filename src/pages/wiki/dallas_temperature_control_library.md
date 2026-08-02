---
layout: ../../layouts/Layout.astro
title: Dallas Temperature Control Library
---

# Dallas Temperature Control Library

## Contents

* [1 Introduction](#introduction)
* [2 The Library](#the-library)
  * [3 Supported Devices](#supported-devices)
* [4 Example](#example)
* [5 Download](#download)
  * [6 Code/Library](#codelibrary)
  * [7 Github](#github)
  * [8 Datasheet](#datasheet)
* [9 Troubleshooting](#troubleshooting)
* [10 Media](#media)
* [11 License](#license)

**For the most up to date information please checkout our Github: https://github.com/milesburton/Arduino-Temperature-Control-Library**

## Introduction
The DS18B20 is a very small thermometer which can be easily hooked into the Arduino MCU through any digital input! It requires very little in the way of additional support, a couple of resistors and some hookup cables and you're set to go.

For more information on the DS18B20 check out [Maxim-IC](http://www.maxim-ic.com/quick_view2.cfm?qv_pk=2812).

## The Library
This library is derived from some good work by the Arduino community. This library is, for the most part, purely a refactor version of the existing library. I found the original to be somewhat of a pain to implement and, like most Arduino libraries, code-seperation sucks.

The intention of this Library is to build on Jim Studt work and make it quick and easy for beginners to get started.

If you are interested [Beginning Arduino](https://www.amazon.co.uk/gp/product/1430232404/ref=olp_product_details?ie=UTF8&me=&seller=) covers this library in-depth for new users. 

### Supported Devices
- DS18B20

- DS1822

- DS18S20*

- DS1820

Additional devices can be implemented through different temperature strategies. Refer to the code for more information.

- Problems reported on this series

## Example
The TCL library is intended to be simple and intuitive to use. You only need 3 fundamental commands for a single IC. (Following code taken from "Simple.pde" 3.1.0PRE)
<pre class="brush:cpp">
1. include <OneWire.h>
1. include <DallasTemperature.h>

// Data wire is plugged into pin 2 on the Arduino
1. define ONE_WIRE_BUS 2

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

void setup(void)
{
  // start serial port
  Serial.begin(9600);
  Serial.println("Dallas Temperature IC Control Library Demo");

  // Start up the library
  sensors.begin(); // IC Default 9 bit. If you have troubles consider upping it 12. Ups the delay giving the IC more time to process the temperature measurement
}

void loop(void)
{ 
  // call sensors.requestTemperatures() to issue a global temperature 
  // request to all devices on the bus
  Serial.print("Requesting temperatures...");
  sensors.requestTemperatures(); // Send the command to get temperatures
  Serial.println("DONE");
  
  Serial.print("Temperature for Device 1 is: ");
  Serial.print(sensors.getTempCByIndex(0)); // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  
}
</pre>

## Download
### Code/Library
### Github
Github will always have the latest code, however you can also access the TCL from the Arduino Library manager
https://github.com/milesburton/Arduino-Temperature-Control-Library - A snapshot release. Please request commit access to contribute.

### Datasheet
[DS18B20 Datasheet](http://datasheets.maxim-ic.com/en/ds/DS18B20.pdf) - One of the better datasheets I've seen. Contains all the technical details you need to setup your IC

## Troubleshooting
I've had several reports of issues where the temperature IC will return a odd result. This can be indicative of insufficient power. I have found after about 3 ICs a parasite power set-up can fail to provide enough current to produce an accurate result. The best way to fix this problem is to use the dedicated power pin (VCC). If you must use parasite mode, try dropping the pull-up resistance or reducing the frequency at which you poll the IC.

Each IC has a small capacitor which must be charged before you request a temperature. If this capacitor has insufficient charge the results may be invalid.

## Media
![DS18B20 on Arduino](/wiki-media/DS18B20_on_Arduino.jpg)

![TCL Breakout1](/wiki-media/TCL_Breakout1.JPG)

![TCL Breakout2](/wiki-media/TCL_Breakout2.JPG)

![Schematic-dallas-18s20](/wiki-media/Schematic-dallas-18s20.gif)

![Pinouts ds18s20](/wiki-media/Pinouts_ds18s20.gif)

![TCL310 On AtMega8](/wiki-media/TCL310_On_AtMega8.JPG)

## License
https://github.com/milesburton/Arduino-Temperature-Control-Library/blob/master/LICENSE
