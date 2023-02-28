# Authentication-Server-without-express

This project is a Nodejs server written without express - 
The idea was to implement the middleware pattern and creating something similar to express.
You can find the implementation of the pattern inside the folder "Pipeline"

This server was created for the course Angular Security - from angular university


### This project works whit the angular security course, use that repository together with this one.


# 

# Branches

- user-jwt : server uses jwt as a way to authenticate the user
- user-session : server uses an in memory sessionId map to authenticate the user


# user token that expires in one month
SESSION_ID=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsImlkIjoiZ251MGFkdGRzdHAiLCJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoidXNlclRlc3QiLCJpYXQiOjE2NzY5OTA1MzIsImV4cCI6MTY3OTU4MjUzMn0.C8-7to6IrZkyujCFWS4bEW9tZz-Y5B6kCGdym4HyuRSoNB8zcK27JcG2DEhWs77XHuaTNJF9SngQm3QJTPxVgrdsZEEPZPNl-oHKeOrWND7OEhjdGzkZ3JrDgSpHCOI2YjI3Pv5I-lOLcQnJTJ7UBuz3hryKJ8iB9SHb9lhDbGNAkZDnmKikUCFx5ysjytoV4gQcrZHR5djziYFkqke373k11VCNGxB5Xi_j4xdYlzAo4oC7eR8b1Ir0c2N1HbZUV_CBTkHYmFhczzrsrUWNgZT6tZQfp8kpgUiFTdzgPBUc1YzWiIWA82h6ajGi00GYTbc6AguALHkfpNOn1FtFVg;


# add this user to the dev-json-database to create an admin user
```json
{
  "email": "admin@admin.admin",
  "passwordDigest": "$argon2id$v=19$m=65536,t=3,p=4$739HXavqW7kfVLrlH4Mayw$F2ip72/KsajE6DonfvjTQdTGtzuJvAb/p4nt/RjExNA",
  "id": "1alduchsg0g",
  "roles": [
    "ADMIN"
  ],
  "username": "superadmin"
}
```

the admin password is Secret1

# a predefined database with some users
```json
{
    "user": {
        "999788a2d46d19e702797566264b373e": {
            "email": "test@test.it",
            "passwordDigest": "$argon2id$v=19$m=65536,t=3,p=4$PRKqtxA7mrf58IyEfNlzyA$JrOD0qlbkGIyQkinmgoBTSsQrDzMvkpcu/DKmFCAVfs",
            "id": "fvxr94qbhj6",
            "roles": [
                "USER"
            ],
            "username": "userTest"
        },
        "d8f8c92605cd87378edfa7ea628b2740": {
            "email": "ada@ada.it",
            "passwordDigest": "$argon2id$v=19$m=65536,t=3,p=4$r3UioC+0L9rpPAXT4kiw5g$2tzaJxv7CsqSuWLtE587p6XTGV6b1Y92k7fZkKyDxCI",
            "id": "mlna3prw8cs",
            "roles": [
                "USER"
            ],
            "username": "user_f7an6bv7gxv"
        },
        "88a7272a9a6a02dc9ad21c1cdec6e9de": {
            "email": "m@m.it",
            "passwordDigest": "$argon2id$v=19$m=65536,t=3,p=4$wav5wZi0fNWDFfFMbsrQrw$jrQMbakZMWmwZr2hYWhNuHZhe5uq80TgUDwsVesEMVY",
            "id": "0f3bfd4y9it",
            "roles": [
                "USER"
            ],
            "username": "user_s7lq2fgu88e"
        },
        "839531d0faa3e6efb8d874dd74a8e530": {
            "email": "admin@admin.admin",
            "passwordDigest": "$argon2id$v=19$m=65536,t=3,p=4$739HXavqW7kfVLrlH4Mayw$F2ip72/KsajE6DonfvjTQdTGtzuJvAb/p4nt/RjExNA",
            "id": "1alduchsg0g",
            "roles": [
                "ADMIN"
            ],
            "username": "superadmin"
        }
    }
}
```