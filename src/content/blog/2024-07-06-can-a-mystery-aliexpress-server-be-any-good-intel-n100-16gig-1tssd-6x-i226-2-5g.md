---
title: "Can a mystery AliExpress server be any good? Intel N100/16Gig/1TSSD/6x i226 2.5g"
date: 2024-07-06
slug: "can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g"
categories: ["Reviews"]
tags: []
excerpt: "When you think of low-power, budget-friendly setups for routers, mini desktops, media centres, and various projects, the Raspberry Pi often comes to mind. Its barebones form factor and minimal power consumption are appealing. However, Raspberry PIs have become hard to find, expen"
---

<p class="wp-block-paragraph">When you think of low-power, budget-friendly setups for routers, mini desktops, media centres, and various projects, the Raspberry Pi often comes to mind. Its barebones form factor and minimal power consumption are appealing. However, Raspberry PIs have become hard to find, expensive, and often require a plethora of peripherals just to get started. Sometimes, you simply want to run a clean copy of Windows or Linux. Until fairly recently, your only x86 platform options were limited to the likes of the feeble AMD Geode or Intel Celeron processors.</p>



<p class="wp-block-paragraph">Enter the <a href="https://ark.intel.com/content/www/us/en/ark/products/231803/intel-processor-n100-6m-cache-up-to-3-40-ghz.html">Intel N100</a>. This 3.4GHz, 4-core Alder Lake-based processor boasts an impressive 6W TDP.</p>



<p class="wp-block-paragraph">Due to its absurdly low price, the Intel N100 has sparked a wave of new machines. Personally, I was in the market for a small, affordable, low-power router to replace the subpar unit provided by my ISP. The Raspberry Pi wasn&#8217;t a viable option for me; I didn&#8217;t want to deal with a tangle of devices connected to a delicate and pricey little PCB. Instead, I decided to give the Intel N100 a try. I started with a tiny <a href="https://www.aliexpress.com/item/1005005234838380.html">£99 N100 NUC</a> &#8220;FIREBAT Pro&#8221;, featuring 3.4GHz processing speed, 16GB RAM, and a 512GB SSD, modified to run on USB-C. However, it was limited by two 1GbE ethernet adapters.</p>



<p class="wp-block-paragraph">While this setup has been running smoothly for seven months, my recent FTTP upgrade has me eyeing a transition towards 10GbE. That’s when this <a href="https://www.aliexpress.com/item/1005006829162894.html">little beast caught my attention</a> </p>



<figure class="wp-block-image size-large"><a href="/blog-media/2024/07/server.jpg"><img loading="lazy" width="1024" height="490" data-attachment-id="2215" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/server.jpg" data-orig-size="3859,1850" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1720268992&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="Server" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/server.jpg" src="/blog-media/2024/07/server.jpg" alt="" class="wp-image-2215" srcset="/blog-media/2024/07/server.jpg 1024w, /blog-media/2024/07/server.jpg 2048w, /blog-media/2024/07/server.jpg 150w, /blog-media/2024/07/server.jpg 300w, /blog-media/2024/07/server.jpg 768w, /blog-media/2024/07/server.jpg 1440w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a></figure>



<p class="wp-block-paragraph">Like my oddly named <em>FIREBAT Pro</em>, this new setup also features an N100, but with a few notable upgrades. We&#8217;ve swapped the 512GB SSD for a <strong>branded</strong> <em>(*gasps* from the audience)</em> Kingston SNV2S 1TB, housed in a fully passive metal case. And the<em> pièce de résistance</em>: six 2.5GbE Intel i226 ethernet controllers, all for around £200 including delivery &#8211; <em>bargain!</em></p>



<p class="wp-block-paragraph">According to AliExpress, It&#8217;s a WooYi G31B <em>(yeah I have no idea either)</em>. Despite my best I couldn&#8217;t find many details on the unit.</p>



<p class="wp-block-paragraph">Naturally, I share your scepticism about buying no-name products from China, especially those that might catch fire <em>(ah the balance boards)</em>. Luckily I chose ignore those inhibitions and carry on regardless. </p>



<h2 class="wp-block-heading">Power consumption</h2>



<p class="wp-block-paragraph">First up, let&#8217;s take a look at the all-important power consumption. <em>Conditions: Only two ethernet adapters are active, the tests are carried out against the Proxmox host itself via SSH, no VMs are running. To generate load we are using the following command <code>sysbench --time=0 --threads=4 cpu run</code></em></p>



