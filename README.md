"# Qapp" 

Simple login screen ready

JWT Authentication Working

DB_URL=mongodb://Test1:Test123@localhost:27017/qapp

Joona tee mongoo uus db nimelt qapp ja sinne user Test, Test123

use qapp 

db.createUser(
  {
    user: "Test1",
    pwd:  "Test123", // or cleartext password
    roles: [ { role: "readWrite", db: "qapp" }]
  }
)