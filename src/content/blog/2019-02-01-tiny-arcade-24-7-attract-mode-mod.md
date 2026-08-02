---
title: "Tiny Arcade: 24/7 Attract Mode mod"
date: 2019-02-01
slug: "tiny-arcade-24-7-attract-mode-mod"
categories: ["Ardunio","HOWTO","Thoughts"]
tags: ["Retro & Gaming", "Hardware"]
excerpt: "Tiny Arcades are an impressive demonstration of modern miniaturisation. Whether it’s Frogger, Pacman, Space Invaders or Dig Dug you cannot help but be enamoured by it’s small frame. With a height no more than 90cms, these arcades faithfully replicate fully controllable classics f"
---

<p class="wp-block-paragraph">Tiny Arcades are an impressive demonstration of modern miniaturisation. Whether it&#8217;s Frogger, Pacman, Space Invaders or Dig Dug you cannot help but be enamoured by it&#8217;s small frame. With a height no more than 90cms, these arcades faithfully replicate fully controllable classics for an equally tiny price &#8211; $10-20.</p>



<p class="wp-block-paragraph">&#8230;But there&#8217;s a catch, the attract mode and game play modes cuts out after 20 or so seconds! Not much good if you want to create your own <em>tiny arcade.</em> </p>



<p class="wp-block-paragraph">Standing on the shoulders of <a href="https://youtu.be/Z4Fc4BJ5404">Travis</a>&nbsp;we&#8217;re&nbsp;going&nbsp;to&nbsp;build&nbsp;our&nbsp;very&nbsp;own&nbsp;always&nbsp;on&nbsp;<em>Galaxian</em><a href="https://youtu.be/Z4Fc4BJ5404">&nbsp;</a>cabinet.</p>



<p class="wp-block-paragraph">Here&#8217;s a cheeky sneak peak</p>



<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/A4wrRNA3SZY?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<h2 class="wp-block-heading">How does this work?</h2>



<p class="wp-block-paragraph">The trick behind this project is to use a ubiquitous and very cheap integrated timing chip which effectively keeps pressing the &#8220;play button&#8221;, it does this by periodically closing the power (VCC) and ground (GND) circuit &#8211; exactly as if you&#8217;d pressed a button, or pointed the joystick. As for power, turns out 3&#215;1.5 Volt AAA batteries is within tolerance to be supplied using USB &#8211; no fancy chips required!</p>



<h2 class="wp-block-heading">Parts List:</h2>



<ol class="wp-block-list"><li>&#8220;Worlds Smallest&#8221; Tiny Arcade Cabinet (<a href="https://www.amazon.co.uk/Tiny-Arcade-Galaxian-Miniature-Game/dp/B06Y4BXB9C">Amazon</a> £14~)</li><li>(Optional) Tiny Arcade Timer designed by Travis (<a href="https://oshpark.com/shared_projects/zX0OBVfM">Oshpark</a> £3~)</li><li>1kΩ resistor (<a href="https://www.ebay.co.uk/itm/20x-Resistors-any-values-requested-ohm-kohm-1-tolerance-1-4w-UK-seller/183532968531?ssPageName=STRK%3AMEBIDX%3AIT&amp;var=690886955414&amp;_trksid=p2057872.m2749.l2649">eBay</a>&nbsp;£1.50)</li><li>70Ω resistor (<a href="https://www.ebay.co.uk/itm/20x-Resistors-any-values-requested-ohm-kohm-1-tolerance-1-4w-UK-seller/183532968531?ssPageName=STRK%3AMEBIDX%3AIT&amp;var=690882490835&amp;_trksid=p2057872.m2749.l2649">eBay</a> £1.5)</li><li>555 Timer IC (<a href="https://www.ebay.co.uk/itm/10-x-NE555P-DIP-8-IC-Timer-UK-Seller/372326653887?ssPageName=STRK%3AMEBIDX%3AIT&amp;_trksid=p2057872.m2749.l2649">eBay</a> £1.89)</li><li>400nF Ceramic Capcitor (<a href="https://www.ebay.co.uk/itm/Ceramic-Capacitors-10-Pack-Choose-from-50-Values-2Pf-100NF-Free-UK-P-P/231348523213?ssPageName=STRK%3AMEBIDX%3AIT&amp;var=530609400994&amp;_trksid=p2057872.m2749.l2649">eBay</a> £1.20)</li><li>USB cable (<a href="https://www.ebay.co.uk/itm/Braided-Fabric-Micro-Mini-Sync-USB-Data-Cord-Charger-Cable-For-Android-Phone/302748548745?hash=item467d383e89:m:m5D_CZPWflWMk7xLK0aEhGw:rk:26:pf:0">eBay</a> £1.69) &#8211; Any will do, this is an example</li><li>(Optional) JST 3 Pin connector (<a href="https://www.ebay.co.uk/itm/10Pairs-JST-SM-3-Pin-Connectors-Cable-For-WS2812B-WS2811-WS2812-SK6812-LED-Strip/113104540758?ssPageName=STRK%3AMEBIDX%3AIT&amp;_trksid=p2057872.m2749.l2649">eBay</a> £2.80)</li><li>3D printed battery case replacement (<a href="https://www.tinkercad.com/things/a34uMLKoHxN">???</a>)</li></ol>



