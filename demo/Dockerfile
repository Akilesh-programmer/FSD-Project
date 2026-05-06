# Multi-stage build for Spring Boot app (Java 21)
FROM maven:3.10-eclipse-temurin-21 AS builder
WORKDIR /app

# copy pom and download dependencies (use go-offline for speed)
COPY pom.xml .
RUN mvn -B -DskipTests dependency:go-offline

# copy source and build
COPY src ./src
RUN mvn -B -DskipTests package -DskipTests

# runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
