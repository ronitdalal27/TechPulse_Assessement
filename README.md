#User Management System (Spring Boot + React + JWT + Role-Based Access)

#Overview
This project is a Full-Stack User Management System built using Spring Boot (Backend) and React (Frontend).  
It implements:
- User registration & login via frontend UI  
- JWT-based authentication  
- Role-based authorization  
- Input validation  
- Global exception handling  
- Consistent API response structure  
- MySQL database integration  
- Integrated with SonarQube for code quality checks  

#Features

#Authentication & Authorization
- Secure JWT-based Authentication
- Role-based access control: ROLE_USER, ROLE_ADMIN

#User Management Operations:
1. `/register` | POST | Register a new user | Public |
2. `/login` | POST | Login and receive JWT token | Public |
3. `/users` | GET | Fetch all users | ADMIN |
4. `/users/{id}` | GET | Fetch user by ID | USER / ADMIN |
5. `/users/{id}` | DELETE | Delete a user by ID | ADMIN |

#Tech Stack:
#Frontend
- React JS (Vite)
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

#Backend
- Java 17
- Spring Boot 3.x
- Spring Security + JWT
- Hibernate + JPA
- MySQL Database
- Maven Build Tool

#Testing & Quality
- SonarQube for code quality
- Postman for API testing

#Setup Instructions

#Prerequisites
Ensure you have:
- Java 17+
- Maven
- Node.js 18+
- MySQL Server running


#Clone Repository
git clone https://github.com/ronitdalal/UserManagementSystem.git

#application properites setup
spring.datasource.url=jdbc:mysql://localhost:3306/userdb
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
#JWT Secret
app.jwt.secret=your_jwt_secret_key
app.jwt.expiration=86400000

cd user-service\user-service 

#Backend Setup (Spring Boot)
run spring boot app -
mvn clean install
mvn spring-boot:run

#frontend setup
cd frontend
cd user-project
npm install
npm run dev
run frontend on url - http://localhost:5173/register

#Testing the Application (Frontend + Backend + DB) :

1. Start MySQL and ensure database userdb exists.
2. Run the Spring Boot backend (http://localhost:8080)
3. Run the React frontend (http://localhost:5173)
4. Visit: http://localhost:5173/register
5. Register a new user (default role = ROLE_USER)
6. Login with the registered credentials.
   Once logged in:
   1. Normal users can view their profile (/users/{id})
   2. Admin users can view all users (/users) or delete users.

Author -
Ronit Ravindra Dalal
Pune, Maharashtra.
Email - dalalronit131@gmail.com PhNo - 8010166496


