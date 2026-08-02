---
layout: ../../layouts/Layout.astro
title: USD LCD Display (HD44780) Running on Linux via Arduino
---

# USD LCD Display (HD44780) Running on Linux via Arduino

<p class="wiki-date">Earliest known revision <time datetime="2013-05-02T07:26:57Z">2 May 2013</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Setup Your Arduino (or pass through)](#setup-your-arduino-or-pass-through)

## Introduction
If you've had a chance to look around my site you'll be happy to know that those lucky windows users have LCD Smartie to drive LCD displays. Sadly for those of us on Linux the entire affair gets a little more complex - no fear, hopefully this guide should help.

= Kit list =
- A HD44780 Display (Plug: [MnetHardware LCDs](http://www.mnethardware.co.uk/displays/character-lcds))
- An Arduino or other appropriate MCU (the MCU code is tiny)
- Ubuntu Linux (tested on 10.4, likely work on most flavours)
- Some sort of TTL pass through (this guide will take advantage of the Arduinos FTDI but I have a much cheaper alternative)

= Required packages =
<pre class="brush:bash">
1. You may need to uncomment your /etc/apt/sources.list file to include multiverse and other global repos
sudo apt-get install lcdproc
</pre>

= Setting up Linux =
You'll find the FTDI should be available with the latest 'Nix kernel (2.4+) just plug and go.

<pre class="brush:bash">
ls /dev/serial/by-id
1. A list should appear, hunt for the device which looks somewhat like:
1. FTDI_FT232R_USB_UART_A7007278-if00-port0
</pre>

open up the LCDd.conf file within /etc/LCDd.conf
<pre class="brush:bash">
sudo vi /etc/LCDd.conf
</pre>

Set your driver to: **Driver=hd44780**

Navigate to the [hd44780] (you can use the short cut /[hd44780])

<pre class="brush:bash">
1. Change your ConnectionType to:
1. Select what type of connection. See documentation for types.
ConnectionType=lcdserializer

1. Device of the serial interface [default: /dev/lcd]
Device=/dev/ttyUSB1 #In the example above it could be /dev/serial/by-id/FTDI_FT232R_USB_UART_A7007278-if00-port0

1. Bitrate of the serial port (0 for interface default)
Speed=9600

1. If your display is slow and cannot keep up with the flow of data from
1. LCDd, garbage can appear on the LCDd. Set this delay factor to 2 or 4
1. to increase the delays. Default: 1.
DelayMult=2

1. If you experience occasional garbage on your display you can use this
1. option as workaround. If set to a value bigger than null it forces a
1. full screen refresh <RefreshDiplay> seconds. Default: 0.
RefreshDisplay=1

1. It's worth taking a look through the other settings to see if modifying anything else would be of use.
</pre>

## Setup Your Arduino (or pass through)
As you can see the code is very simple, very little too it. Just convert it to your tool of choice.

Upload the following sketch to your Arduino. Take care to modify the LCD pins as required.
<pre class="brush:cpp">
// include the library code:
1. include <LiquidCrystal.h>

// these constants won't change.  But you can change the size of
// your LCD using them:
const int numRows = 4;
const int numCols = 20;

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 10, 5, 4, 3, 2);
// RS, RW, Enable, 4,5,6,7 (Refer to the back of your LCD for details)

void setup() { 
  Serial.begin(9600);
  // set up the LCD's number of rows and columns: 
  lcd.begin(numRows, numCols);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("LCD Proc pass through. MilesBurton.com");
  lcd.setCursor(0,1);

}

byte serial_getch(){

  int incoming;  
  while (Serial.available()==0){
  }
  // read the incoming byte:
  incoming = Serial.read();

  return (incoming &0xff);
}

void loop(){

  byte rxbyte;
  byte temp;

  rxbyte = serial_getch(); // Fetch byte

  if(rxbyte==0xFE) // If command 
  { 
    lcd.command(serial_getch()); // Pass through
  }
  else{
    lcd.write(rxbyte); //Otherwise just dump it as text
  }
}
</pre>

= Getting it going! =

Fire up the lcdproc ;)
<pre class="brush:bash">
1. Start the daemon
sudo /etc/init.d/LCDd start # or restart

1. Start the client
sudo lcdproc

1. Watch in awe
</pre>

Notes: Ideally the device should be r/w for a specific user to avoid any unnecessary privileges for the lcdproc applications. chmod 777 on your device should do the trick and simply run the two commands above without sudo.

...Enjoy

= Links of interest =
[LCDProc + Arduino UNO + HD44780 = Garbage](http://arduino.cc/forum/index.php?topic=72333.0)
