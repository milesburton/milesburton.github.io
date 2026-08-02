---
layout: ../../layouts/Layout.astro
title: NZBAir - Usenet and SABnzbd mobile for Android
---

# NZBAir - Usenet and SABnzbd mobile for Android

<p class="wiki-date">Earliest known revision <time datetime="2012-07-28T18:08:39Z">28 Jul 2012</time></p>

## Contents

* [1 What is NZBAir?](#what-is-nzbair)
* [2 So why do I want NZBAir?](#so-why-do-i-want-nzbair)
* [3 Where to get NZBAir](#where-to-get-nzbair)
* [4 NZB Free Features](#nzb-free-features)
* [5 NZBAir Premium Features](#nzbair-premium-features)
* [6 Features Coming soon](#features-coming-soon)
* [7 NZBAir Free Edition](#nzbair-free-edition)
* [8 Media](#media)
  * [9 And a bit of fun](#and-a-bit-of-fun)
* [10 Setup](#setup)
  * [11 Installing SABNzbd+ & NZBAir](#installing-sabnzbd--nzbair)
  * [12 FAQ](#faq)
* [13 Contact](#contact)

## What is NZBAir?
NZBAir is an Android app which lets you browse popular Usenet indexers such as NZBMatrix, Newzbin and NZBIndex. If you're a fan of IMDB, NZBAir will pull all the relevant post details down. If you make use of the bookmark facilities, NZBAir can help you manage those quickly. Oh and best of all, if you grab the Premium version you can push any posts directly to your SABNzbd box and manage all your downloads!

## So why do I want NZBAir?
"Ever been out and someone mentions a film you *must* get? Fire up NZBAir perform a quick search and have it downloading in seconds. It's designed to take the pain of of Usenet"

## Where to get NZBAir
You can download both editions from Google Play (aka Android Market)

Premium: https://play.google.com/store/apps/details?id=com.mb.android.nzbAirPremium
Free: https://play.google.com/store/apps/details?id=com.mb.android.nzbAirFree

## NZB Free Features
- Supports NZBMatrix, NZBIndex, NZBSu, NZBIndex, NZBSRUs, NewzNab & Newzbin (want to see your search engine? Email me)
- Quick search through all providers
- Fast search within categories
- Download NZB Files directly to your phone
- Bookmark posts to share with your download box at home
- Manage all your bookmarks while you're out
- Full SSL support
- Save you favourite searches and categories for quick access

## NZBAir Premium Features
**All the parts of NZBAir Free but you get faster updates and more features**

- Push an NZB download to your SABNzbd+ box
- Shift your download priories on the fly
- Remove any pending or current downloads
- View SABNzbd+ details (download speed, box load, time remaining etc)
- Remote SABNzbd+ shutdown, pause and speed limits
- Supports SABNzbd version 0.5.6 at time of writing
- Scroll through all results available (continuous scrolling)
- Usually 2-3 weeks ahead of the free edition

## Features Coming soon
- Dynamic sorting options
- .NZB files can be opened in NZBAir and pushed to your SAB Server
- Setup a help/news/faq/contact activity within the application

## NZBAir Free Edition
I've temporarily pulled the free version of NZBAir. NZBAir 2 introduced a lot of changed which I intend to backport but I didn't want to leave the old free edition non-working. It will be coming shortly so bare with me.

## Media
![SABDownloads](/wiki-media/SABDownloads.png)
![SendToSab](/wiki-media/SendToSab.png)
![DetailsView](/wiki-media/DetailsView.png)
![SearchResults](/wiki-media/SearchResults.png)
![SABDetails](/wiki-media/SABDetails.png)
![Searchhint](/wiki-media/Searchhint.png)
![Widget](/wiki-media/Widget.png)
![Home](/wiki-media/Home.png)
![History](/wiki-media/History.png)

### And a bit of fun
NZBAir running on a Android watch!

http://download.milesburton.com/NZBAir/NZBAir_DroidWatch1.JPG

http://download.milesburton.com/NZBAir/NZBAir_DroidWatch2.JPG

http://download.milesburton.com/NZBAir/NZBAir_DroidWatch3.JPG

## Setup
### Installing SABNzbd+ & NZBAir
An excellent guide provided by user1706

#### Setup SABNzbd+
1. Download Sab from http://sabnzbd.org/
  1. Download your version and install your version
  1. Within SABNzbd set your Config > General > SAB Host to 0.0.0.0
  1. Take note of your API key
1. Ideally assign a static IP on the LAN to your pc. Alternatively note down your IP address. [| Instructions for Mac](http://www.wikihow.com/Find-Your-IP-Address-on-a-Mac) [| Instructions for Windows](http://compnetworking.about.com/cs/windowsnetworkin1/ht/findaddrwinxp.htm)
  1. If you are unsure take a look at [Windows Vista IP Addressing](http://www.trainsignaltraining.com/windows-vista-ip-addressing)
  The reason why point you have to do point 2 is so that you can tell where your “virtual server” or foward ports point to
1. Create a firewall rule to open up port 8080 & 9090 on both your pc and router
1. On your router go to the config page and forward the ports 8080 and 9090 (unless you have changed these) for more help click http://www.yougetsignal.com/tools/open-ports/
  My router actually calls port forwarding a virtual server, so you need to add the ports to forward,  to the IP that you specified in point 2. For example Dlink virtual server to [my computer ip -> 192.168.0.2, port 9090) & same again for port 8080
  1. Now you need to create a DynDns for the "web" to find your pc, this is important if you have a dynamic IP and not a static IP and gets around the issue of having a static IP, it is FREE so ignore the pricing stuff!
1. [Create a free DynDns account](https://www.dyndns.com/account/services/hosts/add.html) and enter a hostname for it to find you (i.e mysabz.free-dns.com), remember your username, password and host name you created as you will need it in a minute!
1. IF YOUR ROUTER HAS THE OPTION FOR A DYNDNS
  1. If your router has the option for a dyndns to be setup, enter the details (username, password, dyndns host name)
1. IF YOUR ROUTER DOES NOT HAVE THE OPTION FOR A DYNDNS follow [these onscreen instructions](http://www.dyndns.com/support/clients/dyndns-updater-guide.html)

#### Setup NZBAir
NZBAir has an excellent "One Time Setup" tool which lets you configure NZBAir from a web interface. 

1. Start NZBAir and select the configuration icon (the cog)
1. Select One Time Setup
  Take a note of your code
1. Visit [setup.nzbair.com](http://setup.nzbair.com) and enter your code into the appropriate box.
1. Gather your various provider details. These can be found as follows:
  - [NZBmatrix](http://nzbmatrix.com/account.php) - Take note of your API Key and username
  - [Newzbin](http://www.newzbin2.es/) - You'll only need your username and password
  - [NZBSRus](http://www.nzbsrus.com/) - Username and password
  - [NZB.Su](http://www.nzb.su/apihelp) - Visit the API Help section and find your API key. "?apikey=123aba2af16adbe490cg5096328c6ad1" remove the "?apikey=" leaving "123aba2af16adbe490cg5096328c6ad1" (without quotes)
1. Make sure you enter a pincode and configure the general settings as you wish. (Please note: Only SABNzbd is applicable for the premium edition)
1. On left, click on each provider you have configuration settings for. Enter the settings you recorded earlier and hit save.
1. SABNzbd (applicable for Premium only). Enter the APIKey you wrote down earlier.
1. SABnzbd - Enter the SABnzbd API Url for example for a standard default setup like we have just done,
  it could be:
  - http://yourhostname.dyndns-free.com:8080/api
  Or, If we created the host name on dyndns as mysabz.free-dns.com it would be
  - http://mysabz.free-dns.com:8080/api
  In later versions of SAB the URL may look like the following:
  - http://yourhostname.dyndns-free.com:8080/sabnzbd/api
  or
  - http://mysabz.free-dns.com:8080/sabnzbd/api
1. Within the app click fetch. This will take a moment and should close the One Time Setup view. Your settings should be available. If it fails, click fetch again. In certain cases your network may fail, unfortunately NZBAir will delete *all* your configuration files from our server to maintain your privacy and security. If this happens you will need to re-enter your settings from step 1.

### FAQ
Note, all user names and keys are case sensitive. Be careful when you enter them.
#### Where do I get the NZBMatrix key?
Visit your [account](http://nzbmatrix.com/account.php) on NZBMatrix and grab your username (ie, "Paul") and your api key (ie, 838d43ef5cb5346d83520f6886adf935). Enter that into the preference screen which you can access by pressing menu and settings. You'll need a NZBMatrix premium account for NZBMatrix features.

#### What is my SABNzbd+ API URL?
Your SABNzbd api needs to be publicly accessible for NZBAir to operate correctly. This may involve opening up port 8080 (or 9090 for SSL) on your router. 

Enter your SABNzb API url into the preferences screen as follows: "http://YOURSERVER:port/api" 

You can grab your API Key from the config > general screen within SABNzbd+. At the moment NZBAir doesn't support web-server authentication.

#### I cannot connect to SAB at all?
Has your SAB host IP been set to 0.0.0.0 (rather than 127.0.0.1)? This option can be found under config > general > sab host

#### NZBAir throws an usual message when you send to SAB (or use sab)
Is the URL correct? It should look like: http://YOURSERVER:port/api (or http://YOURSERVER:port/sabnzbd/api on later versions)

#### SABNzb complains of a translation error
Have you entered the correct url? It's usually http://YOURSERVER:port/api. 

Are you trying to access the internet via your WiFI? Some routes don't have "loopback" enabled which means although your settings are correct it can't redirect your call back to your SAB server within your own network. You can check this by visiting http://YOURSERVER:port/api?mode=version If it responds with a number (ie 0.5.6) it's fine. 

#### SABNzb throws an error when you push a NZB
See above

## Contact
Don't forget if you're having trouble with NZBAir [drop me a mail](/wiki/related_work_and_contact/). If you're struggling setting up SABNzb [don't forget their forums](http://forums.sabnzbd.org/)
