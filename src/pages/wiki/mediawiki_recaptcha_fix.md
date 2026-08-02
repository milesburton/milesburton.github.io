---
layout: ../../layouts/Layout.astro
title: MediaWiki Recaptcha fix
date: 2011-04-16T12:21:14Z
---

# MediaWiki Recaptcha fix

<p class="wiki-date">Earliest known revision <time datetime="2011-04-16T12:21:14Z">16 Apr 2011</time></p>

## Contents

* [1 MediaWiki 1.16.x Recaptcha 1.7 Fix](#mediawiki-116x-recaptcha-17-fix)
* [2 Download Fix](#download-fix)
* [3 Installation](#installation)
* [4 References](#references)

## MediaWiki 1.16.x Recaptcha 1.7 Fix
If you see the following errors in your Apache error log this fix will likely work for you:

- PHP Warning:  Parameter 1 to ReCaptcha::confirmEdit() expected to be a reference, value given in /w/includes/Hooks.php on line 133, referer: Main_Page&action=edit

The likely cause of this issue is an outdated "ConfirmEdit" module provided by the Google Code contributors (see below). The solution is to remove any references to ConfirmEdit and grab the latest version of the plugin from the Trunk. See below for a preprepared version.

## Download Fix
*(attachment: Recaptcha.tar.gz - not migrated)* - Recaptcha Version 1.7 with fix

## Installation
Untar into your w/extentions/ directory. Edit your LocalSettings.php file within w/ and add the following lines

<pre class="brush:php">
require_once( "$IP/extensions/ConfirmEdit/ConfirmEdit.php" );
require_once( "$IP/extensions/recaptcha/ReCaptcha.php" );
// Sign up for these at https://www.google.com/recaptcha/admin/create
$recaptcha_public_key = '';
$recaptcha_private_key = '';
</pre>

That should fix it, enjoy.

## References
- http://code.google.com/apis/recaptcha/docs/mediawiki.html
- http://www.mediawiki.org/wiki/Download
- http://www.mediawiki.org/wiki/Extension:ConfirmEdit
