package com.citytogo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
// import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.auth0.react.A0Auth0Package;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.sensormanager.SensorManagerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.viromedia.bridge.ReactViroPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeRestartPackage(),
            new RNSensitiveInfoPackage(),
            // new ReactNativeConfigPackage(),
            new A0Auth0Package(),
            new MapsPackage(),
            new SensorManagerPackage(),
            new RNCameraPackage(),
            new ReactViroPackage(ReactViroPackage.ViroPlatform.GVR)
      );
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
