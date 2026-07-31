---
layout: ../../layouts/Layout.astro
title: Arduino Clone - Romeo Robotics Board
---

# Arduino Clone - Romeo Robotics Board

*Migrated from the old MediaWiki install. Images referenced in the original article were not recovered during migration and are marked below.*

## Contents

* [1 What is the Romeo?](#what-is-the-romeo)
* [2 Build Quality](#build-quality)
* [3 Drawbacks](#drawbacks)
* [4 Conclusion](#conclusion)

## What is the Romeo?

TBC - As soon as I get my camera I'll go through a good walk-through

So what is the Romeo board? Simply put, the Romeo is a beginners dream. It provides a number of ports where you may plug into servos – unmodified, wire in motors and hook up I2C sensors without nasty breadboards. It takes a “kitchen sink” approach to Arduino boards by providing a plethora of ports and power outlets to wire you devices to.

## Build Quality

The Romeo board, like other DF-Robot boards has excellent build quality. Boards that include a motor-driver draw a surprising number of amps when the motors stall. Stalling occurs when the motor is not moving, for example, when you stop and start. Ordinary traces can sometimes burn out in the same way light-bulbs glow! The Romeo avoids this risk by including extra thick traces which can cope with the sporadic power draw which is all but common in robotics.

This board has 4 main power sources:

* Regular external 2.5mm plug
* USB power \*
* Generic power for Motors \*\*
* Generic power for Servos

\* Though not common knowledge you can actually buy simple “wall-wart” AC adaptors which plug into the standard “Type B” USB socket on the Romeo. You'll find these often power MP3 players like the Apple iPod.

\*\* Both the "generic power ports" use a extremely handy component known as a terminal block. A terminal block allows you to slot in any old wire and screw it down so it cannot fall out. A far cry from the more common "wire in the socket" approach - they always fall out.

## Drawbacks

Only a couple things let down the Romeo. As an Asian built product, documentation on the board is sparse (though Ye-Robot have posted several code snippets you may download in their forum) but that's why you're buying an Arduino right ;)? It's simple enough to use. There are, for example, several jumpers which allow you to enable and disable the motor controller providing you with plenty of flexibility.

*So what is the other let down Miles?*

The AtMega 168 with its 1k of RAM can be limiting when you’re developing “complex” scripts. Most people won’t find it to constraining but you may find yourself spending more time optimising code than you may with the AtMega 328 or other MCUs. Luckily, DFRobot have released a slightly updated version of the Romeo which includes the aforementioned MCU – Hopefully we’ll see that in the UK before to long.

## Conclusion

In summary, it’s a great starter board. Nothing at the moment can compare to the Romeo’s flexibility. If you’re interested in robotics and don’t know where to start – You won’t find an easier board to get started with.
