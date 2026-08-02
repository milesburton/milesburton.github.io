---
title: "Replacing the ISP-Supplied Router with OPNsense on Vodafone FTTP (OpenReach)"
date: 2024-12-15
slug: "replacing-the-isp-supplied-router-with-opnsense-on-vodafone-fttp-openreach"
categories: ["HOWTO"]
tags: ["Networking", "Home Lab"]
excerpt: "Many home lab enthusiasts and network power-users quickly find themselves outgrowing the capabilities and limitations of their ISP-supplied router. While some keep this device as a simple bridge to a more enterprise-grade solution, such as OPNsense or pfSense, this leaves unnecessa"
---

<div class="wp-block-media-text has-media-on-the-right is-stacked-on-mobile is-vertically-aligned-top"><div class="wp-block-media-text__content">
<p class="wp-block-paragraph">Many home lab enthusiasts and network power-users quickly find themselves outgrowing the capabilities and limitations of their ISP-supplied router. While some keep this device as a simple bridge to a more enterprise-grade solution, such as OPNsense or pfSense, this leaves unnecessary hardware consuming power and potentially adds another attack surface, should the ISP router be exploited.</p>



<p class="wp-block-paragraph">Fortunately, removing the supplied router altogether is straightforward, although not widely documented. Before we begin, note that this guide applies to Openreach FTTP connections with Vodafone as your ISP. If you’re lucky enough to use CityFibre, you may find you can bypass the ISP router without any additional faffing around.</p>
</div><figure class="wp-block-media-text__media"><img loading="lazy" width="1024" height="1024" data-attachment-id="2294" data-permalink="/blog/replacing-the-isp-supplied-router-with-opnsense-on-vodafone-fttp-openreach/" data-orig-file="/blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp" data-orig-size="1024,1024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="DALL·E 2024-12-15 14.23.50 &amp;#8211; A cartoon-style illustration of a router, resembling the one provided by the user, being hung. The router should be shown hanging by a rope or wire in" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp" src="/blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp" alt="" class="wp-image-2294 size-full" srcset="/blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp 1024w, /blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp 150w, /blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp 300w, /blog-media/2024/12/dallc2b7e-2024-12-15-14.23.50-a-cartoon-style-illustration-of-a-router-resembling-the-one-provided-by-the-user-being-hung.-the-router-should-be-shown-hanging-by-a-rope-or-wire-in-2.webp 768w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></figure></div>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph"><strong>A Brief FTTP Primer</strong><br>FTTP (Fibre to the Premises) differs from ADSL or cable broadband in that you have an ONT (Optical Network Terminator) acting essentially as a modem. However, the ONT alone does not provide routing capabilities or NAT. For home users, the ISP-supplied router typically handles NAT, Wi-Fi, and other services. Removing this router means your OPNsense device will need to perform NAT and authentication directly, giving you more control and the freedom to implement advanced features like DNS filtering, BOOTP, and QoS.</p>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph"><strong>Step One: Obtain Your PPPoE Credentials from Vodafone</strong><br>Contact Vodafone’s customer support via live chat and request your PPPoE credentials. They will provide a set of details similar to the following:</p>



<ul class="wp-block-list">
<li><strong>Username:</strong> <code>user@broadband.vodafone.co.uk</code></li>



<li><strong>Password:</strong> <code>asASdk43,</code></li>



<li><strong>VLAN:</strong> <code>101</code></li>



<li><strong>VPI:</strong> <code>0</code></li>



<li><strong>VCI:</strong> <code>38</code></li>



<li><strong>Encapsulation/Protocol:</strong> PPPoA or PPP over ATM</li>



<li><strong>Framing/Multiplexing:</strong> VC-based or VC-MUX</li>



<li><strong>Modulation:</strong> Multimode or Auto</li>



<li><strong>Security/Authentication:</strong> CHAP</li>



<li><strong>Idle Timeout:</strong> No or 0</li>



<li><strong>MTU:</strong> 1492</li>



<li><strong>IP Address/Gateway:</strong> Obtain automatically from ISP</li>
</ul>



<p class="wp-block-paragraph">Note: Some of these settings (like VPI/VCI) are legacy ADSL terms and may not be directly relevant for FTTP, but it’s useful to have them on hand.</p>



<p class="wp-block-paragraph"><strong>Step Two: Create a New PPPoE Interface in OPNsense</strong></p>



<ol class="wp-block-list">
<li>Log in to your OPNsense dashboard.</li>



<li>Navigate to <strong>Interfaces &gt; Point to Point &gt; Devices</strong>.</li>



<li>Click <strong>Add</strong> to create a new PPP device.</li>



<li>Adjust the following settings:
<ul class="wp-block-list">
<li><strong>Link Type:</strong> PPPoE</li>



<li><strong>Link Interface:</strong> This should be your WAN interface connected to the ONT.</li>



<li><strong>Username:</strong> As provided by Vodafone</li>



<li><strong>Password:</strong> As provided by Vodafone</li>



<li><strong>Dial On Demand:</strong> Tick (optional)</li>



<li><strong>MTU:</strong> 1492</li>
</ul>
</li>