<p class="wp-block-paragraph"><em>Note: The left terminal shows the current frequency of the cores. The right, an output from lm-sensors</em></p>



<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-8f761849 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
<h2 class="wp-block-heading has-text-align-center"> Idle</h2>


<div class="wp-block-image wp-duotone-unset-1">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/idling.png"><img loading="lazy" width="1024" height="441" data-attachment-id="2218" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/idling.png" data-orig-size="1755,756" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="Idling" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/idling.png" src="/blog-media/2024/07/idling.png" alt="" class="wp-image-2218" srcset="/blog-media/2024/07/idling.png 1024w, /blog-media/2024/07/idling.png 150w, /blog-media/2024/07/idling.png 300w, /blog-media/2024/07/idling.png 768w, /blog-media/2024/07/idling.png 1440w, /blog-media/2024/07/idling.png 1755w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a><figcaption class="wp-element-caption">42 Degrees @ 3Ghz</figcaption></figure>
</div></div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
<h2 class="wp-block-heading has-text-align-center">Full Load</h2>


<div class="wp-block-image">
<figure class="aligncenter size-large is-resized"><a href="/blog-media/2024/07/burninscreen-crop-1.png"><img loading="lazy" width="1024" height="536" data-attachment-id="2221" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/burninscreen-crop-1.png" data-orig-size="1427,748" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="BurninScreen-crop" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/burninscreen-crop-1.png" src="/blog-media/2024/07/burninscreen-crop-1.png" alt="" class="wp-image-2221" style="width:340px;height:auto" srcset="/blog-media/2024/07/burninscreen-crop-1.png 1024w, /blog-media/2024/07/burninscreen-crop-1.png 150w, /blog-media/2024/07/burninscreen-crop-1.png 300w, /blog-media/2024/07/burninscreen-crop-1.png 768w, /blog-media/2024/07/burninscreen-crop-1.png 1427w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a><figcaption class="wp-element-caption">64 Degrees @ 3Ghz</figcaption></figure>
</div></div>
</div>



<p class="wp-block-paragraph">Curiously in both tests the cores didn&#8217;t appear to change frequency particularly drastically. This is likely due to the CPU governor on Proxmox. If there&#8217;s sufficient interest I may rerun this after either switching to bare-metal or playing around with the governor settings.</p>



<h2 class="wp-block-heading">Case Thermals</h2>



<p class="wp-block-paragraph">Next up, lets take a look at the exterior of the case with a thermal imaging camera. As a quick reminder it&#8217;s all metal, whilst I haven&#8217;t torn the machine down as of yet I would presume this is directly connected to the CPU heat sink (or at least has some sort of bonding &#8211; then again, <em>AliExpress 😉</em>)</p>



<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-8f761849 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"><div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/1720270589577.jpg"><img loading="lazy" width="509" height="1023" data-attachment-id="2225" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/1720270589577/" data-orig-file="/blog-media/2024/07/1720270589577.jpg" data-orig-size="716,1440" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;SPI_5840&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;0&quot;,&quot;longitude&quot;:&quot;0&quot;}" data-image-title="1720270589577" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/1720270589577.jpg" src="/blog-media/2024/07/1720270589577.jpg" alt="" class="wp-image-2225" srcset="/blog-media/2024/07/1720270589577.jpg 509w, /blog-media/2024/07/1720270589577.jpg 75w, /blog-media/2024/07/1720270589577.jpg 149w, /blog-media/2024/07/1720270589577.jpg 716w" sizes="auto, (max-width: 509px) 100vw, 509px" /></a><figcaption class="wp-element-caption">Approximately 41C</figcaption></figure>
</div></div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"><div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/thermal.jpg"><img loading="lazy" width="595" height="1023" data-attachment-id="2227" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/thermal.jpg" data-orig-size="749,1288" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;SPI_5840&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;0&quot;,&quot;longitude&quot;:&quot;0&quot;}" data-image-title="Thermal" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/thermal.jpg" src="/blog-media/2024/07/thermal.jpg" alt="" class="wp-image-2227" srcset="/blog-media/2024/07/thermal.jpg 595w, /blog-media/2024/07/thermal.jpg 87w, /blog-media/2024/07/thermal.jpg 174w, /blog-media/2024/07/thermal.jpg 749w" sizes="auto, (max-width: 595px) 100vw, 595px" /></a><figcaption class="wp-element-caption">Approximately 45C</figcaption></figure>
</div></div>
</div>



