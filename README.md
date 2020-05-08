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


### Lauri documentation and stuff are in branch Lauri

### Joonas documentation and stuff are in branch joonan_branch

