package com.project.questapp.contollers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.questapp.entities.User;
import com.project.questapp.repos.UserRepository;
import com.project.questapp.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/all")
	public List<User> getAllUsers()	{
		return userService.findAllUsers();
	}
	
	@PostMapping
	public User createUser(@RequestBody User newUser) {
		return userService.saveOneUser(newUser);
	}
	
	@GetMapping("/{userId}")
	public User  getOneUser(@PathVariable long userId) {
		return userService.getOneUserById(userId);
	}

	@PutMapping("/{userId}")
	public User updateOneUser(@PathVariable long userId, @RequestBody User newUser) {
		return userService.updateOneUser(userId, newUser);
	}
	
	@DeleteMapping("/{userId}")
	public void deleteOneUser(@PathVariable long userId) {
		userService.deleteById(userId);		
	}
}