<h2 class="wp-block-heading">Tools: </h2>



<ul class="wp-block-list"><li>Hakko 888D Soldering Iron</li><li>Precision solder tip</li><li>Lead based solder (I&#8217;ve had it for the last 20 years, sue me)</li><li><em>Third Hand</em></li><li>Workbench Clamp light</li><li>Philips screwdriver </li><li>Flux</li></ul>



<h2 class="wp-block-heading">HOWTO:</h2>



<p class="wp-block-paragraph">Before I continue, this is based on the work of <a href="https://www.youtube.com/watch?v=Z4Fc4BJ5404&amp;feature=youtu.be">Travis</a> <em>(sorry mate, don&#8217;t know your full name &#8211; huge thanks for your work)</em>. </p>



<p class="wp-block-paragraph">Like Travis, I thought it would be cool to mod the Tiny Arcades to run in attract mode, maybe on a shelf, or on your desk &#8211; an interesting quirk for guests or to provide a little inspiration. <br><br>With this in mind I wasn&#8217;t particularly interested in sound (which I&#8217;m sure would become irritating fairly quickly), space is also a major player as I&#8217;d like to make the build flexible for future modification &#8211; this means removing the redundant battery compartment. </p>



<h3 class="wp-block-heading">Step 1: Let&#8217;s build the breakout board</h3>



<p class="wp-block-paragraph">Prepare your components (and watch out for static! <em>oh and do excuse my war weary workbench</em>). The breakout board has all the components labelled, polarity of the components doesn&#8217;t make a difference &#8211; the only one you need to watch out for is the 555, it has a small notch which matches up with the board.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2094" data-permalink="http://blog.milesburton.com/image-2/" data-orig-file="/blog-media/2019/02/image.png" data-orig-size="2712,2250" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image.png" src="/blog-media/2019/02/image.png" alt="" class="wp-image-2094" /></figure></div>



<p class="wp-block-paragraph">You can use the male or female connectors for pins 1-3, the primary purpose is to make the timing circuit easily removable and upgradable.</p>



<p class="wp-block-paragraph">The cable can be as short as you like, as this is a test cabinet I&#8217;m modding I don&#8217;t mind it being a little rough and ready &#8211; feel free to cut back the wire to a length your comfortable with. Use the following to determine which wire should be connected to each breakout-board pin.</p>



<table class="wp-block-table aligncenter"><tbody><tr><td>Breakout Board Pin</td><td>Wire Colour</td><td>Signal</td></tr><tr><td>1</td><td>White</td><td>Ground</td></tr><tr><td>2</td><td>Red</td><td>VCC</td></tr><tr><td>3</td><td>Green</td><td>Output</td></tr></tbody></table>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2096" data-permalink="http://blog.milesburton.com/image-2-2/" data-orig-file="/blog-media/2019/02/image-2.png" data-orig-size="2468,1954" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-2" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-2.png" src="/blog-media/2019/02/image-2.png" alt="" class="wp-image-2096" /></figure></div>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2097" data-permalink="http://blog.milesburton.com/2019-02-01-15-54-06/" data-orig-file="/blog-media/2019/02/2019-02-01-15.54.06.jpg" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1549036446&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;64&quot;,&quot;shutter_speed&quot;:&quot;0.022222222222222&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475733333333&quot;,&quot;longitude&quot;:&quot;0.17113611111111&quot;}" data-image-title="2019-02-01-15.54.06" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/2019-02-01-15.54.06.jpg" src="/blog-media/2019/02/2019-02-01-15.54.06.jpg" alt="" class="wp-image-2097" /><figcaption>And here&#8217;s the result (excuse the dodgy workbench) </figcaption></figure></div>



<h3 class="wp-block-heading">Step 2: Bustin&#8217; open the Tiny Arcade cabinet</h3>



<p class="wp-block-paragraph">This is a little more fiddly than you&#8217;d expect, the Tiny Arcade has a couple of tabs which secure the back plate to the the unit &#8211; you can use a guitar pick to carefully free the component.</p>



<p class="wp-block-paragraph">Start by removing the two screws at the top of the board. Using your guitar pick carefully release the two catches as seen in the picture below.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2098" data-permalink="http://blog.milesburton.com/image-3/" data-orig-file="/blog-media/2019/02/image-3.png" data-orig-size="1917,3549" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-3" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-3.png" src="/blog-media/2019/02/image-3.png" alt="" class="wp-image-2098" /><figcaption>Two catches which are located at the top of the Tiny arcade. </figcaption></figure></div>



<h2 class="wp-block-heading">Step 3: Remove the superfluous connectors</h2>



<p class="wp-block-paragraph">The power switch becomes redundant after this mod. Either entirely desolder the joints (per the picture below) or cut the power cables. Whilst you&#8217;re at it, cut the yellow speaker wire &#8211; don&#8217;t be too messy as it could be useful for future projects. </p>



<p class="wp-block-paragraph"><em>(you could keep it to switch sound on and off &#8211; this guide assumes you&#8217;ve removed it)</em></p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2099" data-permalink="http://blog.milesburton.com/image-4/" data-orig-file="/blog-media/2019/02/image-4.png" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-4" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-4.png" src="/blog-media/2019/02/image-4.png" alt="" class="wp-image-2099" /><figcaption>Red shockingly, represents 5V (VCC). Black is Ground (GND). </figcaption></figure></div>



<h3 class="wp-block-heading">Step 4: Soldering the Output connector</h3>



<p class="wp-block-paragraph">The easiest non-invasive approach to hooking up the output connector (from the breakout board) is to open up the arcade&#8217;s controller board and solder it on to any of the outputs on the joypad ribbon.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2101" data-permalink="http://blog.milesburton.com/image-6/" data-orig-file="/blog-media/2019/02/image-6.png" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-6" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-6.png" src="/blog-media/2019/02/image-6.png" alt="" class="wp-image-2101" /></figure></div>



<p class="wp-block-paragraph">Unscrew the LED lighting fixture at the top of the unit, then go ahead and remove the two screws on the controller board. This should leave you with something like the below</p>



<p class="wp-block-paragraph"></p>



<figure class="wp-block-image"><img data-attachment-id="2100" data-permalink="http://blog.milesburton.com/image-5/" data-orig-file="/blog-media/2019/02/image-5.png" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-5" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-5.png" src="/blog-media/2019/02/image-5.png" alt="" class="wp-image-2100" /><figcaption>Tiny Arcade cabinet controller board<br></figcaption></figure>



<p class="wp-block-paragraph">With the controller removed, solder the Output wire (Green!) to one of the outputs as follows</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2102" data-permalink="http://blog.milesburton.com/image-7/" data-orig-file="/blog-media/2019/02/image-7.png" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-7" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-7.png" src="/blog-media/2019/02/image-7.png" alt="" class="wp-image-2102" /><figcaption>Tiny Arcade controller board with the 555 Output wire connected. (<em>&#8230;Wasn&#8217;t that green before?</em>)</figcaption></figure></div>



<p class="wp-block-paragraph">You&#8217;re all done, screw it back together &#8211;  we shouldn&#8217;t need this side of the controller again. <em>If you&#8217;ve gained a few extra screws award yourself ten points. </em></p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2103" data-permalink="http://blog.milesburton.com/image-8/" data-orig-file="/blog-media/2019/02/image-8.png" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-8" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-8.png" src="/blog-media/2019/02/image-8.png" alt="" class="wp-image-2103" /></figure></div>



<h3 class="wp-block-heading">Step 5: POWER!</h3>



<h4 class="wp-block-heading">Breakout board</h4>



<p class="wp-block-paragraph">Now we&#8217;re on the home straight, this is a bit fiddly but pace yourself and you&#8217;ll be done in no time. </p>



<p class="wp-block-paragraph">To finish up the wiring we need to hook up the USB power supply as well as the breakout board cables. Let&#8217;s start with the breakout.</p>



<p class="wp-block-paragraph">After quite a bit of testing, the SDA port (used to program the IC) seems to be the most reliable source of power for the breakout board &#8211; hopefully Travis can step in and confirm where the best place to pick up power should be. Until then, take the VCC (Red) cable from the break out board and solder it to the SDA slow as shown in the picture below:</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2104" data-permalink="http://blog.milesburton.com/image-9/" data-orig-file="/blog-media/2019/02/image-9.png" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-9" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-9.png" src="/blog-media/2019/02/image-9.png" alt="" class="wp-image-2104" /><figcaption>Shouldn&#8217;t really be using the SDA data line but solder it <em>(probably related to voltage &#8211; Travis?)</em></figcaption></figure></div>



<h4 class="wp-block-heading">USB Power</h4>



<p class="wp-block-paragraph">Now on to the USB power which closes out all the wiring on this project.</p>



<p class="wp-block-paragraph">Heat-shrink is a PITa, so to save you from that pain wrap around the ground wire from your USB cable with your breakout board white (ground) wire. Go ahead and tin (add a bit of solder) to the wires.</p>



<p class="wp-block-paragraph">Solder the two wires to the pin below.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2105" data-permalink="http://blog.milesburton.com/image-10/" data-orig-file="/blog-media/2019/02/image-10.png" data-orig-size="1618,1206" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-10" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-10.png" src="/blog-media/2019/02/image-10.png" alt="" class="wp-image-2105" /><figcaption>The highlighted area is the ground pin for the controller board</figcaption></figure></div>



<p class="wp-block-paragraph">The very last wire is (seriously, I&#8217;m being honest this time), VCC/positive. Solder that to the terminal as below</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2106" data-permalink="http://blog.milesburton.com/image-11/" data-orig-file="/blog-media/2019/02/image-11.png" data-orig-size="4026,3023" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-11" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-11.png" src="/blog-media/2019/02/image-11.png" alt="" class="wp-image-2106" /><figcaption>VCC (Positive 5V Terminal) on the Tiny Arcade controller board</figcaption></figure></div>



<p class="wp-block-paragraph">&#8230;And that&#8217;s it, you should be able to fire up your unit and watch it spring in to life. If it doesn&#8217;t, turn it off quickly and review all your connections.</p>



<p class="wp-block-paragraph"></p>



<h2 class="wp-block-heading">Step 6: Makin&#8217; it pretty</h2>



<p class="wp-block-paragraph">All this extra wiring and complexity will take up rather a lot of room, we&#8217;ll need to slim down that booty &#8211; thankfully that&#8217;s not too hard.</p>



<p class="wp-block-paragraph">I&#8217;ve cooked up <a href="https://www.tinkercad.com/things/a34uMLKoHxN">this 3D print</a> which is a great match for the Tiny Arcade. You can either print it on your own equipment or use a third party.</p>



<figure class="wp-block-image"><img data-attachment-id="2108" data-permalink="http://blog.milesburton.com/image-13/" data-orig-file="/blog-media/2019/02/image-13.png" data-orig-size="2137,1178" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-13" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-13.png" src="/blog-media/2019/02/image-13.png" alt="" class="wp-image-2108" /></figure>



<figure class="wp-block-image"><img data-attachment-id="2107" data-permalink="http://blog.milesburton.com/image-12/" data-orig-file="/blog-media/2019/02/image-12.png" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-12" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/02/image-12.png" src="/blog-media/2019/02/image-12.png" alt="" class="wp-image-2107" /><figcaption>Putting the Tiny Arcade on a diet through the miracle of 3D printing</figcaption></figure>



<h3 class="wp-block-heading">Part ∞: What&#8217;s next?</h3>



<p class="wp-block-paragraph">The Tiny Arcades are cool, we&#8217;ve got a few cunning plans:</p>



<ol class="wp-block-list"><li>Switch out the lighting to use Neopixels</li><li>Use the switch to enable/disable audio</li><li>Add a third switch to disable the breakout board timer</li></ol>



<p class="wp-block-paragraph">This has been a great little project that has encouraged me to build my own mini-cab, with a few surprises. Thanks to &#8220;World&#8217;s smallest&#8221; and Travis.</p>



<figure class="wp-block-embed-youtube aligncenter wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/eoQTKEbdS-4?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>

