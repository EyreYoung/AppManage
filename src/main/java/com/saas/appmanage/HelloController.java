package com.saas.appmanage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    //@GetMapping(value = "/hello")
    public String Sayhello(@RequestParam(value = "id", required = false, defaultValue = "0") int id){
        return "Hello Spring Boot" + id;
    }

}
