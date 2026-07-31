---
layout: ../../layouts/Layout.astro
title: Android Unit Testing - Accessing Private Methods and Members
---

# Android Unit Testing - Accessing Private Methods and Members

If you've writing an Android application you've probably noticed that the JUnit framework doesn't provider any obvious method of accessing private methods and attributes. I've modified the following example so you can access both without any params.

## Contents

* [1 Code](#code)

  * [1.1 Library](#library)
  * [1.2 Example](#example)
* [2 References](#references)

## Code

### Library

```
package com.example.test;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import junit.framework.Assert;

/**
 * Provides access to private members in classes.
 */
public class PrivateAccessor {

	public static Object getPrivateField(Object o, String fieldName) {
		// Check we have valid arguments...
		Assert.assertNotNull(o);
		Assert.assertNotNull(fieldName);

		// Go and find the private field...
		final Field fields[] = o.getClass().getDeclaredFields();
		for (int i = 0; i < fields.length; ++i) {
			if (fieldName.equals(fields[i].getName())) {
				try {
					fields[i].setAccessible(true);
					return fields[i].get(o);
				} catch (IllegalAccessException ex) {
					Assert.fail("IllegalAccessException accessing "
							+ new Object[0]);
				}
			}
		}
		Assert.fail("Field '" + fieldName + "' not found");
		return null;
	}

	public static Object invokePrivateMethod(Object o, String methodName,
			Object[] params) {
		// Check we have valid arguments...
		Assert.assertNotNull(o);
		Assert.assertNotNull(methodName);
		// Assert.assertNotNull(params);

		// Go and find the private method...
		final Method methods[] = o.getClass().getDeclaredMethods();
		for (int i = 0; i < methods.length; ++i) {
			if (methodName.equals(methods[i].getName())) {
				try {
					methods[i].setAccessible(true);
					if (params == null) {
						return methods[i].invoke(o);
					} else {
						return methods[i].invoke(o, params);
					}
				} catch (IllegalAccessException ex) {
					Assert.fail("IllegalAccessException accessing "
							+ methodName);
				} catch (InvocationTargetException ite) {
					Assert.fail("InvocationTargetException accessing "
							+ methodName);
				}
			}
		}
		Assert.fail("Method '" + methodName + "' not found");
		return null;
	}
}
```

### Example

```
	public void testGetUrl2() throws Throwable {
		TestObj service = new TestObj("http://google.com");

		Object[] params = new Object[1]; // The arguments to be passed to your method
		params[0] = "AnObject";

		String result = (String) PrivateAccessor.invokePrivateMethod(service,
				"getURl", params); // call GetUrl method on the service object. Cast result to String

		String expectedResponse = "http://google.com";

		Assert.assertFalse(result.equals(url));
	}
```

## References

snippets.dzone.com/posts/show/2242
