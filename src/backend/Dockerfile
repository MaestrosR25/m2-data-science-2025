FROM eclipse-temurin:21-jdk-jammy
ARG APP_NAME
WORKDIR /app
COPY ./ /app
CMD ["./mvnw", "-P", "prod", "spring-boot:run"]
