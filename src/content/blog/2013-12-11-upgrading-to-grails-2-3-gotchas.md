---
title: "Upgrading to Grails 2.3 – Gotchas"
date: 2013-12-11
slug: "upgrading-to-grails-2-3-gotchas"
categories: ["Thoughts"]
tags: []
excerpt: "When you’re working with maturing frameworks it usually pays to keep the most solid, and often latest point release on hand (unless you use Firefox; My thoughts are with you). Grails 2.3 is no exception, and surprisingly, despite being a point release the upgrade has a few gotcha"
---
<p>When you&#8217;re working with maturing frameworks it usually pays to keep the most solid, and often latest point release on hand (unless you use Firefox; My thoughts are with you). Grails 2.3 is no exception, and surprisingly, despite being a point release the upgrade has a few gotchas that&#8217;ll have you wishing you&#8217;d read the README.</p>
<p>Let&#8217;s start from the top&#8230;</p>
<h2>Hibernate</h2>
<blockquote><p>ClassNotFoundException: net.sf.ehcache.hibernate.EhCacheRegionFactory</p></blockquote>
<p>If you&#8217;ve switched to Hibernate 4, the cache factory has been included within core. You can switch to the following.</p>
<blockquote><p>org.hibernate.cache.ehcache.EhCacheRegionFactory</p></blockquote>
<p>Alternatively if you&#8217;ve stuck with Hibernate 3 you&#8217;ll need to include the approach level 2 cache library which in the case of hibernate you&#8217;ll need <a href="http://grails.org/doc/2.3.1/guide/upgradingFromPreviousVersionsOfGrails.html">EHCache</a>.</p>
<blockquote><p>ERROR hbm2ddl.SchemaExport &#8211; Table &#8220;$sometable&#8221; not found; SQL statement:</p></blockquote>
<p>Thankfully this is an easy one. If you&#8217;re using Hibernate 4 they&#8217;ve modified the log level, you can safetly ignore it until the messaging is suppressed (I&#8217;d advise you not to modify you&#8217;re own Log4J config as other messages may be important in the same scope)</p>
<h3>Intellj 12</h3>
<h4>Feel the Source</h4>
<p>Intellj 12 &amp; 13 seem to stumble over a <a href="http://stackoverflow.com/questions/16919676/grails-2-3-0-m1-fails-to-start-in-intellij-idea-130-754">classpath </a>issue which results in a stacktrace when you attempted to fire up Grails within the IDE.</p>
<p>The solution is to delete anything with *sources* within %GRAILS_HOME%\dist (see link above)</p>
<h4>Fork Handles?</h4>
<p>Now this is the fun part, if you use Intellj 12 as your IDE of choice you&#8217;ve probably found out that you can no longer debug. At a high level this is related forking. In an effort to maintain a separate JVM context Pivotal included a new configuration value which is defaulted to fork. Spinning up a new JVM is a great way to minimize permgen overflows and strange classloader issues but we&#8217;ll need to disable it until Intellj [and as you&#8217;ll see later, Geb] has had some time to play with the new features.</p>
<p>If you see these issues, the following configuration should help</p>
<pre class="brush: groovy; title: ; notranslate" title="">grails.project.fork = [
// configure settings for the test-app JVM, uses the daemon by default
test: false, // disable forking for test mode
// configure settings for the run-app JVM
run: false, // disable for run mode (useful if you want to use geb within Intellj)
// configure settings for the run-war JVM
war: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
// configure settings for the Console UI JVM
console: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256]
]</pre>
<p>Allow Intellj to update the Grails configuration. You&#8217;ll now be able to run tests as normal.</p>
<h4>Who needs Debugging anyway?</h4>
<p>If you spin up your web-app using grails run-app you may be surprised to hear that debugging and class reloading has suspiciously stopped. Thankfully this is another configuration value away.</p>
<blockquote><p>grails.reload.enabled = true</p></blockquote>
<blockquote><p>
// also worth remembering the following two BuildConfig.groovy switches:<br />
disable.auto.recompile=false // Recompilation of Java Sources<br />
grails.gsp.enable.reload=true // Recompilation of GSPs<br />
grails.reload.enabled // Enable agent reloading of class files (disabled by default on 2.3)
</p></blockquote>
<h4>Geb</h4>
<p>I often find it useful and more efficient to fire up my functional tests in two parts. I allow Intellj to fire up Grails using the -Dgrails.env=test flag in debug mode whilst running JUnit at my Geb tests. If you&#8217;ve inherited your Geb tests from GebReportingSpec you may encounter a report location error. Resolving this is trivial thankfully, just add the following to your GebConfig.groovy file.</p>
<pre class="brush: groovy; title: ; notranslate" title="">
reportDir = &quot;target/geb-reports&quot;
</pre>
<p>This&#8217;ll sit outside of any closures.</p>
<h2>In a bind</h2>
<p>Grails has introduced a plethora of much needed dynamic binding approaches. Whilst they were hacking away they corrected an old one-to-many bug. Let&#8217;s say an Author has many Books as follows:</p>
<pre class="brush: groovy; title: ; notranslate" title="">
class Author {
String name

static hasMany = [
   books:Book
]
}

class Book {
String title

static belongsTo = [author:Author]
}

</pre>
<p>originally you could do something like the following</p>
<pre class="brush: groovy; title: ; notranslate" title="">
name=foo&amp;books.id=1
</pre>
<p>In Grails 2.3 this&#8217;ll trigger a save exception.</p>
<p>The correct (but not ideal) approach is:</p>
<pre class="brush: groovy; title: ; notranslate" title="">
name=foo&amp;books[0].id=1
</pre>

