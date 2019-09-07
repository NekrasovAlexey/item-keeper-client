package com.awesomeproject;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import androidx.multidex.MultiDexApplication;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.wavesplatform.sdk.WavesSdk;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new CustomToastPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    WavesSdk.init(this);

    WavesSdk.keeper().configureDApp(
            this,
            "Item Keeper", // Name of your dApp
            "https://avatars2.githubusercontent.com/u/18295288");
//                context = this,
//                dAppName = "My Waves DApp", // Name of your dApp
//                dAppIconUrl = "https://avatars2.githubusercontent.com/u/18295288");
                
    SoLoader.init(this, /* native exopackage */ false);
  }
}
