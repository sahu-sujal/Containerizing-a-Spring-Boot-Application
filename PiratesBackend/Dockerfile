FROM maven:3.8.5-openjdk-17

WORKDIR /app

COPY . /app

RUN mvn clean install -DskipTests

CMD ["java","-jar","/app/target/backend-0.0.1-SNAPSHOT.jar"]