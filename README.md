"# Qapp" 

Simple login screen ready

JWT Authentication Working

DB_URL=mongodb://Test1:Test123@localhost:27017/qapp

Joona tee mongoo uus db nimelt qapp ja sinne user Test, Test123
```
use qapp 
```
```
db.createUser(
  {
    user: "Test1",
    pwd:  "Test123", // or cleartext password
    roles: [ { role: "readWrite", db: "qapp" }]
  }
)
```

**23.4** 

Started the Project

**24.4**

Frontend for the login
and did stuff with login, auth stuff

**26.4**

working on registration
Login works and registration works


**28.4**

Jelastic works