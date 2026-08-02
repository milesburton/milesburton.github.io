---
title: "MyBatis 3, Grails & Oracle 11g Procedures – Getting started&#8230;"
date: 2013-08-09
slug: "mybatis-3-grails-oracle-11g-procedures-getting-started"
categories: ["Grails In the Enterprise","HOWTO","Oracle"]
tags: ["Coding", "Databases"]
excerpt: "Introduction tl;dr: MyBatis is a maintainable approach for integrating Oracle Stored Procedures and complex SQL queries using CQRS with Grails In the enterprise the days of huge monolithic Java apps are coming to a much needed close. The market is demanding ever shorter developme"
---
<h2>Introduction</h2>
<p><em>tl;dr: MyBatis is a maintainable approach for integrating Oracle Stored Procedures and complex SQL queries using CQRS with Grails</em></p>
<p>In the enterprise the days of huge monolithic Java apps are coming to a much needed close. The market is demanding ever shorter development cycles and it is no longer acceptable to give delivery estimates in months! The need for agility is imperative and as a result the full stack frameworks we&#8217;ve enjoyed using in media is slowly but surely gaining ground.</p>
<p>In my experience frameworks like Ruby On Rails &amp; Grails target bleeding edge segments. They don&#8217;t tend to be a natural fit for the traditional Big Iron systems. In banking for example Oracle is understandably popular. Stored procedures (sprocs) and functions are typically used to obfuscate legacy and worryingly complex joins. As application programmers we need a way to bridge the gap between these systems without producing yet another Big Ball of Mud.</p>
<p>Even with all the excellent helpers Grails provides over Spring, GORM and Hibernate just don&#8217;t play nicely with sprocs. I&#8217;ve spoken with a worrying amount of developers who&#8217;ve reverted to good old fashioned JDBC. Now don&#8217;t get me wrong JDBC can be great, raw performance and WYSIWYG but it encourages SQL injection bugs and an explosion of inline SQL statements. This is where MyBatis steps in.</p>
<p>MyBatis doesn&#8217;t attempt to hide you away from the database using layers and layers of abstraction and performance destroying indirection. When you have to manage large SQL statements, procedures or batch processes MyBatis let&#8217;s you maintain a clear separation of responsibilities without the complexity.</p>
<p>In short you can:</p>
<ul>
<li>Interface directly with Stored Procedures &amp; Functions</li>
<li>Allow your DBAs to update and write SQL without recompiling your application</li>
<li>Continue using transactions and JDBC</li>
<li>Groovy Integration reduces DTO boilerplate significantly</li>
<li>Very elegent approach to testing by switching in DAO implementations using Spring beans</li>
</ul>
<h2>Getting started</h2>
<h3>Summary</h3>
<p>We are going to implement MyBatis using Annotation driven queries &#8211; this is the simplest, fastest way of getting a demo running. At it&#8217;s most basic we have several key tasks:</p>
<ul>
<li>Reference the MyBatis, MyBatis-Spring maven dependencies</li>
<li>Add MyBatis dynamic mappers to Resources.groovy &#8211; This provides the DAO which we can request data from</li>
<li>Create a single domain object which will be populated from our queries in the DAO</li>
<li>Create a single MyBatis mapper &#8211; Describe in XML how to convert the response of a stored procedure to our DAO</li>
</ul>
<h3>Configuring dependencies</h3>
<p>Within Grails specify the following addition dependencies within your BuildConfig.groovy:</p>
<pre class="brush: groovy; title: ; notranslate" title="">
dependencies {
compile 'org.mybatis:mybatis:3.2.1', // Core MyBatis library
'org.mybatis:mybatis-spring:1.2.0' // Support for Spring IoC&lt;/code&gt;

// ...
}
</pre>
<h3>Setting up your Spring Beans</h3>
<p>If it does not already exist create $PROJECT_HOME/grails-app/conf/spring/resources.groovy and paste the following:</p>
<pre class="brush: groovy; title: ; notranslate" title="">
import org.mybatis.spring.SqlSessionFactoryBean
import org.mybatis.spring.mapper.MapperScannerConfigurer

