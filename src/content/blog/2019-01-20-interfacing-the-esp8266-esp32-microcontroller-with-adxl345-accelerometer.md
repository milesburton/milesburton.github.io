---
title: "Interfacing the ESP8266/ESP32 Microcontroller with ADXL345 Accelerometer"
date: 2019-01-20
slug: "interfacing-the-esp8266-esp32-microcontroller-with-adxl345-accelerometer"
categories: ["Thoughts"]
tags: ["ADXL345","Arduino","ESP8266","IOT"]
excerpt: "Information around the ADXL345 Accelerometer is rather sparse online so I wanted to make a quick blog post for those of you who are wanting to have a play with this very cool IC. In short the ADXL345 is an ultra low cost accelerometer which can be used to measure, err, accelerati"
---
<p>Information around the ADXL345 Accelerometer is rather sparse online so I wanted to make a quick blog post for those of you who are wanting to have a play with this very cool IC.</p>
<p>In short the ADXL345 is an ultra low cost accelerometer which can be used to measure, err, acceleration in three axis. What&#8217;s particularly great about the IC is you can interface either using I2C or SPI &#8211; both of which the ESP supports. It is also operates at 3.3 volts which makes it a perfect match for the ESP microcontroller!</p>
<p>The ADXL345 only requires two IO pin from the ESP, plus power. In most configurations you can connect it directly to the IC without any additional circuitry. Unfortunately most of the off the shelf libraries I&#8217;ve seen assume you are using an Arduino and hard code the digital outputs &#8211; this is entirely arbitrary, you are able to use whatever pins you have available to you.</p>
<p>To use the ADXL345 in I2C (One wire mode) you need to connect the pins as follows (as before, you can hook SDA/SCL to whatever pins you prefer):</p>
<p><img loading="lazy" data-attachment-id="2030" data-permalink="/blog/interfacing-the-esp8266-esp32-microcontroller-with-adxl345-accelerometer/" data-orig-file="/blog-media/2019/01/selection_019.png" data-orig-size="381,274" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="selection_019" data-image-description="" data-image-caption="" data-large-file="/blog-media/2019/01/selection_019.png" class=" size-full wp-image-2030 aligncenter" src="/blog-media/2019/01/selection_019.png" alt="selection_019" width="381" height="274" srcset="/blog-media/2019/01/selection_019.png 381w, /blog-media/2019/01/selection_019.png 150w, /blog-media/2019/01/selection_019.png 300w" sizes="auto, (max-width: 381px) 100vw, 381px" /></p>
<p><em>(Excuse the ghetto LibreCalc screenshot)</em></p>
<p>Thanks to Sparkfun, here&#8217;s an edited version of their example which will work with the above. (Please add the Wire library, along with the ESP8266 library to the Arduino IDE)</p>
<style>.gist table { margin-bottom: 0; }</style>
<div style="tab-size: 8" id="gist94177698" class="gist">
<div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
<div class="gist-data">
<div class="js-gist-file-update-container js-task-list-container">
<div id="file-gistfile1-txt" class="file my-2">
<div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-text  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="gistfile1.txt content, created by milesburton on 11:31AM on January 20, 2019."
    ></p>
<div class="js-check-hidden-unicode js-blob-code-container blob-code-content">
<p>  <template class="js-file-alert-template"></p>
<div data-view-component="true" class="flash flash-warn flash-full d-flex flex-items-center">
  <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg><br />
    <span><br />
      This file contains hidden or bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.<br />
      <a class="Link--inTextBlock" href="https://github.co/hiddenchars" target="_blank">Learn more about bidirectional Unicode characters</a><br />
    </span></p>
<div data-view-component="true" class="flash-action">        <a href="{{ revealButtonHref }}" data-view-component="true" class="btn-sm btn">    Show hidden characters<br />
</a>
</div>
</div>
<p></template><br />
<template class="js-line-alert-template"><br />
  <span aria-label="This line has hidden Unicode characters" data-view-component="true" class="line-alert tooltipped tooltipped-e"><br />
    <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg><br />
