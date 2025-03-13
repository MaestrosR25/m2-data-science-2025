package com.data_science.snproject.services.initializer;

import com.data_science.snproject.configs.UserConfigProperties;
import com.data_science.snproject.models.User;
import com.data_science.snproject.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserInitializer {

    private final UserRepository userRepository;
    private final UserConfigProperties userConfigProperties;

    @PostConstruct
    public void initUsers() {
        if (userConfigProperties.getUsers() == null || userConfigProperties.getUsers().isEmpty()) {
            return; // Pas d'utilisateurs configurés
        }

        for (UserConfigProperties.UserConfig userConfig : userConfigProperties.getUsers()) {
            if (!userRepository.existsByEmail(userConfig.getEmail())) {
                User user = createUserFromConfig(userConfig);
                userRepository.save(user);
            }
        }
    }

    private User createUserFromConfig(UserConfigProperties.UserConfig userConfig) {
        List<User.Role> roles = userConfig.getRoles().stream()
            .map(this::createRoleFromConfig)
            .collect(Collectors.toList());

        return User.builder()
            .id(UUID.randomUUID())
            .fullName(userConfig.getFullName())
            .email(userConfig.getEmail())
            .phoneNumber(userConfig.getPhoneNumber())
            .roles(roles)
            .build();
    }

    private User.Role createRoleFromConfig(UserConfigProperties.UserConfig.Role roleConfig) {
        List<User.Permission> permissions = roleConfig.getPermissions().stream()
            .map(this::createPermissionFromConfig)
            .collect(Collectors.toList());

        return User.Role.builder()
            .id(UUID.randomUUID())
            .name(roleConfig.getName())
            .displayName(roleConfig.getDisplayName())
            .description(roleConfig.getDescription())
            .permissions(permissions)
            .build();
    }

    private User.Permission createPermissionFromConfig(UserConfigProperties.UserConfig.Role.Permission permissionConfig) {
        return User.Permission.builder()
            .id(UUID.randomUUID())
            .name(permissionConfig.getName())
            .technicalName(permissionConfig.getTechnicalName())
            .description(permissionConfig.getDescription())
            .build();
    }
}