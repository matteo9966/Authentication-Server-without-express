# Authentication-Server-without-express

This project is a Nodejs server written without express - 
The idea was to implement the middleware pattern and creating something similar to express.
You can find the implementation of the pattern inside the folder "Pipeline"

This server was created for the course [Angular Security Masterclass](https://www.udemy.com/course/angular-security/)

# Branches

- user-jwt : server uses jwt as a way to authenticate the user
- user-session : server uses an in memory sessionId map to authenticate the user

# how to use with the Angular client: [Angular client](https://github.com/matteo9966/angular-jwt-authentication)

- checkout to branch `user-jwt`;
- run `git switch user-jwt` <br>
(this is currently the branch that uses jwt)
- run ` npm run start:https`

this should start the server on port 9000


