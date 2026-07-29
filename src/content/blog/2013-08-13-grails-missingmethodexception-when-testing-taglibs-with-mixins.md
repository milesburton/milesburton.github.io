---
title: "Grails: MissingMethodException when testing taglibs with Mixins"
date: 2013-08-13
slug: "grails-missingmethodexception-when-testing-taglibs-with-mixins"
categories: ["Grails In the Enterprise"]
tags: []
excerpt: "Here’s a gotcha that I’ve come across today. If you take advantage of test helpers of a mixin format you may come see this issue: The reason behind this error is the metaClass (which is how Groovy mixes in other classes) is cleared after each test. The @Mixin annotation only work"
---
<p>Here&#8217;s a gotcha that I&#8217;ve come across today. If you take advantage of test helpers of a mixin format you may come see this issue:</p>
<pre class="brush: groovy; title: ; notranslate" title="">

groovy.lang.MissingMethodException: No signature of method: [yourSpec]

</pre>
<p>The reason behind this error is the metaClass (which is how Groovy mixes in other classes) is cleared after each test. The @Mixin annotation only works for the first test before it is cleared.</p>
<p>Until a fix is made you can explcitiy mixin your additional classes using the following:</p>
<pre class="brush: groovy; title: ; notranslate" title="">

def 'setup'(){

this.class.mixin([YourMixin])

}

</pre>
<p>Reference: <a title="Grails mailing list" href="http://grails.1312388.n4.nabble.com/Call-a-method-on-the-target-class-when-using-own-TestMixin-td4637497.html#a4637776" target="_blank">Grails mailing list</a></p>

