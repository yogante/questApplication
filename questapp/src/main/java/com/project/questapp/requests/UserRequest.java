package com.project.questapp.requests;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class UserRequest {

    String userName;
    String password;
}
