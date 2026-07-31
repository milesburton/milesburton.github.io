---
title: "Quick Build: Battery powered RGB Neopixels with the ESP8266"
date: 2019-01-29
slug: "quick-build-battery-powered-rgb-neopixels-with-the-esp8266"
categories: ["Ardunio","Electric Vehicles","HOWTO","Thoughts"]
tags: ["Arduino","eSk8","ESP8266","IOT"]
excerpt: "After more than a few requests, I thought I’d finally get around to writing up my ultra quick battery powered programmable LED lights for my Evolve Electric Longboard. This is actually a precursor to a larger, more ‘intelligent’ project – I’ll revisit that later (tl;dr it involve"
featuredImage: "/blog-media/2019/01/2019-01-29-14.42.20.jpg"
---

<p class="wp-block-paragraph">After more than a few requests, I thought I&#8217;d finally get around to writing up my ultra quick battery powered programmable LED lights for my Evolve Electric Longboard. This is actually a precursor to a larger, more &#8216;intelligent&#8217; project &#8211; I&#8217;ll revisit that later (tl;dr it involves GPS and Accelerometers).</p>



<p class="wp-block-paragraph">What&#8217;s cool about this project?</p>



<ul class="wp-block-list"><li>Fully programmable lighting!</li><li>Exceptionally long battery life</li><li>Easily charged from USB, no external components required</li><li>Inbuilt 5 &amp; 3.3 volt regulators so no hassle interfacing with the LED strip</li><li>Lots of potential for enhancements</li></ul>



<p class="wp-block-paragraph">Without further ado, here&#8217;s the finished setup</p>



<figure class="wp-block-embed-youtube aligncenter wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/HppFftByUrM?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<h2 class="wp-block-heading">Parts list:</h2>



<ol class="wp-block-list"><li>WS2812B Nano Pixels LED strip (<a href="https://www.ebay.co.uk/itm/1m-5m-5V-WS2812B-5050-RGB-30-60LEDs-M-LED-Strip-ws2812-IC-Individual-Addressable/132734477057?ssPageName=STRK%3AMEBIDX%3AIT&amp;var=432045666959&amp;_trksid=p2057872.m2749.l2649">eBay</a>&nbsp; £2.22) &#8211; I went for a meter, but you can go to town if you wish, just watch the current draw</li><li>Wemos D1 ESP8266 with Battery (<a href="https://www.ebay.co.uk/itm/WeMos-D1-Esp-Wroom-02-Motherboard-ESP8266-Mini-WiFi-Nodemcu-Module-18650-Battery/153175874085?ssPageName=STRK%3AMEBIDX%3AIT&amp;_trksid=p2057872.m2749.l2649">eBay</a>&nbsp;£4.97)</li><li>Ultrafire 18650 Lipo battery (<a href="https://www.ebay.co.uk/itm/18650-3-7V-4000mAh-BRC-Rechargeable-Li-ion-Battery-Lithium-Cells-UK-Seller/263876035192?ssPageName=STRK%3AMEBIDX%3AIT&amp;var=563260029916&amp;_trksid=p2057872.m2749.l2649">eBay</a>&nbsp;£3.68)</li><li>3 Pin JST connectors (<a href="https://www.ebay.co.uk/itm/10Pairs-JST-SM-3-Pin-Connectors-Cable-For-WS2812B-WS2811-WS2812-SK6812-LED-Strip/113104540758?ssPageName=STRK%3AMEBIDX%3AIT&amp;_trksid=p2057872.m2749.l2649">eBay</a> £2.80)</li><li>Custom 3D printed case (<a href="https://www.tinkercad.com/things/c90SvjKzlB6">????</a>)</li></ol>



<p class="wp-block-paragraph">Total price: £13.67 (this can be cheaper if you search around or buy in bulk)</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2069" data-permalink="/blog/quick-build-battery-powered-rgb-neopixels-with-the-esp8266/" data-orig-file="/blog-media/2019/01/2019-01-29-11.20.41.jpg" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1548760841&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;250&quot;,&quot;shutter_speed&quot;:&quot;0.016666666666667&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475730555556&quot;,&quot;longitude&quot;:&quot;0.17105555555556&quot;}" data-image-title="2019-01-29 11.20.41" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/01/2019-01-29-11.20.41.jpg" src="/blog-media/2019/01/2019-01-29-11.20.41.jpg" alt="2019-01-29 11.20.41" class="wp-image-2069" /></figure></div>



<h2 class="wp-block-heading">HOWTO:</h2>



<h3 class="wp-block-heading">Step One, solder</h3>



<table class="wp-block-table aligncenter"><tbody><tr><td>Cable Colour</td><td>JST Connector</td><td>ESP8266</td></tr><tr><td>Red</td><td>Power</td><td>5V</td></tr><tr><td>White</td><td>Ground</td><td>GND</td></tr><tr><td>Green</td><td>Data</td><td>D8</td></tr></tbody></table>



<div class="wp-block-image"><figure class="aligncenter"><img data-attachment-id="2072" data-permalink="/blog/quick-build-battery-powered-rgb-neopixels-with-the-esp8266/" data-orig-file="/blog-media/2019/01/2019-01-29-11.41.28.jpg" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1548762088&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;320&quot;,&quot;shutter_speed&quot;:&quot;0.022222222222222&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475727777778&quot;,&quot;longitude&quot;:&quot;0.1711&quot;}" data-image-title="2019-01-29 11.41.28" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/01/2019-01-29-11.41.28.jpg" src="/blog-media/2019/01/2019-01-29-11.41.28.jpg" alt="2019-01-29 11.41.28" class="wp-image-2072" /><figcaption>Board all connected up (Simple eh?)</figcaption></figure></div>