<li>Click <strong>Save</strong>, then <strong>Apply</strong>.</li>
</ol>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/12/image.png"><img loading="lazy" width="1024" height="286" data-attachment-id="2273" data-permalink="/blog/replacing-the-isp-supplied-router-with-opnsense-on-vodafone-fttp-openreach/" data-orig-file="/blog-media/2024/12/image.png" data-orig-size="4428,1237" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/12/image.png" src="/blog-media/2024/12/image.png" alt="" class="wp-image-2273" srcset="/blog-media/2024/12/image.png 1024w, /blog-media/2024/12/image.png 2048w, /blog-media/2024/12/image.png 150w, /blog-media/2024/12/image.png 300w, /blog-media/2024/12/image.png 768w, /blog-media/2024/12/image.png 1440w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></a></figure>
</div>


<p class="wp-block-paragraph"><strong>Step Three: Update Your WAN Interface to Use PPPoE</strong></p>



<ol class="wp-block-list">
<li>Go to <strong>Interfaces &gt; [WAN]</strong>.</li>



<li>For <strong>IPv4 Configuration Type</strong>, select <strong>PPPoE</strong>.</li>



<li>Set <strong>MTU</strong> to <strong>1492</strong>.</li>



<li>Enter the Vodafone-supplied username and password.</li>



<li>Click <strong>Save</strong>, then <strong>Apply</strong>.</li>
</ol>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/12/image-2.png"><img loading="lazy" width="694" height="1023" data-attachment-id="2280" data-permalink="/blog/replacing-the-isp-supplied-router-with-opnsense-on-vodafone-fttp-openreach/" data-orig-file="/blog-media/2024/12/image-2.png" data-orig-size="1213,1789" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/12/image-2.png" src="/blog-media/2024/12/image-2.png" alt="" class="wp-image-2280" srcset="/blog-media/2024/12/image-2.png 694w, /blog-media/2024/12/image-2.png 102w, /blog-media/2024/12/image-2.png 203w, /blog-media/2024/12/image-2.png 768w, /blog-media/2024/12/image-2.png 1213w" sizes="auto, (max-width: 694px) 100vw, 694px" /></a></figure>
</div>


<p class="wp-block-paragraph"><strong>Step Four: Power-Cycle and Test</strong></p>



<ol class="wp-block-list">
<li>Power off your ONT and then turn it back on after a few moments.</li>



<li>Reboot your OPNsense device.</li>



<li>Once it restarts, check the OPNsense dashboard to confirm that your WAN interface has obtained a valid IP address. You should now see a public IP address assigned, indicating that the PPPoE authentication has succeeded.</li>
</ol>


<div class="wp-block-image">
<figure class="aligncenter size-large"><a href="/blog-media/2024/12/image-3.png"><img loading="lazy" width="943" height="540" data-attachment-id="2282" data-permalink="/blog/replacing-the-isp-supplied-router-with-opnsense-on-vodafone-fttp-openreach/" data-orig-file="/blog-media/2024/12/image-3.png" data-orig-size="943,540" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image" data-image-description="" data-image-caption="" data-large-file="/blog-media/2024/12/image-3.png" src="/blog-media/2024/12/image-3.png" alt="" class="wp-image-2282" srcset="/blog-media/2024/12/image-3.png 943w, /blog-media/2024/12/image-3.png 150w, /blog-media/2024/12/image-3.png 300w, /blog-media/2024/12/image-3.png 768w" sizes="auto, (max-width: 943px) 100vw, 943px" /></a></figure>
</div>


<p class="wp-block-paragraph"><strong>Note:</strong> The IP listed under <em>WAN </em>should be used for any external services you wish to route back to your network, for example if you are hosting a website etc. (I&#8217;ve obfuscated mine here for obvious reasons)</p>



<p class="wp-block-paragraph"><strong>Verification and Troubleshooting</strong></p>



<ul class="wp-block-list">
<li>If you do not receive an IP address, double-check the username, password, and MTU settings.</li>



<li>Ensure that VLAN 101 (if required by Vodafone) is set correctly.</li>



<li>Review the system logs in OPNsense for any PPPoE-related errors.</li>
</ul>



<p class="wp-block-paragraph">Once this setup is complete, your OPNsense device will be functioning as your primary router and firewall, without the ISP-supplied router acting as a middleman. This streamlined approach reduces complexity, energy consumption, and potential vulnerabilities, while giving you complete control over advanced networking features.</p>



<p class="wp-block-paragraph"><strong>Next Steps</strong><br>Consider taking advantage of OPNsense’s powerful features:</p>



<ul class="wp-block-list">
<li><strong>VLANs:</strong> Isolate different parts of your network, such as IoT devices or guest Wi-Fi.</li>



<li><strong>Traffic Shaping/QoS:</strong> Prioritise critical services and maintain a high-quality online experience.</li>



<li><strong>DNS Filtering and Intrusion Detection:</strong> Improve security and privacy by controlling DNS queries and monitoring for malicious traffic.</li>



<li><strong>VPN Integration:</strong> Securely access your network remotely.</li>
</ul>



<p class="wp-block-paragraph">With OPNsense running directly on your Openreach FTTP connection, you’ll have a more efficient, secure, and customisable home network environment. Enjoy your newly upgraded setup!</p>