<p class="wp-block-paragraph">This test took me a bit by surprise. My assumption was that there would be a noticeable difference in temperature between idle and full load. Yet, as you can see, the difference is barely identifiable. It’s possible that the machine is positioned near other equipment, though I would have thought the thermal camera would pick that up. My other thought is the N100 simply does not have that much impact on the overall thermal output. Regardless, it&#8217;s an interesting result.</p>



<h2 class="wp-block-heading">Time to dig out the Watt meter</h2>



<p class="wp-block-paragraph">Let&#8217;s move on to the power consumption (excuse the scruffy Watt meter)</p>



<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-8f761849 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"><div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/wattmeteridle.png"><img loading="lazy" width="671" height="1023" data-attachment-id="2231" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/wattmeteridle.png" data-orig-size="1150,1754" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="WattMeterIdle" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/wattmeteridle.png" src="/blog-media/2024/07/wattmeteridle.png" alt="" class="wp-image-2231" srcset="/blog-media/2024/07/wattmeteridle.png 671w, /blog-media/2024/07/wattmeteridle.png 98w, /blog-media/2024/07/wattmeteridle.png 197w, /blog-media/2024/07/wattmeteridle.png 768w, /blog-media/2024/07/wattmeteridle.png 1150w" sizes="auto, (max-width: 671px) 100vw, 671px" /></a><figcaption class="wp-element-caption">Hovering around 15 Watts at Idle</figcaption></figure>
</div></div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"><div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/wattmeter.jpg"><img loading="lazy" width="748" height="1023" data-attachment-id="2233" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/wattmeter.jpg" data-orig-size="1192,1631" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1720269087&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;}" data-image-title="WattMeter" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/wattmeter.jpg" src="/blog-media/2024/07/wattmeter.jpg" alt="" class="wp-image-2233" srcset="/blog-media/2024/07/wattmeter.jpg 748w, /blog-media/2024/07/wattmeter.jpg 110w, /blog-media/2024/07/wattmeter.jpg 219w, /blog-media/2024/07/wattmeter.jpg 768w, /blog-media/2024/07/wattmeter.jpg 1192w" sizes="auto, (max-width: 748px) 100vw, 748px" /></a><figcaption class="wp-element-caption">At full load a touch over 23 Watts</figcaption></figure>
</div></div>
</div>



<p class="wp-block-paragraph">The difference between idle &amp; load again isn&#8217;t massive. In contract my <em>FIREBAT T8 Pro </em>seemed to have a much wider range from 6 Watts idle to about 26 Watts (from memory) however that was under somewhat more lax testing. </p>



<h2 class="wp-block-heading">Kingston SNV2S 1TB SSD Benchmark <em>*N100 Specific</em></h2>



<p class="wp-block-paragraph">This test will be somewhat more tricky as it will be specific to a running Proxmox host which is rarely a great way to get real world metrics of the SSD so the following is purely for your curiosity. <em>If you&#8217;d like the metrics of the specific SSD, they are widely publicised &#8211; it&#8217;s a surprisingly fast SSD for the cost, around 3.5Gb/sec sequential read, and 2.5Gb/sec sequential write.</em></p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p class="wp-block-paragraph">root@pve3:~# pveperf<br>CPU BOGOMIPS: 6451.20<br>REGEX/SECOND: 4809827<br>HD SIZE: 93.93 GB (/dev/mapper/pve-root)<br><strong>BUFFERED READS: 787.59 MB/sec</strong><br>AVERAGE SEEK TIME: 0.07 ms<br>FSYNCS/SECOND: 1426.09<br>DNS EXT: 11.41 ms<br>DNS INT: 5.53 ms (localdomain)<br>root@pve3:~#</p>
</blockquote>



<p class="wp-block-paragraph">Not great, but not the end of the world. Let&#8217;s try Windows 11 on a VM</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/diskperf.png"><img loading="lazy" width="1024" height="559" data-attachment-id="2243" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/diskperf.png" data-orig-size="1601,875" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="diskperf" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/diskperf.png" src="/blog-media/2024/07/diskperf.png" alt="" class="wp-image-2243" srcset="/blog-media/2024/07/diskperf.png 1024w, /blog-media/2024/07/diskperf.png 150w, /blog-media/2024/07/diskperf.png 300w, /blog-media/2024/07/diskperf.png 768w, /blog-media/2024/07/diskperf.png 1440w, /blog-media/2024/07/diskperf.png 1601w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a><figcaption class="wp-element-caption">Approximate 1.7GB Read, 1.3GB Write using Write back. Respectable</figcaption></figure>
</div>


