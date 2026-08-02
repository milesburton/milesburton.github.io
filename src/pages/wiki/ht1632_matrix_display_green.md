---
layout: ../../layouts/Layout.astro
title: HT1632 Matrix Display - Green
---

# HT1632 Matrix Display - Green

<p class="wiki-date">Earliest known revision <time datetime="2011-02-20T12:23:51Z">20 Feb 2011</time></p>


The following is a patch for the [Matrix Display library](/wiki/ht1632_arduino_matrix_display_library_for_the_sure_2416_and_0832/). Many thanks to Iván Lalaguna Alcaine for providing the remapping.

<pre class="brush:cpp">                                                                                                                                                                                     
                                             
--- MatrixDisplay_201/MatrixDisplay.cpp 2010-03-22 17:17:34.000000000 +0100
+++ MatrixDisplay_201_mio/MatrixDisplay.cpp 2011-02-09 16:46:11.688636952 +0100
@@ -49,6 +49,10 @@ PORTC &= ~(1 << (_pin -14) ))
 
 #define DIRTY_BIT           0x80
 
+//if you want to use a green display(de-dp016)
+#define GREENDISPLAY
+
+
 
 ///////////////////////////////////////////////////////////////////////////////
 //  CTORS & DTOR
@@ -331,15 +335,36 @@ inline uint8_t MatrixDisplay::xyToIndex(
     y &= 0xF;
  
  
- uint8_t addresss = y > 7 ? 1 : 0; // Work out which panel it's on (top:0, bottom:1)
-    addresss += x<<1; // Shift x by 1 and add which panel it's on
+
+
+
+     
+#ifdef GREENDISPLAY      
+     uint8_t addresss = y > 7 ? 1 : 0;
+     addresss += (x<<1)^14;
+#else
+     uint8_t addresss = y > 7 ? 1 : 0; // Work out which panel it's on (top:0, bottom:1)
+   addresss += x<<1; // Shift x by 1 and add which panel it's on
+#endif
+
     return addresss;
 }
 
 inline uint8_t MatrixDisplay::displayXYToIndex(uint8_t x, uint8_t y)
 {
- uint8_t addresss = y == 0 ? 0 : (y / 4); // Calculate which quandrant[?] it's in 
- addresss += x << 2; // Shift x by 2 and add which panel it's on
+     
+#ifdef GREENDISPLAY      
+     //new code
+     // actual formula for finding display memory adress from the X,Y  
+     uint8_t addresss = ((x<<2)^28);
+     addresss  += y<4   ? 1 : 0;
+     addresss  += y>11  ? 1 : 0;
+   addresss  += 7< y >12   ? 1 : 0;
+#else
+           uint8_t addresss = y == 0 ? 0 : (y / 4); // Calculate which quandrant[?] it's in
+           addresss += x << 2; // Shift x by 2 and add which panel it's on
+#endif
+
  return addresss;
 }
 
@@ -493,4 +518,4 @@ void MatrixDisplay::setBrightness(uint8_
  preCommand();
  writeDataBE(8,HT1632_CMD_PWM+pwmValue,true);
  releaseDisplay(dispNum);
-}
\\ No hay ningún carácter de nueva línea al final del fichero
+}
</pre.
