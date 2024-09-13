package com.project.questapp.responses;

import com.project.questapp.entities.User;
import lombok.Data;

@Data
public class UserResponse {
    Long id;
    int avatarId;
    String userName;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public int getAvatarId() {return avatarId;}
    public void setAvatarId(int avatarId) {this.avatarId = avatarId;}
    public String getUserName() {return userName;}
    public void setUserName(String userName) {this.userName = userName;}

    public UserResponse(User entity) {
        this.id = entity.getId();
        this.avatarId = entity.getAvatar();
        this.userName = entity.getUserName();
    }
}
