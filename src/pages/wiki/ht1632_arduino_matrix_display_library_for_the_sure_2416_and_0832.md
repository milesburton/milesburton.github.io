---
layout: ../../layouts/Layout.astro
title: HT1632 Arduino "Matrix Display" Library for the Sure 2416 and 0832
---

# HT1632 Arduino "Matrix Display" Library for the Sure 2416 and 0832

<p class="wiki-date">Earliest known revision <time datetime="2012-06-25T14:00:40Z">25 Jun 2012</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Library](#library)
  * [3 Installation](#installation)
  * [4 Latest](#latest)
  * [5 Archive](#archive)
  * [6 Change Log](#change-log)
* [7 Contributors](#contributors)
* [8 Example](#example)
* [9 TODO](#todo)
* [10 Troubleshooting](#troubleshooting)
* [11 Projects](#projects)
* [12 Media](#media)
* [13 Datasheet](#datasheet)

## Introduction
The reasonably low cost Sure Electronics 2416 has the simple HT1632 controller. This panel has one defining benefit aside from cost, you can cascade up to 4 panels to create all kinds of effects.

If you're interested in purchasing a board and are in the UK check out [Mnet:Hardware](http://www.mnethardware.co.uk/displays/led-matrices/sure-2416-24x16-display-for-arduino)

## Library
The DisplayMatrix library is designed to drive the **RED** Sure-Electronics 24x16 display (DE-DP016). This library makes it easy to cascade multiple displays so you can build really large panels for a reasonable price!

### Installation
You'll need Arduino IDE 0017 or 0018 to use this Library.

Just unzip and drop the library into arduino-0018/libraries/MatrixDisplay. Then simple navigate to the various examples through the Arduino IDE.

**Green displays** 
Iván Lalaguna Alcaine has provided an simple but effective patch for green displays. 

### Latest
https://github.com/milesburton/HT1632 - 0832 Displays

[MatrixDisplay 2.01 for 0832 displays](http://download.milesburton.com/Arduino/Sure2416/MatrixDisplay_201B_0832Version.zip) - Matrix Display 2.01 for 0832 Displays

### Archive
28/11/2010 - [MatrixDisplay 2.00 for 1624 displays](http://download.milesburton.com/Arduino/Sure2416/MatrixDisplay_200.zip) - Fully re-written with multi-device support.

20/04/2010 - [MatrixDisplay for 0832 displays](http://download.milesburton.com/Arduino/Sure2416/MatrixDisplay_200B_0832Version.zip) - Same as MatrixDisplay 200 but for the 08x32 display

20/01/2010 - [Sure2416 1.00](http://download.milesburton.com/Arduino/Sure2416/Sure2416_100.zip) - The first official release*

- I did not write the original code for this release, I purely put it in library form, re-factored a little and added examples. A full re-write is coming soon (including support for 0832 displays)

### Change Log
2.01 (0832) - Martin Raynsford spotted a couple of mistakes. Failing to properly boundary check on XYToIndex and an "off-by-one" comparison mistakes within the getDispNum. Thanks Martin!

2.0 (1624) - A fully rewritten library with multi-display support

1.0 - Essentially a re-factor and collation of various methods and functions found on the web.

## Contributors
If you want to contribute please send your changes to me ;) [Related Work and Contact](/wiki/related_work_and_contact/). There's plenty of code within the MatrixDisplay library which has been borrowed from around the web, thanks everyone for opening up your source!

## Example
The following code has been taken from the "Simple" example in MatrixDisplay 2.00. It's designed to show you some of the basic functions of the library and how to use it.

<pre class="brush:cpp">
1. include "MatrixDisplay.h"
1. include "DisplayToolbox.h"

// Easy to use function
1. define setMaster(dispNum, CSPin) initDisplay(dispNum,CSPin,true)
1. define setSlave(dispNum, CSPin) initDisplay(dispNum,CSPin,false)

// 4 = Number of displays
// Data = 10
// WR == 11
// False - we dont need a shadow buffer for this example. saves 50% memory!

// Init Matrix
MatrixDisplay disp(4,11,10, false);
// Pass a copy of the display into the toolbox
DisplayToolbox toolbox(&disp);

// Prepare boundaries
uint8_t X_MAX = 0;
uint8_t Y_MAX = 0;

void setup() {
  Serial.begin(9600); 

  // Fetch bounds
  X_MAX = disp.getDisplayCount() * (disp.getDisplayWidth()-1)+1;
  Y_MAX = disp.getDisplayHeight();
  
  // Prepare displays
  // The first number represents how the buffer/display is stored in memory. Could be useful for reorganising the displays or matching the physical layout
  // The number is a array index and is sequential from 0. You can't use 4-8. You must use the numbers 0-4
// The second number represents the "CS" pin (ie: CS1, CS2, CS3, CS4) this controls which panel is enabled at any one time. 
  disp.setMaster(0,4);
  disp.setSlave(1,5);
  disp.setSlave(2,6);
  disp.setSlave(3,7);
}

void loop()
{
 /*
  The MatrixDisplay library treats each display individually. As a result you can set
  each display by it's seperate coordinates. For example:
  
  disp.setPixel(0, 5, 10, 1);
  
   This sets display 0 (which you defined above)
   Coordinate x = 5
   Coordinate Y = 10
   Turn the LEDs on = 1 (0 for off)
 
  Alternatively you may wish to use the ToolBox. The toolbox assumes that each of your displays 
  are set out horizontally. Display 0 is the first through n. Using the toolbox you can access the display as 
  if it were on big virtual display. For example:
  
  toolbox.setPixel(5, 46, 1);
  
  Coordinate x = 5
  Coordinate y = 46 (notice that's a virtual coordinate, larger than 23)
  Turn the Leds on = 1 (0 for off)
  
  Once you have set the pixels you'd like on. You need to sync the displays (basically write the buffer to the device).
  
  disp.syncDisplays();
  
  Alternatively there's a few tricks you can use. If you sync the displays, the ENTIRE buffer is written out - that is hugely slow (comparatively). 
  It may more efficient to write each pixel as you go. For example:
  
  Just as shown above but you can add a "paint" argument. If you set this to true the library will write the pixel straight to the display.
  You wont need to use disp.syncDisplays(); if you don't want to.
  toolbox.setPixel(5, 46, 1, true);
 */

 // Write directly to the display
 for(int y=0; y < Y_MAX; ++y)
 {
  for(int x = 0; x< X_MAX; ++x)
  {
   toolbox.setPixel(x, y, 1, true); // Lets write straight to the display. 
  }
 }
 
 delay(2000); // Wait two seconds
 
 // Okay lets clear the buffer
 disp.clear();
 // ...and write the result to the displays
 disp.syncDisplays();
 
 // Lets use syncDisplays now
  // Write directly to the display
 for(int y=0; y < Y_MAX; ++y)
 {
  for(int x = 0; x< X_MAX; ++x)
  {
   toolbox.setPixel(x, y, 1); // Notice we've discarded the "true". This means we're no longer writing to the display directly
  }
 }
 
 // Now we've written to the back buffer, lets write out the result to the display
 disp.syncDisplays(); 
 
 // Now we're here. Why don't we try out another simple function. SetBrightness
 for(int i=0; i<16; ++i) // The displays have 15 different brightness settings
 {
  // This will set the brightness for ALL displays
  toolbox.setBrightness(i);
  // Alternatively you could set them individually
  // disp.setBrightness(displayNumber, i);
   delay(200); // Let's wait a bit or you'll miss it!
 }
 
 
 
 // Okay lets clear the buffer
 disp.clear();
 // ...and write the result to the displays
 disp.syncDisplays();
 
 // We're all done. let's start looping
}
</pre>

## TODO
Improve the efficiency with a "dirty column" bit-field.

Release version with Green display and 0832 support (they have a different pixel mapping)

## Troubleshooting
If you are using any MCU besides the AtMega328 you may need to change the "bitBlast" method of MatrixDisplay.cpp. Change the called function to digitalWrite which takes advantage of the inbuild port selection/write

## Projects
[Sure 2416 Displaying CPU Graph via Arduino](/wiki/sure_2416_displaying_cpu_graph_via_arduino/)

[Sure 2416 Running Pong via Arduino](/wiki/sure_2416_running_pong_via_arduino/)

## Media
<videoflash>AFtPh0hDrj8</videoflash>

<videoflash>6q-f8Qcw2Ig</videoflash>

<videoflash>mjVNhtP1Md4</videoflash>

<videoflash>HHoP3apRylQ</videoflash>

## Datasheet
[2416 Datasheet](http://download.milesburton.com/Arduino/Sure2416/DE-DP016.pdf)

[0832 Datasheet](http://download.milesburton.com/Arduino/Sure2416/DE-DP105_Ver1.0_EN.pdf)

[Code from Sure-Electronics](http://download.milesburton.com/Arduino/Sure2416/Code2416.pdf)
