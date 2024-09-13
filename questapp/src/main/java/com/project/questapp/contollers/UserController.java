package com.project.questapp.contollers;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.project.questapp.exceptions.UserNotFoundException;
import com.project.questapp.responses.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
	public UserResponse getOneUser(@PathVariable long userId) {
		User user = userService.getOneUserById(userId);
		if (user == null){
			throw new UserNotFoundException();
		}
		return new UserResponse(user);
	}

	@PutMapping("/{userId}")
	public User updateOneUser(@PathVariable long userId, @RequestBody User newUser) {
		return userService.updateOneUser(userId, newUser);
	}
	
	@DeleteMapping("/{userId}")
	public void deleteOneUser(@PathVariable long userId) {
		userService.deleteById(userId);		
	}

	@GetMapping("/activity/{userId}")
	public List<Object> getUserActivity(@PathVariable Long userId){
		return userService.getUserActivity(userId);
	}

	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public void handleUserNotFound(){
		
	}
}
