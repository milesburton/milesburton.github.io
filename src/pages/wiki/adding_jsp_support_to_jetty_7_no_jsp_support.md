---
layout: ../../layouts/Layout.astro
title: Adding JSP support to Jetty 7 - NO JSP Support
date: 2011-05-06T15:56:34Z
---

# Adding JSP support to Jetty 7 - NO JSP Support

<p class="wiki-date">Earliest known revision <time datetime="2011-05-06T15:56:34Z">6 May 2011</time></p>

## Contents

* [1 Prerequisites](#prerequisites)
* [2 Getting up and running](#getting-up-and-running)

The follow guide will help you setup JSP support for Jetty 7.  if you come across the "NO JSP Support" message this should resolve your problem.

## Prerequisites
**Identify your JSP version** - 2.1 is a safe bet. Download the following jars:
- servlet-api-2.5.jar (may already exist in your $JETTY_HOME/lib folder)
- jsp-api-2.1.jar
- jsp-2.1-jetty-6.1.26.jar
- org.apache.taglibs.standard.glassfish_1.2.0.v201004190952.jar (nb: jar name varies, this is my config)
- org.apache.jasper.glassfish_2.1.0.v201007080150.jar (nb: jar name varies, this is my config)

## Getting up and running
Create a directory within your $JETTY_HOME/lib folder in the following format jsp-<version>. For example, jsp-2.1 and drop the above within.

Edit your $JETTY_HOME/start.ini file to include an extra OPTION. The option should have the same name as the folder you created above.

For example: OPTIONS=Server,jmx,resources,websocket,jsp-2.1

Fire up jetty. java -jar start.jar. The issue should now be resolved.
