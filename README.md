Server-side-scripting\week2

I pulled Joonas branch so the documentation will be somewhat the same but I will edit stuff that I did

readme
----------------------------------------------------------------
# Important stuff
### .env file
DB_URL=mongodb://Test1:Test123@localhost:27017/qapp  
your_jwt_token=Projekti

### .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}

RewriteCond %{THE_REQUEST} /([^.]+)\.html [NC]
RewriteRule ^ /%1 [NC,L,R]

RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^ %{REQUEST_URI}.html [NC,L]

### PWA implemented

- known bugs
 - not working lmao


# Project progress:

### 22.4. Wednesday: Q-app project start

- Had a Discord call with Joona regarding the project.
- We did some planning and catching up regarding the course and the project.
- Did some alterations to the Q-app prototype using Adobe XD but joonan made one that was better so we went with that one.

### 23-24.4. 

- I started building the project
- first i wanted to get the login page and auth routes to works


### 26.4. 
- Had a discord call with Joona about the project progress.
- finally got the login working and started doing the registration
- got the registration to work

### 27.4. 
- Until this point git has been kind of a mystery when it comes to collaborating
- I learned a lot today about version control, merging and conflicts


### 28.4.
- Did some basic front-end as well
- battled the whole day almost with jelastic but got it finally working by the end of the night.

### 29.4.
- We were also brainstorming the user querys and what fields there should be.
 - _id, username, password, posts, profile_settings etc.

### 30.4.-01.5. vappu
- This time was spent with friends and family
 - Lost time will be compensated on the weekend

### 02.5. 
- did not push anything to git so nothing big happened

### 03.5. 
- Profile.html shows who's logged in. 
- spend a lot of time studying graphql

### 04.5. 
- got auth redirect working
- spend a lot of time studying graphql

### 05.5. 
- battled with error message that shows a message when login fails
- had problem that after you logout the error message wont work anymore

### 6.5. 
- spend a lot of time studying graphql
 - got the logout button to  somewhat function 
 
### 7.5
- got the post upload to work
- got the post query to work
- had an presentation
- really happy that I managed to do stuff without tutorials