<h2 class="wp-block-heading">Network performance</h2>



<p class="wp-block-paragraph">Linux to Linux</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/image-4.png"><img loading="lazy" width="1024" height="138" data-attachment-id="2245" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/image-4.png" data-orig-size="1902,257" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/image-4.png" src="/blog-media/2024/07/image-4.png" alt="" class="wp-image-2245" srcset="/blog-media/2024/07/image-4.png 1024w, /blog-media/2024/07/image-4.png 150w, /blog-media/2024/07/image-4.png 300w, /blog-media/2024/07/image-4.png 768w, /blog-media/2024/07/image-4.png 1440w, /blog-media/2024/07/image-4.png 1902w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a><figcaption class="wp-element-caption">Looks like the perf test saturated the adapter which is great</figcaption></figure>
</div>


<p class="wp-block-paragraph">Just out of curiosity let&#8217;s try a real world test of copying a file from a SMB share. This will be contained by the network protocol and disk speeds so isn&#8217;t representative for other setups, that said it&#8217;s interesting to see how such a system would perform as a desktop machine.</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/image-5.png"><img loading="lazy" width="875" height="595" data-attachment-id="2247" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/image-5.png" data-orig-size="875,595" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/image-5.png" src="/blog-media/2024/07/image-5.png" alt="" class="wp-image-2247" srcset="/blog-media/2024/07/image-5.png 875w, /blog-media/2024/07/image-5.png 150w, /blog-media/2024/07/image-5.png 300w, /blog-media/2024/07/image-5.png 768w" sizes="auto, (max-width: 875px) 100vw, 875px" /></a><figcaption class="wp-element-caption">Excellent. That&#8217;s roughly what I expected. SMB seems to top out at around 260MB</figcaption></figure>
</div>


<h2 class="wp-block-heading">Connectivity</h2>



<p class="wp-block-paragraph">Connectivity on this box looks rather good given the form factor. Here&#8217;s the headline expansion ports (full specification at the bottom of the article)</p>



<ul class="wp-block-list">
<li>External
<ul class="wp-block-list">
<li>1x Full sized M2 2280 (Gen 3)</li>



<li>1x mPCI-E</li>



<li>4x USB 2.0</li>



<li>2x WIFI</li>
</ul>
</li>



<li>Internal
<ul class="wp-block-list">
<li>1x SATA 3</li>



<li>1x USB 2.0</li>
</ul>
</li>
</ul>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/image-8.png"><img loading="lazy" width="1024" height="343" data-attachment-id="2256" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/image-8.png" data-orig-size="3596,1205" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/image-8.png" src="/blog-media/2024/07/image-8.png" alt="" class="wp-image-2256" srcset="/blog-media/2024/07/image-8.png 1024w, /blog-media/2024/07/image-8.png 2048w, /blog-media/2024/07/image-8.png 150w, /blog-media/2024/07/image-8.png 300w, /blog-media/2024/07/image-8.png 768w, /blog-media/2024/07/image-8.png 1440w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a><figcaption class="wp-element-caption">A modest set of ports can be found on the rear. The front is dedicated to the ethernet ports</figcaption></figure>
</div>


<p class="wp-block-paragraph">I&#8217;d have liked to have seen two M2 sockets but that&#8217;s not uncommon with devices that are this size. It <em>may</em> be possible to use some trickery with the mPCIE-E but I wouldn&#8217;t hold my breath. You do however have the SATA port which should in theory allow a further two devices but I haven&#8217;t tested this configuration yet.</p>



<h2 class="wp-block-heading">Raspberry Pi 5 vs. AliExpress <em>mystery server</em> price comparison</h2>



<p class="wp-block-paragraph">As I alluded to, a populate favourite for DIY NAS&#8217;, media centres and similar tasks is the beloved Raspberry PI. Personally I don&#8217;t feel it&#8217;s particularly well suited nor do they currently have a comparable system, however as an academic task let&#8217;s put together a shopping list.</p>



<ul class="wp-block-list">
<li><a href="https://thepihut.com/products/raspberry-pi-5?variant=42531604955331">Raspberry PI 5 8GB Starter Kit &#8211; £76.80</a> </li>



<li><a href="https://thepihut.com/products/m-2-pcie-to-2280-nvme-top-extension-adapter-board-for-raspberry-pi-5-n04">M.2 PCIe to 2280 NVMe Top Extension Adapter Board &#8211; £16.20</a> </li>



