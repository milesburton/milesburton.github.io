---
layout: ../../layouts/Layout.astro
title: Sure 2416 Displaying CPU Graph via Arduino
---

# Sure 2416 Displaying CPU Graph via Arduino

<p class="wiki-date">Earliest known revision <time datetime="2010-03-22T17:16:12Z">22 Mar 2010</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Media](#media)
* [3 More details](#more-details)

## Introduction
This demo makes use of the Arduino & the Sure 2416 Information Display library example called "SerialGraph". The client side c# application uses the .Net class "Performance" to pull various system statistics and writes them out to the display. This results in a real-time graph of your CPU stats. What's more the class can also monitor remote machines so you could potentially build a monitoring server keeping an eye on all manner of stats!

The C# project code is pretty simple. It uses a Windows PerformanceCounter to pull CPU/RAM/etc stats and then send the result via serial to an Arduino running the MatrixDisplay library. [HT1632 Arduino "Matrix Display" Library for the Sure 2416 and 0832](/wiki/ht1632_arduino_matrix_display_library_for_the_sure_2416_and_0832/)

You can download the annotated C# code from [here](http://download.milesburton.com/Arduino/Sure2416/SureSerialDisplay.zip) (Visual Studio 2008 required)

## Media
<videoflash>AFuvQEm5JLo</videoflash>
<videoflash>6q-f8Qcw2Ig</videoflash>

## More details
Take a look at [CodeProject](http://www.codeproject.com/KB/cs/perfgrid.aspx)
