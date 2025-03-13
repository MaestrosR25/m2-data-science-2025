package com.data_science.snproject.configs;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "user.default")
public class UserConfigProperties {
    
    private List<UserConfig> users;

    @Getter
    @Setter
    public static class UserConfig {

        private String email;
        private String fullName;
        private String phoneNumber;

        private List<Role> roles;

        @Getter
        @Setter
        public static class Role {
            private String name;
            private String displayName;
            private String description;

            private List<Permission> permissions;

            @Getter
            @Setter
            public static class Permission {
                private String name;
                private String technicalName;
                private String description;
            }

        }
    }
}
