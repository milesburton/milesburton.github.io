---
layout: ../../layouts/Layout.astro
title: Android Configuration Manager
---

# Android Configuration Manager

## Contents

* [1 What is the Android Configuration Manager (ACM)?](#what-is-the-android-configuration-manager-acm)

  * [1.1 Quick Start Example](#quick-start-example)
* [2 Why use ACM?](#why-use-acm)
* [3 Example within NZBAir](#example-within-nzbair)
* [4 ACM Component Breakdown](#acm-component-breakdown)
* [5 TODO](#todo)
* [6 Config Example](#config-example)
* [7 GenericPreferenceActivity](#genericpreferenceactivity)
* [8 Preference Launcher](#preference-launcher)
* [9 ConfigListActivity](#configlistactivity)

  * [9.1 Key Events & Methods](#key-events--methods)
* [10 Library State](#library-state)

  * [10.1 Limitations](#limitations)
  * [10.2 Prerequisites](#prerequisites)
* [11 Code](#code)

## What is the Android Configuration Manager (ACM)?

It's a small library which simplifies how you maintain your app configuration within Android. Traditionally Android provides several ways of saving your configuration settings. These range from the 'simple' (and I say that with care!) to the downright complex SQLLite and File system persistence. The ACM intends to fill a gap in the Android platform to allow you to persist settings using Java Objects. You can consider the ACM to be a sort of Object-Relational-Mapper (Light Object Mapping).

The ACM only requires you to derive from a "ConfigObject". Then you add your instance variables as you'd usually do but this time around you provide a "hint" to the ACM about how the configuration should be saved. When you want to save the configuration grab an instance of the ConfigManager and hit save. When you want to pull it out, use get with a key. Cast the return object back to your type and there you have it - one fully loaded JAVA object instance.

### Quick Start Example

```
MyConfig config = new MyConfig();
config.setId("MyConfig");
config.setMyBoolean(true);

// Grab a copy of the android shared preferences and associated that with the ConfigManager
SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
ConfigManager configManager = new ConfigManager(sharedPreferences);

// Setup a deserialiser. The default version provided by the ACM is fine in 99% of cases 
SharedPrefenceConfigDeserialiser deserialiser =new SharedPrefenceConfigDeserialiser(sharedPreferences), config)
configManager.add(new DefaultConfigDeserializerStrategy(deserialiser);

// Lets grab the config back from the ACM
MyConfig persistedConfig = (MyConfig)configManager.getConfig("MyConfig");
configManager.saveConfig(config);

System.out.println(persistedConfig.getMyBoolean());
```

## Why use ACM?

* Supports "Android Backup" - Integrated directly with Android Shared Preferences
* Save time - Removes boilerplate from persisting objects and grabbing settings
* Future proof - You can modify your config object however you like. The ACM is fault tolerant and can handle unexpected changes and will fall back to your defaults.
* Use Objects - Avoid error prone key=>value pairs using annotated objects
* Polymorphism - Take advantage of Polymorphism. NZBAir has the concept of a "Provider" which has child Provider Configurations.

## Example within NZBAir

*[image: PreferenceLauncherActivity.png]* The Preference Launcher is used as an entry point into the various types of configuration.

*[image: PreferenceListActivity.png]* The Preference List Activity manages each provider 'config' object. You can add/remove/edit each item in the list. The concrete class (that which implements the Preference List Activity) defines what actions are taken in response to user events (such as adding a new config or deleting).

*[image: ConfigActivity.png]* The ACM, based on the hints you provider in your configuration object will build a view which can be used to configure an object. NZBAir uses this widely, in this example it is used to configure the general settings.

## ACM Component Breakdown

* ConfigManager - The entry point for the configManager. Providers saveConfig, loadFullConfig, getConfig, removeConfig
* ConfigListActivity - Abstract class for managing a list of a config type
* GenericPreferenceActivity - Abstract class for managing a single config
* PreferenceLauncherActivity - Abstract class to provide a single entry point into various configuration activities

## TODO

* Break coupling between Shared Preferences and the ACM. There's no reason for the ACM not to work using file persistence, SQL lite etc.
* Get better test coverage (find a better way to test Android!)
* Use an Annotation to define config type rather than using class.getName() (which makes re-factoring much harder)
* Build example project
* Optimize configuration loading and bulk retrieval (maybe use a tree?)

## Config Example

```
package com.mb.android.nzbAirPremium.preferences.domain;

import com.mb.android.preferences.annotations.ConfigDescription;
import com.mb.android.preferences.annotations.ConfigMetadata;
import com.mb.android.preferences.annotations.ConfigOption;
import com.mb.android.preferences.annotations.ConfigOptions;
import com.mb.android.preferences.annotations.PreferenceType;
import com.mb.android.preferences.domain.Config;

public class GeneralConfig extends Config {

	public GeneralConfig() {
		super.setId("general");
	}

	@ConfigMetadata(id = "downloadLocation", required = true, type = PreferenceType.String)
	@ConfigDescription(title = "Download Location", description = "Location to download .nzb files")
	private String downloadLocation = "";

	@ConfigMetadata(id = "forceSSL", required = true, type = PreferenceType.Boolean)
	@ConfigDescription(title = "Force SSL", description = "Should NZBAir always use SSL when possible?")
	private Boolean forceSSL = false;

	@ConfigMetadata(id = "allowInvalidSSL", required = true, type = PreferenceType.Boolean)
	@ConfigDescription(title = "Allow Invalid SSL", description = "Accept invalid SSL certificates (ie: Self Signed)")
	private Boolean allowInvalidSSL = true;


	@ConfigMetadata(id = "startupScreen", required = true, type = PreferenceType.StringList)
	@ConfigDescription(title = "Startup Screen", description = "Which screen should be shown when NZBAir startsup?")
	@ConfigOptions(values = { @ConfigOption(title = "Home", value = "home"), 
			@ConfigOption(title = "Favourites", value = "savedfavourites"), 
			@ConfigOption(title = "Searches", value = "savedsearches") })
	private String startupScreen = "home";

	public String getStartupScreen() {
		return startupScreen;
	}

	public String getDownloadLocation() {
		return downloadLocation;
	}

	public Boolean shouldForceSSL() {
		return forceSSL;
	}

	public Boolean shouldAllowInvalidSSL() {
		return allowInvalidSSL;
	}


	public String getName() {
		return "General Configuration";
	}

}

```

## GenericPreferenceActivity

```
package com.mb.android.nzbAirFree.ui.preferences;

import android.support.v4.view.MenuItem;

import com.mb.android.nzbAirFree.app.Air;
import com.mb.android.nzbAirFree.ui.helper.MenuHelper;
import com.mb.android.preferences.ui.GenericPreferenceActivity;

public class AirPreferenceActivity extends GenericPreferenceActivity {

	public AirPreferenceActivity() {
		super(Air.get().getConfigManager());
	}

	@Override
	public void onStart() {
		super.onStart();
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
	}

	public boolean onOptionsItemSelected(MenuItem item) {

		MenuHelper.onOptionsItemSelected(this, this, item);
		return super.onOptionsItemSelected(item);
	}

}
```

In this example, Air is an AndroidApplication singleton instance which maintains a single copy of the ConfigManager. The configManager is designed to handle any type of Config Object so usually one instance is sufficient for more applications. Hooking it into the DefaultSharedPreference instance is fine.

## Preference Launcher

```
package com.mb.android.nzbAirFree.ui.preferences;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.MenuItem;

import com.mb.android.nzbAirFree.ui.helper.MenuHelper;
import com.mb.android.nzbAirPremium.preferences.domain.GeneralConfig;
import com.mb.android.preferences.domain.ConfigCategory;
import com.mb.android.preferences.ui.GenericPreferenceActivity;
import com.mb.android.preferences.ui.PreferenceLauncherActivity;

public class AirPreferenceLauncherActivity extends PreferenceLauncherActivity {

	public void onCreate(Bundle icicle) {
		super.onCreate(icicle);
		addCategoryList(new ConfigCategory(android.R.drawable.ic_media_ff, new Intent(this, OneTimeSetupActivity.class), "One Time Setup", "Configure NZBAir using an online tool via your PC"));
		addCategoryList(new ConfigCategory(android.R.drawable.ic_menu_compass, new Intent(this, ProviderConfigListActivity.class), "Provider Setup", "Add or remove search providers"));
		addCategoryList(new ConfigCategory(android.R.drawable.ic_menu_agenda, new Intent(this, AirPreferenceActivity.class).putExtra(GenericPreferenceActivity.ConfigCanonicalClassKey, GeneralConfig.class.getCanonicalName()), "General setup", "Misc options"));
	}

	@Override
	public void onStart() {
		super.onStart();
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
	}

	public boolean onOptionsItemSelected(MenuItem item) {

		MenuHelper.onOptionsItemSelected(this, this, item);
		return super.onOptionsItemSelected(item);
	}
}
```

The Launcher is very simple. pass a list of config categories which associate with an intent (you can launch anything you want).

## ConfigListActivity

```
package com.mb.android.nzbAirFree.ui.preferences;

import java.util.List;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v4.view.MenuItem;
import android.view.ContextMenu;
import android.view.ContextMenu.ContextMenuInfo;
import android.view.View;

import com.mb.android.nzbAirFree.app.Air;
import com.mb.android.nzbAirFree.preferences.ProviderManager;
import com.mb.android.nzbAirFree.ui.helper.MenuHelper;
import com.mb.android.nzbAirPremium.preferences.domain.ProviderConfig;
import com.mb.android.preferences.domain.Config;
import com.mb.android.preferences.manager.ConfigFilter;
import com.mb.android.preferences.ui.ConfigListActivity;

public class ProviderConfigListActivity extends ConfigListActivity {

	private final static int ContextMenuDelete = 1;
	private List<Config> supportedConfigList;
	private ProviderManager providerManager;

	public ProviderConfigListActivity() {
		super(new ConfigFilter() {

			public boolean isMatch(Config config) {
				return config instanceof ProviderConfig;
			}
		}, Air.get().getConfigManager());

		providerManager = Air.get().getProviderManager();
		supportedConfigList = providerManager.getSupportedConfigList();
	}

	@Override
	public void onStart() {
		super.onStart();
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
	}

	public boolean onOptionsItemSelected(MenuItem item) {

		MenuHelper.onOptionsItemSelected(this, this, item);
		return super.onOptionsItemSelected(item);
	}

	public void onAddConfig() {
		AlertDialog.Builder builder = new AlertDialog.Builder(this);
		builder.setTitle("Supported Providers:");
		builder.setItems(getProviderTypeNames(), createNewProviderListener);

		AlertDialog alert = builder.create();
		alert.show();
	}

	public void onDefaultSelected(Config config) {
		providerManager.saveDefaultProvider((ProviderConfig) config);

	}

	public void onConfigSelected(Config config) {
		Intent configIntent = new Intent(this, AirPreferenceActivity.class);
		configIntent.putExtra(AirPreferenceActivity.ConfigCanonicalClassKey, config.getClass().getCanonicalName());
		if (config.getId() != null && !config.getId().equals("")) {
			configIntent.putExtra(AirPreferenceActivity.ConfigIdKey, config.getId());
		}
		startActivity(configIntent);
	}

	public void onConfigContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {
		menu.setHeaderTitle("Provider Actions");
		menu.add(0, ContextMenuDelete, 0, "Delete");
	}

	private DialogInterface.OnClickListener createNewProviderListener = new DialogInterface.OnClickListener() {

		public void onClick(DialogInterface dialog, int item) {
			ProviderConfig selectedProviderConfig = (ProviderConfig) supportedConfigList.get(item);
			onConfigSelected(selectedProviderConfig);
		}

	};

	private String[] getProviderTypeNames() {
		String[] providerTypeNameList = new String[supportedConfigList.size()];

		for (int i = 0; i < supportedConfigList.size(); i++) {
			providerTypeNameList[i] = supportedConfigList.get(i).getName();
		}

		return providerTypeNameList;
	}

	public void onConfigDeleted(Config config) {
		providerManager.delete((ProviderConfig) config);
	}

	public boolean isDefaultConfig(Config config) {
		return providerManager.getDefaultProviderId().equals(config.getId());
	}

}
```

A little more complex (and in need of a rewrite). The Configuration Manager makes use of Config Filters. Due to type erasure you need to compare each config within the config manager repository using instance of. In this example the list is only for type ProviderConfig. The ProviderManager and SupportedConfig list are only for my implementation of this object and arn't required for the ConfigListActivity to work.

### Key Events & Methods

* getProviderTypeNames - The list of names which popup when the user clicks add
* onConfigDeleted
* isDefaultConfig - Used to display the favourite star state on the list.
* onAddConfig
* onDefaultSelected

## Library State

The ACM is already used in several 'production' applications. That said it is still a work in progress. It will be maintained in parallel to my own applications (I use the library straight from GitHub so you have the latest code that is in my own applications). Submit a pull request if you have any patches.

The 'trunk' will maintain the core abstraction. Any major releases will likely be tagged to maintain backwards compatibility where possible.

### Limitations

* Currently only supports primitives
* Type erasure adds boiler plate sadly

### Prerequisites

* ActionBarSherlock (for HoneyComb and ICS support)

## Code

* See GitHub: [https://github.com/milesburton/Android-Configuration-Manager](https://github.com/milesburton/Android-Configuration-Manager)
