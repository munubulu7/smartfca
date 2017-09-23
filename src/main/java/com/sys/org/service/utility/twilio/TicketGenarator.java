package com.sys.org.service.utility.twilio;

import com.twilio.http.TwilioRestClient;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;

import java.net.URI;

public class TicketGenarator {
    public static final String ACCOUNT_SID = "AC5be9a3a42034045818d041f1e029e07e";
    public static final String AUTH_TOKEN = "a5cc80e0699c3871671e9b08b5934968";

    public static void main(String[] args) {

        TwilioRestClient client = new TwilioRestClient.Builder(ACCOUNT_SID, AUTH_TOKEN).build();

        PhoneNumber to = new PhoneNumber("+917003082898");
        PhoneNumber from = new PhoneNumber("(630) 457-4034");
        URI uri = URI.create("http://demo.twilio.com/welcome/voice/");

        // Make the call
        Call call = Call.creator(to, from, uri).create(client);
        // Print the call SID (a 32 digit hex like CA123..)
        System.out.println(call.getSid());
    }
}
