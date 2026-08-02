---
layout: ../../layouts/Layout.astro
title: Smart-Plugs - The Path of Least Resistance
---

# Smart-Plugs - The Path of Least Resistance


Smart Plugs are a fairly recently popularised technology. The premise is you can power down the devices you’re not using to avoid the global waste from “Vampire devices”.

One of the major problems with this technology is the lack of integration with the host device and simple methods of indicating which devices should be turned off when they are not in use.

I can highlight this issue in a fairly common use case. Consider 5 devices hooked up to your power outlet. You have your TV, DVD Player, Clock and Sky+ Box. Which of these should be turned off? Do you really want your clock turning off? What about your Sky+ player that’s recording your favourite Simpsons episodes? 

One interesting approach involved intercepting the infrared beam from your TV remote control to indicate a power down. Inversely, the same button is used to power back up but it only works on that single outlet.

![Smart exLead](/wiki-media/Smart_exLead.jpg)

If we employ a mixture of switches,  magnetic current transformers and RFID tags to build a low cost smart plug. When in standby a device goes into standby the level current drawn drops significantly. If we measure the standby current draw this may be used as a threshold at which the plug would power down. Employing a combination of RFID tags or switches you can “tag” a plug with a unique code that informs the smart plug whether it should power down that specific outlet.

In human society convenience, the path of least resistance, rules. If something even adds a moments delay to our digital lives it increases stress and anxiety (see XYZ). Those who ignore this simple fact are setting themselves up for failure. Technologies which aim to reduce our excessive society must embrace these requirements, but naturally this carries a cost.

An interesting technology which as been popularised recently is HomePlug. The technique sends data signal over standard house wiring allowing two (or more) devices to communicate together. Imagine employing the same technique to any device. An simple protocol could be developed which would allow a device, such as a TV, to communicate with the smart-plug to adjust its power requirements. 

Most modern electrical equipment contains one or more small batteries which is used to remember operating data; for example,  the channels your TV is tuned on. Employing the exact same long term power source the TV can trigger the outlet to power on when it receives an appropriate command – like clicking the power button on your remote.

These techniques combined with more traditional approaches can help reduce vampire consumption to zero. Hopefully a similar technique will be popularised in future.
