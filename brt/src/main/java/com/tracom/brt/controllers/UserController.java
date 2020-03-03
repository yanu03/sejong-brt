package com.tracom.brt.controllers;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.user.User;
import com.tracom.brt.domain.user.UserService;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController extends BaseController {

    @Inject
    private UserService userService;

    @GetMapping
    public Responses.ListResponse list(RequestParams<User> requestParams) {
        return Responses.ListResponse.of(userService.get(requestParams));
    }
    
    @PostMapping("/duplicate")
    public ApiResponse duplicate(@RequestBody User user) {
    	return ok(userService.checkDuplicate(user).toString());
    }

    @PostMapping("/save")
    public ApiResponse save(@RequestBody User user) throws Exception {
    	userService.saveUser(user);
    	return ok(user.getUserCd());
    }

    @PostMapping("/update")
    public ApiResponse update(@RequestBody User user) {
        userService.updateUser(user);
        return ok();
    }
    
    @PostMapping("/delete")
    public ApiResponse delete(@RequestBody User user) {
    	userService.deleteUser(user);
    	return ok();
    }
    
    @PostMapping("/checkScdPs")
    public ApiResponse checkScdPs(@RequestBody User user) {
    	return ok(userService.checkScdPs(user).toString());
    }
    
    @PostMapping("/changePs")
    public ApiResponse changePs(@RequestBody Map<String, Object> password) {
    	return ok(userService.changePs(password).toString());
    }
}
