---
layout: ../../layouts/Layout.astro
title: Android - Building a ListView with an OnClick Position
---

# Android - Building a ListView with an OnClick Position

*Migrated from the old MediaWiki install. Images referenced in the original article were not recovered during migration and are marked below.*

## Contents

* [1 The Problem](#the-problem)

  * [1.1 What should happen](#what-should-happen)
  * [1.2 Why does this occur?](#why-does-this-occur)
* [2 Passing data around](#passing-data-around)

  * [2.1 The getView method of the BaseAdapter class](#the-getview-method-of-the-baseadapter-class)
* [3 The Solution](#the-solution)

  * [3.1 Components](#components)
  * [3.2 Summary](#summary)

    * [3.2.1 The most important part of our solution is the Adapter.](#the-most-important-part-of-our-solution-is-the-adapter)
* [4 The Interface](#the-interface)
* [5 The Onclick Implementation](#the-onclick-implementation)
* [6 The Adapter](#the-adapter)
* [7 The Activity](#the-activity)
* [8 The Views](#the-views)

  * [8.1 The Activity View](#the-activity-view)
  * [8.2 The Row View](#the-row-view)
  * [8.3 The Model](#the-model)

## The Problem

When you use the setOnItemClickListener method of the ListView class (or derivatives) it is never fired.

### What should happen

You click on a ListView item, an event on your main activity is fired passing the row position.

### Why does this occur?

You'll notice this only seems to surface if you use a custom adapter which is derived from a BaseAdapter (attached using the ListView.setAdapter). The most likely reason (assuming this isn't a bug) is a certain widget within your custom row view is absorbing the OnItemClick event.

## Passing data around

### The getView method of the BaseAdapter class

You'll notice that the Android SDK has some very handy features for attaching a little piece of data to a view for later retrieval. If the OnItemClickListener worked as expected you're provided with the position of the row in the list.

```
public void onItemClick(AdapterView<?> parent, View view, int position,
			long id)
```

Great you say! The key sentence is *"worked as expected"*. The setTag method of the View class (the View class is the base class of pretty much any screen widget) will let us attach a custom bit of data to a view (a RelativeLayout or ButtonView for example). Within our onItemClick you can fetch that piece data using the view.getTag() method and casting it to the original type, (Boolean)view.getTag() for example.

This is really useful for our ListView onClick method. Regardless of which entry is clicked only a single handler is called.

## The Solution

The solution is to use a custom onItemClick interface. The tricky bit here is rather than setting the setOnItemClickListener on the ListView class we actually need to pas that data to our custom adapter.

### Components

Our solution will involve the following core components:

* An activity which either contains a ListView or is a ListViewActivity (we'll assume the former)
* A custom class derived from BaseAdapter
* An OnCustomClickListener interface
* The model (data to be displayed) (To be called HotelPrice)
* Two views, the activity layout and the row layout.

### Summary

Working backwards, lets assume you've got an Activity which needs to receive an OnClick event with a row position. We'll create a custom interface which will define a signature which is similar to the default "OnItemClickListener" so we can continue to receive the row position when a user clicks a row.

We'll then need to create an adapter which controls what we'll do with the model (in our case the model is a HotelPrice object with a title).

When the adapter updates a row, it'll attach CustomOnClickListener. The CustomOnClick listener will take a reference to the Activity and the current row position. This will pass the OnClick event and pass it back to the Activity with the addition of the position.

That's it!

#### The most important part of our solution is the Adapter.

So what's an adapter you ask? The adapter is responsible for displaying data. Quite simply it's job is to control the how each row is displayed (more on this later). The methods you care about are the constructor, getItem and getView.

getView creates and updates a single row.

getItem fetches a single object as a position.

## The Interface

Our activity will implement this interface. It'll be passed as a reference to our adapter so it knows what to call when someone clicks on a row.

```
package com.mb.android.listExample.listeners;

import android.view.View;

public interface OnCustomClickListener {
	public void OnCustomClick(View aView, int position);
        // Feel free to add other methods of use. OnCustomTouch for example :)
}
```

## The Onclick Implementation

As the ListView doesn't understand our custom listener (above) we need to implement a new type of OnClickListener which will call our interface.

// Should be saved as CustomOnClickListener.java within a the sub package "listeners" (create the package if it does't exist)

```

package com.mb.android.listExample.listeners;

import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;

public class CustomOnClickListener implements OnClickListener {
	private int position;
	private OnCustomClickListener callback;

        // Pass in the callback (this'll be the activity) and the row position
	public CustomOnClickListener(OnClickTouchListener callback, int pos) {
		position = pos;
		this.callback = callback;
	}



        // The onClick method which has NO position information
	@Override
	public void onClick(View v) {

                // Let's call our custom callback with the position we added in the constructor
		callback.OnCustomClick(v, position);
	}
}
```

## The Adapter

// Should be saved as BasicLoadAdapter.java within a the sub package "customList" (create the package if it does't exist)

```
package com.mb.android.listExample.customList;

import java.util.List;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.mb.android.listExample.R;
import com.mb.android.listExample.HotelTime;

public class BasicLoadAdapter extends BaseAdapter {
	private List<Category> aModel;
	private LayoutInflater mInflater;
        private OnCustomClickListener callback; // This is our activity
        /* So what's going on here?
       This is the class constructor. The List<HotelTime> is our data. We'll stick a reference of it in our class so we can refer to it later.
       Context is passed in so we can expand the view later (read the Google docs for more information on the inflater)  
       OnCustomClickListener callback. That's our reference to the Activity. We'll use it later! 
        */
	public BasicLoadAdapter(Context context, List<HotelTime> model, OnCustomClickListener callback) {
		mInflater = LayoutInflater.from(context);
		this.aModel = model;
                this.callback = callback;
	}

        /* Return the number of items in our model */
	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return aModel.size();
	}

        /* Return a single item from a selected position from our model */
	@Override
	public Object getItem(int arg0) {
		// TODO Auto-generated method stub
		return aModel.get(arg0);
	}

        /* Not implemented, if we used an ID instead, add some logic to return it via ID rather than position. 
        This would be useful if we stored our model within a HashMap<int, HotelTime> */
	@Override
	public long getItemId(int arg0) {
		// TODO Auto-generated method stub
		return 0;
	}

        /* The meat of our class!
        This method is called each time a row either needs to be CREATED or UPDATED. 

        ViewGroup (parent) is the parent of the current view. I believe in this situation it is the ListView. We don't use it but it's good to have 

        convertView is our row. It'll be null unless the row already exists
        */
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		ViewHolder holder; // See the static class below. It's used to store a temporary one time reference of the child views (for example, TextViews for labels, buttons etc)
		if (convertView == null) { // We are creating the row!
			convertView = mInflater.inflate(R.layout.simplerowentry, null); // inflate our XML view
			holder = new ViewHolder(); // Fetch a new ViewHolder (which is static FYI)
                          
                        // Grab a copy of each child view and stick a reference in our holder 
			holder.title = (TextView) convertView.findViewById(R.id.title);

                        // Remember the tag we mentioned earlier? We're going to use that to store a copy of our holder so we can reuse the child view references.
			convertView.setTag(holder); // but note, as we're using this for our holder we can't use it to store the position :(
		} else {
                        // This view already exists! Let's grab our holder we created earlier.
			holder = (ViewHolder) convertView.getTag();
                        // Note, we could use the method findViewById rather than a holder but a holder is type safe and a little faster.
		}

                // At this point we've either CREATED or FETCHED A REFERENCE to our holder. It's time to add data to view

                // Let's grab a reference to our data
                HotelPrice aHotel = (HotelPrice)getItem(position); // Let's grab a reference to the item at the current position and cast it to a HotelPrice
		holder.title.setText(aHotel.getTitle()); // Call the getTitle method of the aHotel object and then set the Text of our TextView
           
                // Now let's use our CustomOnClickListener implementation
                convertView.setOnClickListener(new CustomOnClickListener(callback, position));  // Pass in the callback and the current position
                // Note, we could adjust our implementation so we only need to update the listener position . For simplicity sake, we'll take a shortcut at the expense of speed.
 
                // Return the view for rendering
		return convertView;
	}

        // This'll store the references to our view
        // We don't have to use a ViewHolder but it saves a couple of lines of code and is a touch faster.
	static class ViewHolder {
		TextView title;
                // We could add our listener here and refer back to it
	}

}
```

## The Activity

// Should be saved as ListPostsActivity.java within a the root package "listExample"

```

package com.mb.android.listExample;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.mb.android.listExample.customList.CustomListAdapter;


//import android.widget.TextView;

public class ListPostsActivity extends Activity implements OnCustomClickListener {

	private static final String TAG = ListPostsActivity.class.getName();

	// Store a copy of the GUI threads model.
	List<HotelPrice> model = null;
	private CustomListAdapter listAdapter;

	/**
	 * Prepare GUI
	 */
	@Override
	public void onCreate(Bundle icicle) {
		super.onCreate(icicle);
                 
                model = new ArrayList<HotelPrice>();
                model.add(new HotelPrice("Grand Hotel"));

		// Setup view
		setContentView(R.layout.listview);

		// Fetch view and associate handlers
		ListView lv = (ListView) findViewById(R.id.list);
		listAdapter = new CustomListAdapter(getApplicationContext(), model, this); // Pass in the context so we can inflate the row view. Pass in the model/data. Pass in a reference to the onCustomClickCallback
		lv.setAdapter(listAdapter); // Set our custom adapter!
	}

        @Override
        public void onCustomClick(View aView, int rowPosition)
        {
          // This will now be called when someone clicks on a row 
        }

}

```

## The Views

### The Activity View

This is a very basic view which you can modify. The beauty of using a XML view rather than extending ListViewActivity is we may add additional functionality later on without rewriting the entire class or getting messy with FrameLayouts.

This should be saved as "list.xml" within your res/layout directory.

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="fill_parent"
  android:layout_height="fill_parent"
  android:orientation="vertical"
  >
  <ListView
    android:id="@+id/list"
    android:layout_width="fill_parent"
    android:layout_height="0px"
    android:layout_weight="1"
    />
</LinearLayout>
```

### The Row View

We want to create a custom row (Which is why the problem exists in the first place). The following xml defines how a row should be displayed.

This should be saved as "simplerow.xml" within your res/layout directory.

```

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	android:layout_width="fill_parent" android:layout_height="wrap_content"
	android:padding="6dip" android:orientation="horizontal">
	<TextView android:id="@+id/title" android:layout_width="wrap_content"
		android:layout_height="wrap_content" android:text="Linux Distributions"
		android:textSize="18sp" android:paddingLeft="5dip" android:gravity="center_vertical"/>

</LinearLayout>
```

### The Model

The model is another word for the data we want to display. This data needs to be contained within a 'domain' object. In our example this will be called the HotelPrice.

Save the following class within the root package of your project as HotelPrice.java.

```
package com.mb.android.listExample;

public class HotelPrice {
   private String title;

   // Our constructor takes the title of the Hotel
   public HotelPrice(String title)
   {
    this.title = title;
   }

   // 'Getter' returns the title of the hotel defined in the constructor
   public String getTitle()
   {
     return title;
   }
}

```
