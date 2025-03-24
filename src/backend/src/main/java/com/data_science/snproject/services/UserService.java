package com.data_science.snproject.services;

import com.data_science.snproject.configs.UserConfigProperties;
import com.data_science.snproject.exceptions.NotFoundException;
import com.data_science.snproject.models.User;
import com.data_science.snproject.models.dtos.RoleCreate;
import com.data_science.snproject.models.dtos.UserCreate;
import com.data_science.snproject.repositories.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserConfigProperties userConfigProperties;

    @Autowired
    public UserService(UserRepository userRepository, UserConfigProperties userConfigProperties) {
        this.userRepository = userRepository;
        this.userConfigProperties = userConfigProperties;
    }

    private List<User.Role> createRoleFromConfig() {

        User.Permission perm1 = User.Permission.builder()
                                    .id(UUID.randomUUID())
                                    .name("READ_ONLY")
                                    .technicalName("read:only")
                                    .description("Can only read data")
                                    .build();

        User.Permission perm2 = User.Permission.builder()
                                    .id(UUID.randomUUID())
                                    .name("UPDATE_PROFILE")
                                    .technicalName("update:profile")
                                    .description("Mettre  ajour sa pp")
                                    .build();

        List<User.Permission> permissions = new ArrayList<>();
        permissions.add(perm1);
        permissions.add(perm2);


        User.Role role1 = User.Role.builder()
                              .id(UUID.randomUUID())
                              .name("USER")
                              .displayName("Regular User")
                              .description("Limited access")
                              .permissions(permissions)
                              .build();

        List<User.Role> roles = new ArrayList<>();
        roles.add(role1);

        return roles;
    }

    public User createUser(UserCreate user) {

        User newUser = User.builder()
                .id(UUID.randomUUID())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .roles(createRoleFromConfig())
                .build();
        return userRepository.save(newUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email)  throws NotFoundException{
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + email));
    }

    public void deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFullName(updatedUser.getFullName());
                    user.setEmail(updatedUser.getEmail());
                    user.setPhoneNumber(updatedUser.getPhoneNumber());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public User addRoleToUser(UUID userId, RoleCreate role) {
        User user = getUserById(userId);
        boolean roleExists = user.getRoles().stream().anyMatch(r -> r.getName().equals(role.getName()));
        if (roleExists) {
            throw new IllegalArgumentException("Role already exists: " + role.getName());
        }
        User.Role roleToCreate = User.Role
                                    .builder()
                                    .id(UUID.randomUUID())
                                    .name(role.getName())
                                    .description(role.getDescription())
                                    .displayName(role.getDisplayName())
                                    .build();
        user.getRoles().add(roleToCreate);
        return userRepository.save(user);
    }

    public User removeRoleFromUser(UUID userId, UUID roleId) {
        User user = getUserById(userId);
        boolean removed = user.getRoles().removeIf(role -> role.getId().equals(roleId));
        if (!removed) {
            throw new NotFoundException("Role not found with id: " + roleId);
        }
        return userRepository.save(user);
    }

    public User addPermissionToRole(UUID userId, UUID roleId, User.Permission permission) {
        User user = getUserById(userId);
        User.Role role = user.getRoles().stream()
                .filter(r -> r.getId().equals(roleId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));
        boolean permissionExists = role.getPermissions().stream().anyMatch(p -> p.getName().equals(permission.getName()));
        if (permissionExists) {
            throw new IllegalArgumentException("Permission already exists: " + permission.getName());
        }
        permission.setId(UUID.randomUUID());
        role.getPermissions().add(permission);
        return userRepository.save(user);
    }

    public User removePermissionFromRole(UUID userId, UUID roleId, UUID permissionId) {
        User user = getUserById(userId);
        User.Role role = user.getRoles().stream()
                .filter(r -> r.getId().equals(roleId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));
        boolean removed = role.getPermissions().removeIf(p -> p.getId().equals(permissionId));
        if (!removed) {
            throw new NotFoundException("Permission not found with id: " + permissionId);
        }
        return userRepository.save(user);
    }
}