<h3 class="wp-block-heading">Step Two: Program</h3>



<p class="wp-block-paragraph">Grab the Arduino IDE and follow <a href="https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/">these instructions</a> to get your board ready for programming. Make sure you select &#8220;NodeMCU (ESP-12E Module)&#8221; from Tools &gt; Boards before you attempt an upload.</p>



<p class="wp-block-paragraph">Install the FastLED library by going to Sketch &gt; Include Library &gt; Library Manager. Search for FastLED and click install.</p>



<p class="wp-block-paragraph">Now let&#8217;s grab a modified example from the FastLED library and use that as the foundation of our code. Grab the following code and paste it in to the editor</p>



<p class="wp-block-paragraph"><a href="https://gist.github.com/milesburton/6711807a63fd060337960ced636019b8">https://gist.github.com/milesburton/6711807a63fd060337960ced636019b8</a></p>



<p class="wp-block-paragraph">Upload the sketch to the ESP8266. Sketch &gt; Upload</p>



<h3 class="wp-block-heading">Step Three: 3D Printin&#8217; (Optional)</h3>



<figure class="wp-block-image"><img data-attachment-id="2076" data-permalink="http://blog.milesburton.com/image/" data-orig-file="/blog-media/2019/01/image.png" data-orig-size="1071,834" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/01/image.png" src="/blog-media/2019/01/image.png" alt="" class="wp-image-2076" /><figcaption>ESP8266 with battery case (v2)</figcaption></figure>



<p class="wp-block-paragraph">Head over to <a href="https://www.tinkercad.com/things/c90SvjKzlB6">Tinkercad</a> and print out the case I designed specifically for this project. </p>



<h3 class="wp-block-heading"> Step Four: Put it all together</h3>



<div class="wp-block-image"><figure class="aligncenter"><img loading="lazy" width="1024" height="768" data-attachment-id="2073" data-permalink="/blog/quick-build-battery-powered-rgb-neopixels-with-the-esp8266/" data-orig-file="/blog-media/2019/01/2019-01-29-11.44.57.jpg" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone XS&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1548762297&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;4.25&quot;,&quot;iso&quot;:&quot;400&quot;,&quot;shutter_speed&quot;:&quot;0.020408163265306&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;51.475738888889&quot;,&quot;longitude&quot;:&quot;0.17114166666667&quot;}" data-image-title="2019-01-29 11.44.57" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/01/2019-01-29-11.44.57.jpg" src="/blog-media/2019/01/2019-01-29-11.44.57.jpg" alt="" class="wp-image-2073" srcset="/blog-media/2019/01/2019-01-29-11.44.57.jpg 1024w, /blog-media/2019/01/2019-01-29-11.44.57.jpg 2048w, /blog-media/2019/01/2019-01-29-11.44.57.jpg 150w, /blog-media/2019/01/2019-01-29-11.44.57.jpg 300w, /blog-media/2019/01/2019-01-29-11.44.57.jpg 768w, /blog-media/2019/01/2019-01-29-11.44.57.jpg 1440w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /><figcaption>Screw it!</figcaption></figure></div>



<p class="wp-block-paragraph">In my initial prototypes I simply zip tied the controller to the skateboard, with the case you could do something similar or my next favourite, use a glue gun &#8211; that works pretty well and is fairly easy to remove when you upgrade your controller.</p>



<p class="wp-block-paragraph">I used <a href="https://www.ebay.co.uk/itm/180Pcs-M3-Nylon-Black-M-F-Hex-Spacers-Screw-Nut-Assortment-Kit-Stand-off-Set-Hot/173468637615?epid=1987684667&amp;hash=item28638959af:g:nesAAOSwIgNXleJF">M3 nut and screws</a> so the controller is still accessible but you could go ahead and zip tie or even glue it together &#8211; what ever your preference is. </p>



<figure class="wp-block-embed-youtube aligncenter wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/VxV4pOdJCrk?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<h3 class="wp-block-heading">Part ∞: What&#8217;s next?</h3>



<p class="wp-block-paragraph">As I alluded to in the introduction, this was only ever a prototype to what I was actually building &#8211; it just ended up looking pretty awesome without enhancements.</p>



<p class="wp-block-paragraph">With that in mind, here&#8217;s a few enhancements I&#8217;m working on:</p>



<ul class="wp-block-list"><li>Add GPS to synchronise the lighting animations with your speed (easy)</li><li>Use an accelerometer to direct animations to the axis your board is travelling (emphasise carving etc). This is a bit tricky as you&#8217;re now in a 3D space so you get to crack open the maths book!</li><li>Reduce the size of the controller unit by moving to a bare ESP8266 and  battery controller &#8211; in theory you could have a functioning system a quarter the size of this setup</li><li>Turn the setup into a equaliser, use your phone to control animations from your music!</li></ul>



<p class="wp-block-paragraph">On a parting note, another rider went a step further and actually modified the internal electrics on the board to pull off a similar effect &#8211; if you&#8217;re feeling brave, <a href="https://www.mcduffchannel.com/441683542">check this out</a></p>