beans = {

sqlSessionFactory(SqlSessionFactoryBean) {
dataSource = ref('dataSource_myBatis')
typeAliasesPackage = &quot;com.example.persistence&quot; // Allows the use of DTO names within the XML mapping
}

mapperScannerConfigurer(MapperScannerConfigurer) {
basePackage = &quot;com.example.persistence&quot; // MyBatis will scan this directory for dynamic mappers
}

}
</pre>
<h3>Wiring up Spring auto wire up</h3>
<p>Within $PROJECT_HOME/grails-app/conf/Config.groovy configure Spring to auto wire your new mapper</p>
<pre class="brush: groovy; title: ; notranslate" title="">
grails.spring.bean.packages = ['com.example.persistence'] // Note this may slow your startup times
</pre>
<h3>Setup a Domain Object</h3>
<p>A MyBatis domain object is nothing more than a standard POGO (plain old groovy object).</p>
<p>For example:</p>
<pre class="brush: groovy; title: ; notranslate" title="">
package com.example.domain

class BlogEntry implements Serializable{

String title
String body
}
</pre>
<h3>Creating your dynamic interface</h3>
<p>Make sure you put the following example within the correct package. It matches up with the package specified in resources.groovy.</p>
<pre class="brush: groovy; title: ; notranslate" title="">
package com.example.persistence&lt;/code&gt;

import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.mapping.StatementType
import org.springframework.stereotype.Component

@Component // This is a tag annotation which informs Spring it is actually a Spring Bean
interface BlogMapper {

@Options(statementType = StatementType.CALLABLE)
@Select(&quot;&quot;&quot;
{call
blogging.get_blog_entry(
#{blogId, mode=IN},
#{blogEntryList, mode=OUT, jdbcType=CURSOR, javaType=java.sql.ResultSet, resultMap=get_blog_entry}
)
}&quot;&quot;&quot;)
void fetchBlogEntry(HashMap params)
}
</pre>
<p>&nbsp;</p>
<h3>Creating your stored procedure mapper</h3>
<p>Next up we want to create a mapping XML file to dynamically map our Oracle Stored Procedure Cursor to a list of BlogEntry&#8217;s.</p>
<p>Note how the ID marries up with the annotation on our mapper.</p>
<p>This file should be created in $PROJECT_HOME/src/java/com/example/persistence (Grails will only put resources into your WAR if it&#8217;s created either within $PROJECT_HOME/src/java or $PROJECT_HOME/grails-app/conf</p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;
        &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.example.persistence.BlogEntry&quot;&gt;
    &lt;resultMap type=&quot;BlogEntry&quot; id=&quot;get_blog_entry&quot;&gt;&lt;!-- Note the type. Earlier we specified typeAlias in the spring bean definition. This means we can assume BlogEntry will have com.example.persistence prefixed as the package name --&gt;
        &lt;result property=&quot;title&quot; column=&quot;title&quot;/&gt;
        &lt;result property=&quot;body&quot; column=&quot;body&quot;/&gt;
    &lt;/resultMap&gt;
&lt;/mapper&gt;
</pre>
<h3>Setting up a test controller</h3>
<pre class="brush: groovy; title: ; notranslate" title="">
package com.example

import com.example.BlogEntry

class ExampleController {

def blogMapper

def view() {

def params = [blogId: 'someId', blogEntryList: []]
blogMapper.fetchBlogEntry(params)

println params.blogEntryList
render(text: 'ok')
}
}</pre>
<p>At the most basic level you have your first MyBatis integration with Grails. I&#8217;ll follow up this post with a full project and an Oracle 11G XE DDL script.</p>
<h2>Related Reading&#8230;</h2>
<ul>
<li><a href="http://www.objectpartners.com/2011/04/05/using-mybatis-annotations-with-spring-3-0-and-maven/">MyBatis Annotations</a></li>
<li><a href="http://download.milesburton.com/Misc/MyBatis-3-User-Guide.pdf">MyBatis 3 User Guide</a></li>
<li><a href="http://martinfowler.com/bliki/CQRS.html">Command Query Response Segregation</a></li>
</ul>

