---
title: "It’s finally here, the Hub which promises to enable monitoring & remote control to the myEnergi range."
date: 2019-03-23
slug: "its-finally-here-the-hub-which-promises-to-enable-monitoring-remote-control-to-the-myenergi-range"
categories: ["Electric Vehicles","HOWTO","Renewables","Tesla"]
tags: ["Electric Vehicles", "Renewables", "Hardware"]
excerpt: "Arriving unexpectedly early, after it was only officially released yesterday here we sit with the myEnergi Hub – one of the first to be in consumer hands. Putting aside a trip to Brighton I decided to tear-down the new Hub to see what makes it tick. Given the components used I wo"
featuredImage: "/blog-media/2019/03/2019-03-23-13.08.44.jpg"
---

<p class="wp-block-paragraph">Arriving unexpectedly early, after it was only officially released yesterday here we sit with the myEnergi Hub &#8211; one of the first to be in consumer hands.</p>



<p class="wp-block-paragraph">Putting aside a trip to Brighton I decided to tear-down the new Hub to see what makes it tick. </p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2163" data-permalink="http://blog.milesburton.com/2019-03-23-10-15-56/" data-orig-file="/blog-media/2019/03/2019-03-23-10.15.56.jpg" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1553336156&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;200&quot;,&quot;shutter_speed&quot;:&quot;0.016666666666667&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475772222222&quot;,&quot;longitude&quot;:&quot;0.17121666666667&quot;}" data-image-title="2019-03-23-10.15.56" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/03/2019-03-23-10.15.56.jpg" src="/blog-media/2019/03/2019-03-23-10.15.56.jpg" alt="" class="wp-image-2163" /><figcaption>Arriving in a small neat package, it has a RJ45 connector to the rear and a basic 5.5mm DC jack (5v@1.5a &#8211; a candidate to be replaced with USB)</figcaption></figure></div>



<figure class="wp-block-image"><img data-attachment-id="2164" data-permalink="http://blog.milesburton.com/2019-03-23-10-10-44/" data-orig-file="/blog-media/2019/03/2019-03-23-10.10.44.jpg" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1553335844&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;80&quot;,&quot;shutter_speed&quot;:&quot;0.022222222222222&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475747222222&quot;,&quot;longitude&quot;:&quot;0.17115&quot;}" data-image-title="2019-03-23-10.10.44" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/03/2019-03-23-10.10.44.jpg" src="/blog-media/2019/03/2019-03-23-10.10.44.jpg" alt="" class="wp-image-2164" /><figcaption>Removing the cover reveals a fairly simple PCB with a small coiled 868Mhz antenna</figcaption></figure>



<figure class="wp-block-image"><img data-attachment-id="2165" data-permalink="http://blog.milesburton.com/2019-03-23-10-03-03/" data-orig-file="/blog-media/2019/03/2019-03-23-10.03.03.jpg" data-orig-size="3024,4032" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1553335383&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;160&quot;,&quot;shutter_speed&quot;:&quot;0.022222222222222&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475730555556&quot;,&quot;longitude&quot;:&quot;0.17112777777778&quot;}" data-image-title="2019-03-23-10.03.03" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/03/2019-03-23-10.03.03.jpg" src="/blog-media/2019/03/2019-03-23-10.03.03.jpg" alt="" class="wp-image-2165" /><figcaption>The underside of the Hub is a little more interesting, it is apparently powered by a 16Bit PIC mico-controller (PIC24EP), a small 868Mhz RF69 RXTX daughter board and finally a 10/100 Ethernet controller (ENC424J). This is a great example of taking off the shelf hobby grade equipment and turning it in to a commercial product</figcaption></figure>



<p class="wp-block-paragraph">Given the components used I would imagine some of the software may have been adapted from known libraries such as <a href="http://www.airspayce.com/mikem/arduino/RadioHead/">RadioHead for Arduino. </a>Whilst the documentation suggests the wireless protocol is proprietary it&#8217;s still founded on the capabilities of the IC (FSK etc) which means it may be possible to interface an SDR with the unit which would be great for tinkering.</p>



<p class="wp-block-paragraph">Now on to the installation process, a picture tells a thousand words &#8211; a YouTube playlist.. well, I&#8217;ll leave that up to you.</p>



<figure class="wp-block-embed-youtube wp-block-embed is-type-rich wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/NSprY1_zmVY?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>

