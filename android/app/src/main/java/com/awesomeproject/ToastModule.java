package com.awesomeproject;

import android.app.Activity;
import android.widget.Toast;

import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.wavesplatform.sdk.WavesSdk;
import com.wavesplatform.sdk.keeper.interfaces.KeeperCallback;
import com.wavesplatform.sdk.keeper.interfaces.KeeperTransactionResponse;
import com.wavesplatform.sdk.keeper.model.KeeperResult;
import com.wavesplatform.sdk.model.request.node.InvokeScriptTransaction;
import com.facebook.react.bridge.Callback;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(
                    String dApp,
                     String function,
                     ReadableArray args, ReadableArray payments,
                     Callback callback) {
        List<InvokeScriptTransaction.Arg> argList = new ArrayList<>();
        List<InvokeScriptTransaction.Payment> paymentList = new ArrayList<>();
        for (int i = 0; i < args.size(); i++) {
            ReadableMap arg = args.getMap(i);
            String type = arg.getString("type");
            Object value = null;
            if ("integer".equals(type)) {
                value = arg.getInt("value");
            } else {
                value = arg.getString("value");
            }
            InvokeScriptTransaction.Arg invokeArg = new InvokeScriptTransaction.Arg(type, value);
            argList.add(invokeArg);
        }

        for (int i = 0; i < payments.size(); i++) {
            ReadableMap payment = payments.getMap(i);
            long tokens = payment.getInt("tokens");
            String assetId = payment.getString("assetId");
            InvokeScriptTransaction.Payment invokePayment = new InvokeScriptTransaction.Payment(tokens, assetId);
            paymentList.add(invokePayment);
        }

        InvokeScriptTransaction.Call call = new InvokeScriptTransaction.Call(function, argList);

        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
        if (activity == null) {
            callback.invoke("error", 0, "null activity");
            return;
        }

        WavesSdk.keeper().send(activity, new InvokeScriptTransaction(
                "WAVES",
                dApp, call, paymentList), new KeeperCallback<KeeperTransactionResponse>() {
            @Override
            public void onSuccess(@NotNull KeeperResult.Success<KeeperTransactionResponse> success) {
                callback.invoke("success");
            }

            @Override
            public void onFailed(@NotNull KeeperResult.Error error) {
                callback.invoke("error", error.getCode(), error.getMessage());
            }
        });
    }
}