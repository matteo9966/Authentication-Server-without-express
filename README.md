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

# user token that expires in one month for tests

SESSION_ID=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsImlkIjoiZ251MGFkdGRzdHAiLCJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoidXNlclRlc3QiLCJpYXQiOjE2NzY5OTA1MzIsImV4cCI6MTY3OTU4MjUzMn0.C8-7to6IrZkyujCFWS4bEW9tZz-Y5B6kCGdym4HyuRSoNB8zcK27JcG2DEhWs77XHuaTNJF9SngQm3QJTPxVgrdsZEEPZPNl-oHKeOrWND7OEhjdGzkZ3JrDgSpHCOI2YjI3Pv5I-lOLcQnJTJ7UBuz3hryKJ8iB9SHb9lhDbGNAkZDnmKikUCFx5ysjytoV4gQcrZHR5djziYFkqke373k11VCNGxB5Xi_j4xdYlzAo4oC7eR8b1Ir0c2N1HbZUV_CBTkHYmFhczzrsrUWNgZT6tZQfp8kpgUiFTdzgPBUc1YzWiIWA82h6ajGi00GYTbc6AguALHkfpNOn1FtFVg;


# Testing
I finally started adding some tests to the api using mocha chai and supertest,
The test cover these endpoints:

- /api/refresh
- /api/whoami 

