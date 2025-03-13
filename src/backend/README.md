user:<userId>:app:<applicationId>:token


    @ManyToMany(mappedBy = "users")
    private List<Application> applications = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"),
        indexes = {
            @jakarta.persistence.Index(name = "idx_user_id", columnList = "user_id"),
            @jakarta.persistence.Index(name = "idx_role_id", columnList = "role_id")
        }
    )
    private List<Role> roles = new ArrayList<>();






        @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "role_permission",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id"),
        indexes = {
            @jakarta.persistence.Index(name = "idx_role_id", columnList = "role_id"),
            @jakarta.persistence.Index(name = "idx_permission_id", columnList = "permission_id")
        }
    )
    private List<Permission> permissions = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_application",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "application_id"),
        indexes = {
            @jakarta.persistence.Index(name = "idx_role_id", columnList = "role_id"),
            @jakarta.persistence.Index(name = "idx_application_id", columnList = "application_id")
        }
    )
    private List<Application> applications = new ArrayList<>();