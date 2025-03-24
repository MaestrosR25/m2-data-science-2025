package com.data_science.snproject.models.dtos;

import lombok.Data;

@Data
public class UserCreate {
    private String fullName;
    private String email;
    private String phoneNumber;
}