<li><a href="https://thepihut.com/products/raspberry-pi-27w-usb-c-power-supply">27W Power supply &#8211; £11.60</a></li>



<li><a href="https://www.amazon.co.uk/Kingston-NVMe-PCIe-1000G-SNV2S/dp/B0BBWH1R8H">Kingston NV2 1TB NVME &#8211; £55.44</a></li>



<li><a href="https://www.amazon.co.uk/2-5GBase-T-Network-RTL8156B-Ethernet-Controller/dp/B097RF9PZH">2.5Gbe USB 3.0 Network Adapter &#8211; £22.99</a> * 2 = £46</li>
</ul>



<p class="wp-block-paragraph">Estimated total excluding delivery is <strong>£206.04</strong></p>



<p class="wp-block-paragraph">Of course we&#8217;re lacking an additional 8GB of RAM and the remaining four 2.5GbE adapters, but we&#8217;re exhausted IO (maybe some studio engineering with the M2 base could assist here?). This also excludes a case, dual WIFI, COM port, SATA etc.</p>



<p class="wp-block-paragraph">In short at the moment the Raspberry PI cannot compete on price or functionality. I think in this scenario there are better options. Speaking of which, I spotted some development kits that utilities the ARM architecture which should, in theory, be more power efficient than our <em>Mystery Server</em> &#8211; that could be another option. </p>



<h2 class="wp-block-heading">Verdict</h2>



<p class="wp-block-paragraph">So there we have it. In the short time I’ve owned this micro-server, it has proven to be quite capable. Given that the unit is passive and appears to regulate internal temperature rather well, it could be perfect for a &#8220;bedroom lab&#8221; or even a media PC. I would consider upgrading the SSD to something larger, given the limited expansion options.</p>



<p class="wp-block-paragraph">With a price tag of £200 at the time of writing, you get a lot of hardware for a relatively small investment.</p>



<p class="wp-block-paragraph">Overall, if you understand the machine&#8217;s limitations, I’d say go for it. </p>



<p class="wp-block-paragraph"></p>



<h2 class="wp-block-heading">Misc</h2>



<h2 class="wp-block-heading">Racking</h2>



<p class="wp-block-paragraph">For those with homelabs you may be wondering if the micro-server has mounting holes for racking to a server case. Unfortunately the answer is no. There is however a VESA bracket on the back which could be of use. If anyone gets brave and decides to take a drill, let me know how you get on. </p>



<h2 class="wp-block-heading">Mystery board</h2>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/07/image-1.png"><img loading="lazy" width="823" height="433" data-attachment-id="2235" data-permalink="/blog/can-a-mystery-aliexpress-server-be-any-good-intel-n100-16gig-1tssd-6x-i226-2-5g/" data-orig-file="/blog-media/2024/07/image-1.png" data-orig-size="823,433" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/07/image-1.png" src="/blog-media/2024/07/image-1.png" alt="" class="wp-image-2235" srcset="/blog-media/2024/07/image-1.png 823w, /blog-media/2024/07/image-1.png 150w, /blog-media/2024/07/image-1.png 300w, /blog-media/2024/07/image-1.png 768w" sizes="auto, (max-width: 823px) 100vw, 823px" /></a><figcaption class="wp-element-caption">Apparently the manufacturer doesn&#8217;t want us to know very much about the motherboard</figcaption></figure>
</div>


<h2 class="wp-block-heading">Specification</h2>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p class="wp-block-paragraph">1 x DDR5 262PIN SO-DIMM Slot Memory Type DDR5 4800 MHz<br>Maximum Support 16GB <em>(ED:</em> allegedly this can actually support 32GB)<br>1x SATA3.0 Interface<br>1x M2 2280 Solid State Drive Interface (NVME protocol only)<br>1xMINI PCI-E connector (only supports 4G, WIFI or Bluetooth over USB)<br>Onboard INTEL 1225&#215;6 2.5G NIC chipset<br>1xDC IN power supply connector<br>2x Dual Layer USB2.0 ports 1x Power On/Off Button<br>1xDP+ HD Display Interface<br>1xLED light<br>1xSATA power supply interface<br>1&#215;7!boardin SATA connector<br>6x LAN Interface<br>1xRJ45 COM connector<br>1xUSB2.0 pin (1xCPU fan power socket can be connected to 2xUSB2.0 ports)<br>1xSIM card slot<br>1xJGPIO (8-way)</p>



<p class="wp-block-paragraph"></p>
</blockquote>

