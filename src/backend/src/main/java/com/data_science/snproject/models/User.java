package com.data_science.snproject.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private UUID id;
    private String fullName;
    private String email;
    private String phoneNumber;

    private List<Role> roles; // Embedding direct des rôles

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Role {
        private UUID id;
        private String name;
        private String displayName;
        private String description;
        private List<Permission> permissions; // Embedding direct des permissions
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Permission {
        private UUID id;
        private String name;
        private String technicalName;
        private String description;
    }
}
