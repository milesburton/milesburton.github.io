---
layout: ../../layouts/Layout.astro
title: EEE 701 Touchscreen Modification
date: 2010-12-12T19:25:46Z
---

# EEE 701 Touchscreen Modification

<p class="wiki-date">Earliest known revision <time datetime="2010-12-12T19:25:46Z">12 Dec 2010</time></p>

## Contents

* [1 Introduction](#introduction)
  * [2 Testing images](#testing-images)
  * [3 Before you begin](#before-you-begin)

## Introduction
Please note, this guide has been taken from my original post on EEEForums

This is mainly for the UK lot who use LinITX.co.uk; I grabbed their £25 quid 7" touch screen.

First of all, seems like a decent bit of kit, weights nothing (my post room actually x-rayed it!).

Let me say this, it isn't as easy getting into the EEE as implied by the other guys, it took me some serious time before I gained access to the device. The screws are all very well secured!

Before I began I stripped the camera wire, the colours matched up perfectly with the touch screen - I had it working with NO soldering (just selotape *shock*) almost straight away! (Please don’t use selotape, it isn't an insulator)

After pissing about with blue tack for some time I managed to fix the screen in place only to find the controller was slightly too big (without modification) to fix in the bezel! The ribbon is far too short to allow you to place the controller within the chassis so I can only think of two methods which may work...

First of all, remove the ribbon connector - that should allow you to extend the length using third party wire. 

Second option, remove the pseudo USB connector, this should just about allow enough room for you to use the controller...

As it stands I need to wait till I get a soldering iron tomorrow before I can continue this mod but potentially it’s looking very promising! Reusing the camera connector is the easiest way to do this, I will ultimately put a hub in this device (waiting on delivery) but for the mean time I just had to do this!

### Testing images
As you can see the LinITX controller is really large, it physically won’t fit between the speaker and the screen joint...
[Another closer picture

Sorry for the crude profile image, my camera decided the keyboard was more interesting.

### Before you begin
*Advantages*
- Really handy method of navigating and controlling windows. I really cannot over emphasize this. The touchpad can be a real pain and rather slow to use - a touchscreen is intuiative and fast.
- Low power requirements
- Once you calibrate, you're ready to go on both 'Nix and Windows providing you have the drivers

*Disadvantages*
- The LCD looks somewhat more "merky", as if you had whiped it with a damp cloth and were waiting for it to dry. Sadly I cannot seem to take a picture to describe this, it isn't ideal but hardly a show stopper :)/
- Not the easiest of mods to complete. Quite time consuming and frustraighting first time around!

**Installation**
How myself and Mark (MnetCS) finally integrated the touch-screen.

Kit required:
- 20-70Watt Gas powered soldering iron (if not for the COOL factor alone)
- Slim profile solder (I'm a fan of lead, melts at low temps... Kills small children etc)
- Hobby Craft Knife (Stanley). Great for cutting up cables, precision work.
- Cheap £1 precision tool set. Good for getting screws out but doesn't last long...
- Pliers. Used for cutting wires and providing a bit of extra grunt for undoing those bloody tight screws.
- Wire strippers. Fantastic tool.
- Copper Solder-remover
- Insulation tape (Electrical tape)
- Blue tack - Great for holding the overlay in place
- "Third hand" (A little stand with clamps and a magnifying glass - used to hold an object in place while you work on it)
- "Heat Wrap" - This when heated bonds to whatever cable has been passed through it creating a neat, insulated bond which wont break.

Parts
- 80Wire IDE Cable (28 AWG, a cheap alternative to specialist wire)
- Copper pins, used to extend the ribbon cable.
- £25 LinITX touch screen + controller (7")

**Prerequisites:**
I cannot stress this enough, before you decide to go ahead and mod your EEE PC, take a lot of care in deciding where you will place your device. Find out precisely how deep the item in question is - you really have so little space to work with, 3-5mm is far too deep!!! 

Make sure you know how much wire you will require. There's nothing worse than spending an hour precisely soldering some sensitive PCBs to find that it is too long or too short! (Remember if it’s too long, you've got to put that additional slack somewhere!) 

Plan Plan Plan! Take notes on the power requirements, where you plan to source the connection from (USB, Mini-PCIe, main board etc). 

**ARE YOU PREPARED TO BRICK YOUR £230/$400 (plus del) DEVICE?!** - Is a touchscreen, bluetooth, GPS etc worth the risk? Hell yeah!

*Thoughts and notes before you begin;*
- The LCD Touch screen Overlay does have a touch side and a "dead side" - make sure you know which is which.
- It doesn't matter which order you connect the overlay ribbon to the controller.
- Anti-static. Don’t go petting a sheep whilst performing this mod.

**Step one:**
Removing the casing. This was much harder than I originally anticipated, popping open the chassis requires more force than I would have liked - or felt comfortable with! 

I choose to fit the touch screen overlay onto the LCD early on in this mod, it seems to make the most sense as you want to avoid moving the screen or adding any unnecessary marks. Though a little "Ghetto", blue tack did a fine job of securing the screen. I believe JKK (the first known person to fit a touch screen) used double sided "bricks" you get from the post office. That method is probably cleaner but not as reusable.

I would suggest you test your touchscreen before continuing. There [b]IS[/b] a right way and a wrong way of setting the screen - you really dont want to find that out once you've put everything back.

[**Step two:**
Deciding where to put the controller. As you can see in the initial planning images, the controller is very large. It physically wouldn't fit in the bezel without drastic modification! After some playing around it seems painfully obvious that it would have to been cut down and placed within the main chasse. (Under the motherboard to be precise)

**Step three:**
Preparing the cables. As I've chosen to use the USB Camera connection, I cut that wire in half. The reason I specifically choose to use this method rather than soldering directly to the motherboard was literally down to risk. I haven't soldered in many years and I like the "plug and play" approach of this mod. For those of you concerned about the missing camera, as you're splitting the wire in half there should be no problem reconnecting this when you have a hub installed.

I stripped off 4 strands of the IDE cable. I found the controller didn't actually require a ground line so four were sufficient. It was also worthy to note that the controller and the camera connector/wire were in the same format - So no messing about with multi-meters... 

Once both ends were successfully stripped and twisted, I applied some solder to allow easy bonding.

Whilst you are preparing the cables, also cut the USB connector from the controller card, give yourself enough room just in case you make a mistake and need to re-cut the wire.

**Step four:**
Preparing to extend the touch screen ribbon. Mark sourced some connector pins from and old wireless access point, this proved perfect and was very easy to connect to the IDE cable I had previously prepared.

If you need to source your own parts an old IDE connector from a motherboard would work well.

(Any "dodgy" soldering has been cleaned up with heat wrap and insolating tape)

**Step Five:**
Preparing the controller. Within this mod, we felt it only necessary to remove the white ribbon connection (as this had the greatest depth and length). Initially we were going to remove the additional unused PCB below the connector but we deemed it risky and left it... (I'll revisit this later)

Originally we attempted to remove the connector using a soldering iron and the copper braid I mentioned earlier however after an hour of attempting this we gave up and choose to clip off.

**Step Six:**
Attaching the IDE cable. Once we had successfully removed the connector and cleaned up the working area we proceeded to solder the IDE cable to the controller.

At first we clamped the controller using the "third hand". This keeps both your hands free too manoeuvre and solder as you wish. 

We adjusted the cable so that as best we could it would be easy to quickly slip in the cable while the solder was fluid. I'll tell you now, this is an art. It took several attempts to fit the cable into the minute hole - it took both Mark and I a few minutes before we were confident that the cable was fitted correctly.

[Above is the result of our hard work :)

**Step Seven:**
Bridging the controller to the camera connector (USB to USB). This is a quick job, cut a small amount of heat wrap to cover the connections you are able to bridge. Carefully match up the colours and solder the two cables together. Be sure you get these in the correct order (the circuit diagram is available on these forums if you are unsure) or you may short circuit both the motherboard and the controller - not good.

Testing: At this stage its worth double checking everything is working. If you have the equipment I'd suggest using a multi-meter to check you've connected the right wires to the right places. 

**Step eight:**
Insolating the devices. This is a pretty simple one, just cover any bare wires or circuit board with the electrical tape - MAKE SURE YOU DO THIS PROPERLY, you risk frying the board.

**Step nine: The fun step.**
Our installation may vary from yours depending on how adventurous you are. We chose to carefully connect up the pins to the touch screen ribbon and attempt to fit the any excess cable where possible.

Before you begin, remove the motherboard (careful) as per the guides mentioned within this forum)

I choose to lead the IDE cable behind the LCD inverter board through the hinge (be careful not to block the hinge, it will need space to travel! you may end up cutting the cable or jamming the hinge) and under the motherboard.

For the mean time I have placed the controller where the mini-pcie connector should be, I will revisit this when I continue modding but for the mean time it was a suitable place :)

I choose to run the USB cable along to the left hand side of the device and up through the northern slot which is used for one of the connectors (Battery?). You should have enough room to connect the USB cable to the connector.

Be sure you have not blocked any screw points or click points *AND DONT FORGET TO PULL THROUGH ANY CONNECTORS*. It’s worth double checking that the motherboard fits flush down (try sticking in an Ethernet cable to make sure). 

Once you have successfully connected all the wires back up, you are ready to test :)

**Polishing up**
Once you've put everything back together and only gained four extra screws you are ready to calibrate the device. I'd suggest using a match-stick or some other fine tipped but blunt tool - you really don’t want to scratch your nice new screen.

Please note: I cannot be responsible if you nuke your EEE, kill any small children or decide to put your tongue in an electrical socket. If you are an idiot please step away and find some friendly motorway to walk accross..... Sorry about the lack of pictures, my first thought wasn't to pictorially record this :(
