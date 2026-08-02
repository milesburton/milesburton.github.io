---
layout: ../../layouts/Layout.astro
title: Arduino Webserver powered by WiShield with sprinkles - BlinkM
---

# Arduino Webserver powered by WiShield with sprinkles - BlinkM

<p class="wiki-date">Earliest known revision <time datetime="2009-10-18T16:27:47Z">18 Oct 2009</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Results](#results)
* [3 Code](#code)

## Introduction
As a little experiment (and bloody overdue) I decided to setup a spare Arduino with my [ASync-Labs](http://asynclabs.com/) WiShield coupled with a [BlinkM](http://blinkm.thingm.com/). My fundamental aim, and as a precusor to my upcoming robotics project, was to understand and prototype how two way communication could be made via the web.

So what did I come up with? Well without further adue:

![ArduinoWiShieldAndBlinkM](/wiki-media/ArduinoWiShieldAndBlinkM.JPG)

..Alright, you've got me, it's not that impressive but it has brought up some ideas.

## Results
The [current] ASync labs WiServer code is fairly limited without modification (but that's what we're here for right?) which limits any complex communication down to simple GET parameters. However, with that being said, and with a little ingenuity, you can get almost any data you like.

Single threaded architecture with little to no time slicing. Yeah this is a pain, It basically means you cannot serve more than one person at once. Let's say you wanted to allow collaborative control of a robot - how would that work? - Badly. Realistically though, will you ever look to build such a system on an Arduino? That's ARM territory. 

So finally, where does this leave us? I don't believe the WiServer is a particularly good approach to rich interactivity on the Arduino. It would be fantastic for some sort of remote monitoring (temperatatures etc) but not for control. I believe the way forward will be the socket library. If we palm off the "business" and "presentation" to more capable hardware - like your desktop PC - you can interact direclty with the Arduino without wasting valuable resources outputting HTML pages (...which got lost on the way to 1995).

## Code
<pre class="brush:cpp">
/*
 * A simple sketch that uses WiServer to serve a web page
 */

1. include <WiServer.h>

1. define WIRELESS_MODE_INFRA 1
1. define WIRELESS_MODE_ADHOC 2
1. include "Wire.h"
1. include "BlinkM_funcs.h"

byte blinkm_addr = 0x09; // the default address of all BlinkMs

// Wireless configuration parameters ----------------------------------------
unsigned char local_ip[] = {
  192,168,2,111}; // IP address of WiShield
unsigned char gateway_ip[] = {
  192,168,2,1}; // router or gateway IP address
unsigned char subnet_mask[] = {
  255,255,255,0}; // subnet mask for the local network
const prog_char ssid[] PROGMEM = {
  "0000"};  // max 32 bytes

unsigned char security_type = 2; // 0 - open; 1 - WEP; 2 - WPA; 3 - WPA2

// WPA/WPA2 passphrase
const prog_char security_passphrase[] PROGMEM = {
  "0000"}; // max 64 characters

// WEP 128-bit keys
// sample HEX keys
prog_uchar wep_keys[] PROGMEM = { 
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, // Key 0
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Key 1
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Key 2
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // Key 3
};

// setup the wireless mode
// infrastructure - connect to AP
// adhoc - connect to another WiFi device
unsigned char wireless_mode = WIRELESS_MODE_INFRA;

unsigned char ssid_len;
unsigned char security_passphrase_len;
// End of wireless configuration parameters ----------------------------------------

long counter = 0;

char* theColor = "orange";
// This is our page serving function that generates web pages
boolean sendMyPage(char* URL) {
  WiServer.print("<html>");

  switch(strlen(URL))
  {
  case 9: // blue
    BlinkM_fadeToRGB( blinkm_addr, 0,0,255);
    theColor = "blue";
    break;
  case 10: // green
    BlinkM_fadeToRGB( blinkm_addr, 0,255,0);
        theColor = "green";
    break;
  case 11: //red 
    BlinkM_fadeToRGB( blinkm_addr, 255,0,0);
            theColor = "red";
    break;

  default: // orange
    BlinkM_fadeToRGB( blinkm_addr, 255,255,0);
                theColor = "orange";

  }

WiServer.print("<!-- ");
WiServer.print(strlen(URL));
WiServer.print(" --> ");

  // Check if the requested URL matches "/"
  if (strcmp(URL, "/") == 0) {
  }
  // Use WiServer's print and println functions to write out the page content

  WiServer.print("<h1>Welcome visitor # ");
  WiServer.print(++counter);
  WiServer.print(". I'm a WiFi enabled Arduino, powered by the WiShield! </h1><br /> <br />");
  WiServer.print("Turn my BlinkM: <br />");
  WiServer.print("<form method=get action=/>");
  WiServer.print("<input type=radio name=color value=xxx> Red <input type=radio name=color value=xx> green <input type=radio name=color value=x> Blue");
  WiServer.print("<input type=submit />");
  WiServer.print("</form>");
  WiServer.print("<br /><br /> <b> Current Colour: <br /> <div style=\\"width:100px;height:100px;background-color:");
  WiServer.print(theColor);
  WiServer.print("\\"></div>");

  WiServer.print("</html>");
  // URL was recognized
  return true;
}

void setup() {

  BlinkM_beginWithPower();
  byte addr = BlinkM_getAddress(blinkm_addr);
  BlinkM_fadeToRGB( blinkm_addr, 255,0,0);

  // Initialize WiServer and have it use the sendMyPage function to serve pages
  WiServer.init(sendMyPage);

  // Enable Serial output and ask WiServer to generate log messages (optional)
  Serial.begin(115200);
  WiServer.enableVerboseMode(false);
  BlinkM_fadeToRGB( blinkm_addr, 0,255,0);
}

void loop(){

  // Run WiServer
  WiServer.server_task();

  delay(10);
}

</pre>
