---
layout: ../../layouts/Layout.astro
title: Online Regex Match Tool - Build up a new string based on matched groups
---

# Online Regex Match Tool - Build up a new string based on matched groups


## Summary
I've thrown together this simple tool to let you create a new string from a regular expression group match (back reference iirc). 

http://services.mnetcs.com/RegexMatcher/

For example, let's say I want to rebuild a simple JSON object. 

Data:
{name: "Miles", "Age": "24"}

Regular expression:

"Age":\\s"(\\d+)"

Replacement text:

Miles is $1 years old

Result:

Miles is 24 years old (*sad face*)
