---
layout: ../../layouts/Layout.astro
title: Sky Box RS232 Connector
---

# Sky Box RS232 Connector

## Contents

* [1 Introduction](#introduction)
  * [2 What can it do?](#what-can-it-do)
* [3 The Application Protocol](#the-application-protocol)
  * [4 When do you receive information changes?](#when-do-you-receive-information-changes)
* [5 Code](#code)
* [6 Special Thanks](#special-thanks)

## Introduction
Ever wondered what that little Serial (RS232) port was on the back of that shine Sky box you just ordered?

Several years ago Sky produced a funky little accessory called the [Gnome](http://en.wikipedia.org/wiki/Sky_Gnome). This fun but sadly unpopular little box received information wirelessly through an RS232 adapter and displayed programme information on a little LCD display. It also had another hidden gem, you could control your Sky box through the Gnome via infrared.

So with this information in hand, a couple of keen [hackers](http://www.heenan.me.uk/control-sky-from-pc/) decoded the incoming packets so we can take that very information and build a connector.

### What can it do?
Without reiterating [Joseph Heenan's](http://www.heenan.me.uk/control-sky-from-pc/background.html) guide to much you can retrieve various debugging information from the Sky box. This includes but isn't limited to Programme information (description, title, channel, time code etc), adverts, [Sky+](http://en.wikipedia.org/wiki/Sky%2B) activity.

It has one major limitation though. *You cannot control or send data to the box*. Be aware of this limitation, any additional control you must handle via Infra-red (which Joseph has also documented)

## The Application Protocol
One again, I'm borrowing rather heavily from Joseph Heenan (hopefully he wont mind). When you receive data it tends to come in a big clump (that's a technical term) and you should decide what that data refers to as you use it.

As Joseph rightly highlighted, the following are the core "packets"

| Data | Meaning |
| --- | --- |
| SSCN | Current Channel number |
| SSCA | Current Channel name |
| SSDT | Current time |
| SST0 | Start time of current program |
| SSN0 | Current program name |
| SSE0 | Current program description |
| CE00 | Entering channel ('-' is inserted on the right filling in blanks) |
| CEER | Enter channel error (eg. invalid channel number) |
| SYIC | Either -- ('normal') or 8080 (tuned to pin protected channel) |
| SYFS | EPG Full Screen. 1=Enter, 0=Exit |
| SYD1 | System display - a message to be display on gnome screen |
| PUSP | Error - eg. no satellite signal recieved |
| PUCP | Error - eg. enter pin number or "audio unavailable (not subscribed)" |
| SYST | 0 = sky box powered on, 1 = powered off |
| SYIA | 0 = leaving interactive mode, 1 = entered interactive mode (ie. when you press the 'red' key on remote) |
| SSEI | Sky+ operations (eg. 'Pause', 'Rewind', 'Fast Forward', 'Playback') |

Additional packets which may have been disabled

| Data | Meaning |
| --- | --- |
| SSE0 | Current Event extended information |
| PUPP | Popup from personal planning (reminders, Sky+ recording messages etc) |
| SIIA | Entering interactive information (Games). 1 = Entering, 0 = Exit |
| SYIC | Inserter Character (ie: Pin request) |

Details on abbreviations

| Data | Meaning |
| --- | --- |
| SS | Search & Scan |
| CE | Channel Entry |
| PU | Popup |
| SI | System Information |

### When do you receive information changes?
In addition to the notes Joseph has mentioned, you seem to receive updated in the following scenarios
- Programme change
- Adverts (advertising particular programs)
- Sky+ activities
- Flipping through channel guide seems to spark activity
- Any remote control activity (volume etc)

## Code
You've just skipped the entire article haven't you? Pfft. Kids today.

I've developed a C# (.Net 3.5 Framework) which is based around an Observer pattern which you can attach to a particular serial port. The concept is you could have multiple boxes connected to the same machine without a conflict. Please refer to the code for more details.

*(attachment: SkyGnomeConnector VS2010.zip - not migrated)* - Sample twitter implementation. Fairly stock code so easily ported to C++, Java etc.

## Special Thanks
Thanks very much to Chiji Nwankwo (from Sky) who showed me some prototype code which let me built my first prototype.
A huge thanks to Joseph Heenan (and his contributors) for taking the time to write up the protocol.  His documents are available [online](http://www.heenan.me.uk/control-sky-from-pc/gnome-protocol.html)