</span></template></p>
<table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="gistfile1.txt">
<tr>
<td id="file-gistfile1-txt-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
<td id="file-gistfile1-txt-LC1" class="blob-code blob-code-inner js-file-line">// Distributed with a free-will license.</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
<td id="file-gistfile1-txt-LC2" class="blob-code blob-code-inner js-file-line">// Use it any way you want, profit or free, provided it fits in the licenses of its associated works.</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
<td id="file-gistfile1-txt-LC3" class="blob-code blob-code-inner js-file-line">// ADXL345</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
<td id="file-gistfile1-txt-LC4" class="blob-code blob-code-inner js-file-line">// This code is designed to work with the ADXL345_I2CS I2C Mini Module available from ControlEverything.com.</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
<td id="file-gistfile1-txt-LC5" class="blob-code blob-code-inner js-file-line">// <a href="https://www.controleverything.com/content/Accelorometer?sku=ADXL345_I2CS#tabs-0-product_tabset-2" rel="nofollow">https://www.controleverything.com/content/Accelorometer?sku=ADXL345_I2CS#tabs-0-product_tabset-2</a></td>
</tr>
<tr>
<td id="file-gistfile1-txt-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
<td id="file-gistfile1-txt-LC6" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
<td id="file-gistfile1-txt-LC7" class="blob-code blob-code-inner js-file-line">#include &lt;ESP8266WiFi.h&gt;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
<td id="file-gistfile1-txt-LC8" class="blob-code blob-code-inner js-file-line">#include &lt;WiFiClient.h&gt;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
<td id="file-gistfile1-txt-LC9" class="blob-code blob-code-inner js-file-line">#include &lt;ESP8266WebServer.h&gt;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
<td id="file-gistfile1-txt-LC10" class="blob-code blob-code-inner js-file-line">#include &lt;Wire.h&gt;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
<td id="file-gistfile1-txt-LC11" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
<td id="file-gistfile1-txt-LC12" class="blob-code blob-code-inner js-file-line">// ADXL345 I2C address is 0x53(83)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
<td id="file-gistfile1-txt-LC13" class="blob-code blob-code-inner js-file-line">#define Addr 0x53</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
<td id="file-gistfile1-txt-LC14" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
<td id="file-gistfile1-txt-LC15" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
<td id="file-gistfile1-txt-LC16" class="blob-code blob-code-inner js-file-line">const uint8_t scl = 14; //D5</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
<td id="file-gistfile1-txt-LC17" class="blob-code blob-code-inner js-file-line">const uint8_t sda = 12; //D6</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
<td id="file-gistfile1-txt-LC18" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
<td id="file-gistfile1-txt-LC19" class="blob-code blob-code-inner js-file-line">const char* ssid = &quot;XXXXXX&quot;;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
<td id="file-gistfile1-txt-LC20" class="blob-code blob-code-inner js-file-line">const char* password = &quot;XXXXX&quot;;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
<td id="file-gistfile1-txt-LC21" class="blob-code blob-code-inner js-file-line">float xAccl, yAccl, zAccl;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
<td id="file-gistfile1-txt-LC22" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
<td id="file-gistfile1-txt-LC23" class="blob-code blob-code-inner js-file-line">ESP8266WebServer server(80);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
<td id="file-gistfile1-txt-LC24" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
<td id="file-gistfile1-txt-LC25" class="blob-code blob-code-inner js-file-line">void handleroot()</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
<td id="file-gistfile1-txt-LC26" class="blob-code blob-code-inner js-file-line">{</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
<td id="file-gistfile1-txt-LC27" class="blob-code blob-code-inner js-file-line">  unsigned int data[6];</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
<td id="file-gistfile1-txt-LC28" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
<td id="file-gistfile1-txt-LC29" class="blob-code blob-code-inner js-file-line">  // Start I2C Transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
<td id="file-gistfile1-txt-LC30" class="blob-code blob-code-inner js-file-line">  Wire.beginTransmission(Addr);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
<td id="file-gistfile1-txt-LC31" class="blob-code blob-code-inner js-file-line">  // Select bandwidth rate register</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
<td id="file-gistfile1-txt-LC32" class="blob-code blob-code-inner js-file-line">  Wire.write(0x2C);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
<td id="file-gistfile1-txt-LC33" class="blob-code blob-code-inner js-file-line">  // Normal mode, Output data rate = 100 Hz</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
<td id="file-gistfile1-txt-LC34" class="blob-code blob-code-inner js-file-line">  Wire.write(0x0A);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
<td id="file-gistfile1-txt-LC35" class="blob-code blob-code-inner js-file-line">  // Stop I2C transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
<td id="file-gistfile1-txt-LC36" class="blob-code blob-code-inner js-file-line">  Wire.endTransmission();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
<td id="file-gistfile1-txt-LC37" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
<td id="file-gistfile1-txt-LC38" class="blob-code blob-code-inner js-file-line">  // Start I2C Transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
<td id="file-gistfile1-txt-LC39" class="blob-code blob-code-inner js-file-line">  Wire.beginTransmission(Addr);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
<td id="file-gistfile1-txt-LC40" class="blob-code blob-code-inner js-file-line">  // Select power control register</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
<td id="file-gistfile1-txt-LC41" class="blob-code blob-code-inner js-file-line">  Wire.write(0x2D);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
<td id="file-gistfile1-txt-LC42" class="blob-code blob-code-inner js-file-line">  // Auto-sleep disable</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
<td id="file-gistfile1-txt-LC43" class="blob-code blob-code-inner js-file-line">  Wire.write(0x08);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
<td id="file-gistfile1-txt-LC44" class="blob-code blob-code-inner js-file-line">  // Stop I2C transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
<td id="file-gistfile1-txt-LC45" class="blob-code blob-code-inner js-file-line">  Wire.endTransmission();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
<td id="file-gistfile1-txt-LC46" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
<td id="file-gistfile1-txt-LC47" class="blob-code blob-code-inner js-file-line">  // Start I2C Transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
<td id="file-gistfile1-txt-LC48" class="blob-code blob-code-inner js-file-line">  Wire.beginTransmission(Addr);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
<td id="file-gistfile1-txt-LC49" class="blob-code blob-code-inner js-file-line">  // Select data format register</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
<td id="file-gistfile1-txt-LC50" class="blob-code blob-code-inner js-file-line">  Wire.write(0x31);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
<td id="file-gistfile1-txt-LC51" class="blob-code blob-code-inner js-file-line">  // Self test disabled, 4-wire interface, Full resolution, Range = +/-2g</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
<td id="file-gistfile1-txt-LC52" class="blob-code blob-code-inner js-file-line">  Wire.write(0x08);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
<td id="file-gistfile1-txt-LC53" class="blob-code blob-code-inner js-file-line">  // Stop I2C transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
<td id="file-gistfile1-txt-LC54" class="blob-code blob-code-inner js-file-line">  Wire.endTransmission();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
<td id="file-gistfile1-txt-LC55" class="blob-code blob-code-inner js-file-line">  delay(300);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
<td id="file-gistfile1-txt-LC56" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
<td id="file-gistfile1-txt-LC57" class="blob-code blob-code-inner js-file-line">  for (int i = 0; i &lt; 6; i++)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
<td id="file-gistfile1-txt-LC58" class="blob-code blob-code-inner js-file-line">  {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
<td id="file-gistfile1-txt-LC59" class="blob-code blob-code-inner js-file-line">    // Start I2C Transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
<td id="file-gistfile1-txt-LC60" class="blob-code blob-code-inner js-file-line">    Wire.beginTransmission(Addr);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
<td id="file-gistfile1-txt-LC61" class="blob-code blob-code-inner js-file-line">    // Select data register</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
<td id="file-gistfile1-txt-LC62" class="blob-code blob-code-inner js-file-line">    Wire.write((50 + i));</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
<td id="file-gistfile1-txt-LC63" class="blob-code blob-code-inner js-file-line">    // Stop I2C transmission</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
<td id="file-gistfile1-txt-LC64" class="blob-code blob-code-inner js-file-line">    Wire.endTransmission();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
<td id="file-gistfile1-txt-LC65" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
<td id="file-gistfile1-txt-LC66" class="blob-code blob-code-inner js-file-line">    // Request 1 byte of data</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
<td id="file-gistfile1-txt-LC67" class="blob-code blob-code-inner js-file-line">    Wire.requestFrom(Addr, 1);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
<td id="file-gistfile1-txt-LC68" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
<td id="file-gistfile1-txt-LC69" class="blob-code blob-code-inner js-file-line">    // Read 6 bytes of data</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
<td id="file-gistfile1-txt-LC70" class="blob-code blob-code-inner js-file-line">    // xAccl lsb, xAccl msb, yAccl lsb, yAccl msb, zAccl lsb, zAccl msb</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
<td id="file-gistfile1-txt-LC71" class="blob-code blob-code-inner js-file-line">    if (Wire.available() == 1)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
<td id="file-gistfile1-txt-LC72" class="blob-code blob-code-inner js-file-line">    {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
<td id="file-gistfile1-txt-LC73" class="blob-code blob-code-inner js-file-line">      data[i] = Wire.read();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
<td id="file-gistfile1-txt-LC74" class="blob-code blob-code-inner js-file-line">    }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
<td id="file-gistfile1-txt-LC75" class="blob-code blob-code-inner js-file-line">  }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
<td id="file-gistfile1-txt-LC76" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
<td id="file-gistfile1-txt-LC77" class="blob-code blob-code-inner js-file-line">  // Convert the data to 10-bits</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
<td id="file-gistfile1-txt-LC78" class="blob-code blob-code-inner js-file-line">  int xAccl = (((data[1] &amp; 0x03) * 256) + data[0]);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
<td id="file-gistfile1-txt-LC79" class="blob-code blob-code-inner js-file-line">  if (xAccl &gt; 511)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
<td id="file-gistfile1-txt-LC80" class="blob-code blob-code-inner js-file-line">  {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
<td id="file-gistfile1-txt-LC81" class="blob-code blob-code-inner js-file-line">    xAccl -= 1024;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
<td id="file-gistfile1-txt-LC82" class="blob-code blob-code-inner js-file-line">  }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
<td id="file-gistfile1-txt-LC83" class="blob-code blob-code-inner js-file-line">  int yAccl = (((data[3] &amp; 0x03) * 256) + data[2]);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
<td id="file-gistfile1-txt-LC84" class="blob-code blob-code-inner js-file-line">  if (yAccl &gt; 511)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
<td id="file-gistfile1-txt-LC85" class="blob-code blob-code-inner js-file-line">  {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
<td id="file-gistfile1-txt-LC86" class="blob-code blob-code-inner js-file-line">    yAccl -= 1024;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
<td id="file-gistfile1-txt-LC87" class="blob-code blob-code-inner js-file-line">  }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
<td id="file-gistfile1-txt-LC88" class="blob-code blob-code-inner js-file-line">  int zAccl = (((data[5] &amp; 0x03) * 256) + data[4]);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
<td id="file-gistfile1-txt-LC89" class="blob-code blob-code-inner js-file-line">  if (zAccl &gt; 511)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
<td id="file-gistfile1-txt-LC90" class="blob-code blob-code-inner js-file-line">  {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
<td id="file-gistfile1-txt-LC91" class="blob-code blob-code-inner js-file-line">    zAccl -= 1024;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
<td id="file-gistfile1-txt-LC92" class="blob-code blob-code-inner js-file-line">  }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
<td id="file-gistfile1-txt-LC93" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
<td id="file-gistfile1-txt-LC94" class="blob-code blob-code-inner js-file-line">  // Output data to serial monitor</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
<td id="file-gistfile1-txt-LC95" class="blob-code blob-code-inner js-file-line">  Serial.print(&quot;Acceleration in X-Axis : &quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
<td id="file-gistfile1-txt-LC96" class="blob-code blob-code-inner js-file-line">  Serial.println(xAccl);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
<td id="file-gistfile1-txt-LC97" class="blob-code blob-code-inner js-file-line">  Serial.print(&quot;Acceleration in Y-Axis : &quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
<td id="file-gistfile1-txt-LC98" class="blob-code blob-code-inner js-file-line">  Serial.println(yAccl);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
<td id="file-gistfile1-txt-LC99" class="blob-code blob-code-inner js-file-line">  Serial.print(&quot;Acceleration in Z-Axis : &quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
<td id="file-gistfile1-txt-LC100" class="blob-code blob-code-inner js-file-line">  Serial.println(zAccl);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
<td id="file-gistfile1-txt-LC101" class="blob-code blob-code-inner js-file-line">  delay(300);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
<td id="file-gistfile1-txt-LC102" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
<td id="file-gistfile1-txt-LC103" class="blob-code blob-code-inner js-file-line">  // Output data to web server</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
<td id="file-gistfile1-txt-LC104" class="blob-code blob-code-inner js-file-line">  server.sendContent</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
<td id="file-gistfile1-txt-LC105" class="blob-code blob-code-inner js-file-line">  (&quot;&lt;html&gt;&lt;head&gt;&lt;meta http-equiv=&#39;refresh&#39; content=&#39;3&#39;&lt;/meta&gt;&quot;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
<td id="file-gistfile1-txt-LC106" class="blob-code blob-code-inner js-file-line">   &quot;&lt;h1 style=text-align:center;font-size:300%;color:blue;font-family:britannic bold;&gt;CONTROL EVERYTHING&lt;/h1&gt;&quot;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
<td id="file-gistfile1-txt-LC107" class="blob-code blob-code-inner js-file-line">   &quot;&lt;h3 style=text-align:center;font-family:courier new;&gt;&lt;a href=http://www.controleverything.com/ target=_blank&gt;www.controleverything.com&lt;/a&gt;&lt;/h3&gt;&lt;hr&gt;&quot;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
<td id="file-gistfile1-txt-LC108" class="blob-code blob-code-inner js-file-line">   &quot;&lt;h2 style=text-align:center;font-family:tahoma;&gt;&lt;a href=  <a href="https://www.controleverything.com/content/Accelorometer?sku=ADXL345_I2CS#tabs-0-product_tabset-2/" rel="nofollow">https://www.controleverything.com/content/Accelorometer?sku=ADXL345_I2CS#tabs-0-product_tabset-2/</a> \n&quot;</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
<td id="file-gistfile1-txt-LC109" class="blob-code blob-code-inner js-file-line">   &quot;target=_blank&gt;AXDL345 Sensor I2C Mini Module&lt;/a&gt;&lt;/h2&gt;&quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
<td id="file-gistfile1-txt-LC110" class="blob-code blob-code-inner js-file-line">  server.sendContent</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
<td id="file-gistfile1-txt-LC111" class="blob-code blob-code-inner js-file-line">  (&quot;&lt;h3 style=text-align:center;font-family:tahoma;&gt;Acceleration in X-Axis : &quot; + String(xAccl));</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
<td id="file-gistfile1-txt-LC112" class="blob-code blob-code-inner js-file-line">  server.sendContent</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
<td id="file-gistfile1-txt-LC113" class="blob-code blob-code-inner js-file-line">  (&quot;&lt;h3 style=text-align:center;font-family:tahoma;&gt;Acceleration in Y-Axis : &quot; + String(yAccl));</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
<td id="file-gistfile1-txt-LC114" class="blob-code blob-code-inner js-file-line">  server.sendContent</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
<td id="file-gistfile1-txt-LC115" class="blob-code blob-code-inner js-file-line">  (&quot;&lt;h3 style=text-align:center;font-family:tahoma;&gt;Acceleration in Z-Axis : &quot; + String(zAccl));</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
<td id="file-gistfile1-txt-LC116" class="blob-code blob-code-inner js-file-line">}</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
<td id="file-gistfile1-txt-LC117" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
<td id="file-gistfile1-txt-LC118" class="blob-code blob-code-inner js-file-line">void setup()</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
<td id="file-gistfile1-txt-LC119" class="blob-code blob-code-inner js-file-line">{</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
<td id="file-gistfile1-txt-LC120" class="blob-code blob-code-inner js-file-line">  // Initialise I2C communication as MASTER</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
<td id="file-gistfile1-txt-LC121" class="blob-code blob-code-inner js-file-line">  Wire.begin(sda, scl);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
<td id="file-gistfile1-txt-LC122" class="blob-code blob-code-inner js-file-line">  // Initialise serial communication, set baud rate = 115200</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
<td id="file-gistfile1-txt-LC123" class="blob-code blob-code-inner js-file-line">  Serial.begin(115200);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
<td id="file-gistfile1-txt-LC124" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
<td id="file-gistfile1-txt-LC125" class="blob-code blob-code-inner js-file-line">  // Connect to WiFi network</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
<td id="file-gistfile1-txt-LC126" class="blob-code blob-code-inner js-file-line">  WiFi.begin(ssid, password);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
<td id="file-gistfile1-txt-LC127" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
<td id="file-gistfile1-txt-LC128" class="blob-code blob-code-inner js-file-line">  // Wait for connection</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
<td id="file-gistfile1-txt-LC129" class="blob-code blob-code-inner js-file-line">  while (WiFi.status() != WL_CONNECTED)</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
<td id="file-gistfile1-txt-LC130" class="blob-code blob-code-inner js-file-line">  {</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
<td id="file-gistfile1-txt-LC131" class="blob-code blob-code-inner js-file-line">    delay(500);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
<td id="file-gistfile1-txt-LC132" class="blob-code blob-code-inner js-file-line">    Serial.print(&quot;.&quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
<td id="file-gistfile1-txt-LC133" class="blob-code blob-code-inner js-file-line">  }</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
<td id="file-gistfile1-txt-LC134" class="blob-code blob-code-inner js-file-line">  Serial.println(&quot;&quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
<td id="file-gistfile1-txt-LC135" class="blob-code blob-code-inner js-file-line">  Serial.print(&quot;Connected to &quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L136" class="blob-num js-line-number js-blob-rnum" data-line-number="136"></td>
<td id="file-gistfile1-txt-LC136" class="blob-code blob-code-inner js-file-line">  Serial.println(ssid);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L137" class="blob-num js-line-number js-blob-rnum" data-line-number="137"></td>
<td id="file-gistfile1-txt-LC137" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L138" class="blob-num js-line-number js-blob-rnum" data-line-number="138"></td>
<td id="file-gistfile1-txt-LC138" class="blob-code blob-code-inner js-file-line">  // Get the IP address of ESP8266</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L139" class="blob-num js-line-number js-blob-rnum" data-line-number="139"></td>
<td id="file-gistfile1-txt-LC139" class="blob-code blob-code-inner js-file-line">  Serial.print(&quot;IP address: &quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L140" class="blob-num js-line-number js-blob-rnum" data-line-number="140"></td>
<td id="file-gistfile1-txt-LC140" class="blob-code blob-code-inner js-file-line">  Serial.println(WiFi.localIP());</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L141" class="blob-num js-line-number js-blob-rnum" data-line-number="141"></td>
<td id="file-gistfile1-txt-LC141" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L142" class="blob-num js-line-number js-blob-rnum" data-line-number="142"></td>
<td id="file-gistfile1-txt-LC142" class="blob-code blob-code-inner js-file-line">  // Start the server</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L143" class="blob-num js-line-number js-blob-rnum" data-line-number="143"></td>
<td id="file-gistfile1-txt-LC143" class="blob-code blob-code-inner js-file-line">  server.on(&quot;/&quot;, handleroot);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L144" class="blob-num js-line-number js-blob-rnum" data-line-number="144"></td>
<td id="file-gistfile1-txt-LC144" class="blob-code blob-code-inner js-file-line">  server.begin();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L145" class="blob-num js-line-number js-blob-rnum" data-line-number="145"></td>
<td id="file-gistfile1-txt-LC145" class="blob-code blob-code-inner js-file-line">  Serial.println(&quot;HTTP server started&quot;);</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L146" class="blob-num js-line-number js-blob-rnum" data-line-number="146"></td>
<td id="file-gistfile1-txt-LC146" class="blob-code blob-code-inner js-file-line">}</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L147" class="blob-num js-line-number js-blob-rnum" data-line-number="147"></td>
<td id="file-gistfile1-txt-LC147" class="blob-code blob-code-inner js-file-line">
</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L148" class="blob-num js-line-number js-blob-rnum" data-line-number="148"></td>
<td id="file-gistfile1-txt-LC148" class="blob-code blob-code-inner js-file-line">void loop()</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L149" class="blob-num js-line-number js-blob-rnum" data-line-number="149"></td>
<td id="file-gistfile1-txt-LC149" class="blob-code blob-code-inner js-file-line">{</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L150" class="blob-num js-line-number js-blob-rnum" data-line-number="150"></td>
<td id="file-gistfile1-txt-LC150" class="blob-code blob-code-inner js-file-line">  server.handleClient();</td>
</tr>
<tr>
<td id="file-gistfile1-txt-L151" class="blob-num js-line-number js-blob-rnum" data-line-number="151"></td>
<td id="file-gistfile1-txt-LC151" class="blob-code blob-code-inner js-file-line">}</td>
</tr>
</table>
</div></div>
</p></div>
</div></div>
<div class="gist-meta">
        <a href="https://gist.github.com/milesburton/1028dba934e7433cac144470039752ba/raw/13945d8d6d62e41b3ddc2e7d8f77abddb76ada51/gistfile1.txt" style="float:right" class="Link--inTextBlock">view raw</a><br />
        <a href="https://gist.github.com/milesburton/1028dba934e7433cac144470039752ba#file-gistfile1-txt" class="Link--inTextBlock"><br />
          gistfile1.txt<br />
        </a><br />
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com">GitHub</a>
      </div>
</p></div>
</div>

