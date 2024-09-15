package com.project.questapp.contollers;


import java.util.List;
import java.util.Optional;

import com.project.questapp.responses.CommentResponse;
import org.springframework.web.bind.annotation.*;

import com.project.questapp.entities.Comment;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;
import com.project.questapp.services.CommentService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comments")
public class CommentController {

	private CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}
	
	@GetMapping
	public List<CommentResponse> getAllComments(@RequestParam Optional<Long>userId,
												@RequestParam Optional<Long>postId
			){
		return commentService.getAllCommentsWithParam(userId, postId);
	}
	
	@PostMapping
	public Comment createOneComment(@RequestBody CommentCreateRequest request ) {
		return commentService.createOneComment(request);
	}
	
	@GetMapping("/{commentId}")
	public Comment getOneComment(@PathVariable Long commentId) {
		return commentService.getOneCommentById(commentId);
	}

	@PutMapping("/{commentId}")
	public Comment updateOneComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest request) {
		return commentService.updateOneCommentById(commentId, request);
	}
	
	@DeleteMapping("/{commentId}")
	public void deleteOneComment(@PathVariable Long commentId) {
		commentService.deleteOneCommentById(commentId);
	}
	
}
