package de.gemorra.processcockpit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest")
public class ModelInformationController {

    @GetMapping(path = "test")
    public String test(){
        return "SUCCESS";
    }

}
