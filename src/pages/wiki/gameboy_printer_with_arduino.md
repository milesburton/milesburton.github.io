---
layout: ../../layouts/Layout.astro
title: Gameboy Printer with Arduino
---

# Gameboy Printer with Arduino

<p class="wiki-date">Earliest known revision <time datetime="2010-10-30T21:06:58Z">30 Oct 2010</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Download](#download)
  * [3 Latest](#latest)
  * [4 Archive](#archive)
* [5 Change log](#change-log)
* [6 Getting Started](#getting-started)
  * [7 What you need](#what-you-need)
  * [8 Setting up](#setting-up)
* [9 References](#references)

## Introduction
The Gameboy printer is a small battery powered thermal printer. It's low resolution makes it ideal for low powered MCUs like the Arduino. This library is based off the excellent work by Furrtek. It will let you printer directly from the Arduino to any Gameboy Printer.

## Download
### Latest
*(attachment: GBPrinter_Arduino_Alpha_0.01.pde - not migrated)* - Gameboy Printer for Arduino 0.01 Alpha. 
### Archive
## Change log
0.01 - Early port of Furrtek's Gameboy printer code. Designed to print a test band and prototype early object methods.

## Getting Started
### What you need
- Gameboy Printer - £5-10
- Printer Paper - £5
- Gameboy link cable CGB-003 (or similar) - £1-5
- Prototyping board or veroboard
- Arduino compatible MCU (AtMega8/128/328/Mega)

Extras
- Multimeter

### Setting up
#### Step One : Identify the lines
First up, cut the link able in half. each half will have a slightly different pin-out.

![Pinout](/wiki-media/Pinout.jpg)

Identify which lines are which. There are four unique lines, SIN (Serial In), SCK (Clock), SOUT (Serial out) and GND (Ground). 

The purpose of the clock line is to indicate the frequency (timing) of data. As with most peripherals it operates in packets of 8 - 8 bits. Each packet will contain data from the printer (which always returns data regardless of it's validity). Each bit is separated by 60 microseconds (60us).

#### Step Two : Wire up the Arduino
The AtMega 8/168/328 have sufficient [pull ups](http://en.wikipedia.org/wiki/Pull-up_resistor) to allow you to plug the GB Printer outputs straight to the Arduino.

See the example PDE for default pinouts.

## References
[Gameboy Printer Protocol details](http://f1.aaa.livedoor.jp/~fexx/gb/gb-printer.txt) - Very detailed (Translated [Google > Printer](http://translate.google.com/translate?js=n&prev=_t&hl=en&ie=UTF-8&layout=2&eotf=1&sl=fr&tl=en&u=http%3A%2F%2Ffurrtek.free.fr%2Findex.php%3Fp%3Dcrea%26a%3Dgbprinter))

*(attachment: Gameboy Printer Protocol.docx - not migrated)*

[Furrtek Writeup](http://furrtek.free.fr/index.php?p=crea&a=gbprinter)
