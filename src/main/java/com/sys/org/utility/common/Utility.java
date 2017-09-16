package com.sys.org.utility.common;

import com.sys.org.domain.ConfigParameter;
import com.sys.org.service.CrmService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class Utility {
    private static final Utility UTILITY = new Utility();
    private Utility() {
    }
    public static Utility getInstance(){
        return UTILITY;
    }

    @Autowired
    private CrmService crmService;
    private final Logger log = LoggerFactory.getLogger(Utility.class);

    public ConfigParameter getConfigValue(String name,String defaultValue){
        ConfigParameter parameter = crmService.getConfigParam(name);
        if(parameter==null){
            parameter.setValue(defaultValue);
            parameter.setName("");
            parameter.setDescription("");
            return parameter;
        }else {
            return parameter;
        }
    }
    public void sendMessage(String recipient, String message){

    }
}
