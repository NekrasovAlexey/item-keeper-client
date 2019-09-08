package com.awesomeproject;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.Gson;
import com.wavesplatform.sdk.WavesSdk;
import com.wavesplatform.sdk.keeper.interfaces.KeeperCallback;
import com.wavesplatform.sdk.keeper.interfaces.KeeperTransaction;
import com.wavesplatform.sdk.keeper.interfaces.KeeperTransactionResponse;
import com.wavesplatform.sdk.keeper.model.KeeperIntentResult;
import com.wavesplatform.sdk.keeper.model.KeeperResult;
import com.wavesplatform.sdk.model.request.node.InvokeScriptTransaction;
import com.facebook.react.bridge.Callback;
import com.wavesplatform.sdk.model.response.node.transaction.InvokeScriptTransactionResponse;
import com.wavesplatform.sdk.utils.RxUtil;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import io.reactivex.Observable;
import io.reactivex.functions.Consumer;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

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
        StringBuilder log = new StringBuilder();
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

            log.append("arg" + i + "= " + invokeArg.getValue() + ": " + invokeArg.getType());
            log.append("\n");
        }

        for (int i = 0; i < payments.size(); i++) {
            ReadableMap payment = payments.getMap(i);
            long tokens = payment.getInt("tokens");
            String assetId = payment.getString("assetId");
            InvokeScriptTransaction.Payment invokePayment = new InvokeScriptTransaction.Payment(tokens, assetId);
            paymentList.add(invokePayment);

            log.append("payment" + i + "= " + invokePayment.getAmount() + ": " + invokePayment.getAssetId());
            log.append("\n");
        }

        InvokeScriptTransaction.Call call = new InvokeScriptTransaction.Call(function, argList);

        log.append("call " + function);
        log.append("\n");

        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
        if (activity == null) {
            callback.invoke("error", 0, "null activity");
            return;
        }


        InvokeScriptTransaction tx = new InvokeScriptTransaction(
                null,
                dApp, call, paymentList);
        tx.setFee(500000L);

        log.append("fee " + tx.getFee());
        log.append("\n");
        log.append("feeAssetId " + tx.getFeeAssetId());
        log.append("\n");

        log.append("tx:" + tx.toString());
        //callback.invoke(log.toString(), 0, log.toString());

        try {


//            WavesSdk.keeper().sign(activity, tx, new KeeperCallback<KeeperTransaction>() {
//                @Override
//                public void onSuccess(@NotNull KeeperResult.Success<KeeperTransaction> success) {
//
//                }
//
//                @Override
//                public void onFailed(@NotNull KeeperResult.Error error) {
//
//                }
//            });



           // WavesSdk.keeper().finishProcess(activity, new KeeperIntentResult.SuccessSendResult(KeeperTransactionResponse));


            String seed = "scatter debris winter grid smile run erupt cube senior crunch slush depend organ floor pulse";
            //String r = tx.getSignedStringWithSeed(seed);
            tx.setChainId((byte) 84);
            tx.sign(seed);

            Gson gson = new Gson();
            String txJson = gson.toJson(tx);






            OkHttpClient client = new OkHttpClient();
            Request rq = new Request.Builder().url("https://nodes-testnet.wavesnodes.com/transactions/broadcast").
                    post(RequestBody.create(MediaType.parse("application/json"), txJson)).build();
            client.newCall(rq).enqueue(new okhttp3.Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    call.cancel();
                    callback.invoke("fail", 0);
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    callback.invoke("success", 0, response.body().toString());
                }
            });
            //callback.invoke(r, 0, r);


        } catch (Exception e) {
            callback.invoke("error", 0, e.getMessage());
        }
    }
}