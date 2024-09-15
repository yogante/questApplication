package com.project.questapp.contollers;

import java.util.List;
import java.util.Optional;

import com.project.questapp.responses.PostResponse;
import org.springframework.web.bind.annotation.*;

import com.project.questapp.entities.Post;
import com.project.questapp.requests.PostCreateRequest;
import com.project.questapp.requests.PostUpdateRequest;
import com.project.questapp.services.PostService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/posts")
public class PostController {
	private PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping("/all")
	public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId){
		return postService.getAllPosts(userId);
	}

	@PostMapping
	public Post createOnePost(@RequestBody PostCreateRequest newPostRequest) {
		return postService.createOnePost(newPostRequest);
	}

	@GetMapping("/{postId}")
	public PostResponse getOnePost(@PathVariable Long postId) {
		return postService.getOnePostByIdWithLikes(postId);
	}

	@PutMapping("/{postId}")
	public Post updateOnePost(@PathVariable Long postId, @RequestBody PostUpdateRequest updatePost) {
		
		return postService.updateOnePostById(postId, updatePost);
	}

	@DeleteMapping("/{postId}")	
		public void deleteOnePostById(@PathVariable Long postId) {
		postService.deleteOnePostById(postId);
	}
}
