# Project progress:

### 22.4. Wednesday: Q-app project start

- Had a Discord call with Lauri regarding the project.
- - We did some planning and catching up regarding the course and the project.
- Did some alterations to the Q-app prototype using Adobe XD.
- - This was done in preparations for the prototype V2 that I'll make next week before finalizing front-end.

### 23-24.4. Thursday-Friday: Home-life stuff**

- Thursday after work my free time was occupied by running around home furnishing stores with my SO.
- Friday after work was spent plucking studs out of my old winter tires and doing some general maintenance on my car.
- - The idea was to catch up to the time lost during weekend.

### 25.4. Saturday: Cloned and setup Lauri's repository locally
- Cloned Lauri's .git repository.
- - Requested contribution access to Lauri's repository.
- Went over Lauri's code and did some code reformatting/clean up for my own branch.
- - Did some tweaks to .env file.

### 26.4. Sunday: PWA implemented
- Had a discord call with Lauri about the project progress.
- Lauri granted me access to push to his git.
- - Created new Branch 'joonan_branch'.
- - Pushed my edits.
- Implemented PWA with custom icons etc..
- Decided to start updating progress to 'README .md'.

### 27.4. Monday: Learning git and merging
- Until this point git has been kind of a mystery when it comes to collaborating
- - I learned a lot today about version control, merging and conflicts
- I have also done some basic front-end to help navigate the app
- - Next up is implementing the actual code for the uploads

### 28.4. Tuesday: Jelastic troubleshooting and file uploading
- Started coding image/file upload for the project
- - Did some basic front-end as well
- - Next step is to make the upload compatible with rest of the project
- - Upload is now compatible to my knowledge. Next up is better front-end and putting it behind authentication.
- Lauri uploaded project to jelastic and we started to troubleshoot PWA and registration/login not working
- - As of today we did not find a solution

### 29.4. Wednesday: Learning more about GraphQL and linking data to user
- Now that the upload to db works through our app it's time to link the uploaded files to the user doing the upload.
- We were also brainstorming the user querys and what fields there should be.
- - _id, username, password, posts, profile_settings etc.
- I also uploaded the Q-app to jelastic for troubleshooting on my end.

### 30.4.-01.5. Thursday-Friday: Wabu ei lopu
- This time was spent with friends and family
- - Lost time will be compensated on the weekend

### 02.5. Saturday: Prototype 2.0, User stories and NPM-package assignments revisited
- Now that the basic back-end is in place and front-end is needed to fully realize it I decided to do a revised prototype of the app.
- - PROTOTYPE 2.0
- - removed unnecessary stuff.
- We did User stories assigment again based on the feedback we got.
- We have done some better research for NPM-packages and APIs for the project since the assignment so we updated the Trello board accordingly.

### 03.5. Sunday: Upload and Profile fron-end. Upload back-end for image fetch etc.
- Upload.html will eventually be removed. It is being replaced by profile.html for now with its profile picture upload.
- - Eventually Uploading will also be implemented to posts and comments.
- Profile.html shows who's logged in. 
- - Username <div> will eventually fetch the logged in username.
- - Same thing applies to the profile picture, which will be fetched from MongoDB using GridFS.
- - Updating user info should also be implemented soon and will be accessible from profile.hmtl

### 04.5. Monday: Authentication check and other back-end implementations
- Today I tried to implement the authCheck for user status etc.
- The goal was to redirect the user when no auth token was detected
- - Did not achieve this. I did however remove a lot of obselete fields and code. Additionally I moved some code to places that make more sense.
- - Lauri however did have some success on this and now we have a working auth redirect etc.

### 05.5. Tuesday: Trying to implemenent the CRUD blog style back-end with graphQL etc.
- Created a seperate project for this back-end implementation as it did differ somewhat from Lauri's already implemented authentication etc.
- - Back-end works somewhat with postman, but front-end doesn't want to co-operate with back-end just yet.
- - I somewhat succesfully implemented the important parts from new temporary project to the main project so it works and communicates with Lauri's code.
- - Currently working on implementing the front-end properly so it communicates with the back-end I've initiated
- I had some major problems with my webstorm. My student subscription had run out and after renewal it needed to update which led to a lot of problems before I got it working again.
- Today I pushed barely anything to git, because the code is so badly in progress and doesn't make any sense.

### 6.5. Wednedsay: Git merge problems and new implementation for Image upload/fetch
- We made a relevation with Lauri, that it's a bit stupid to send the actual images to the database.
- - The solution for now is to try and implement a new upload/fetch strategy for servers local storing and use database for storing query and image id etc.
- - Kinda running out of time so must focus on front-end
 
### 7.5. Thursday: Some final Front-End and small bugs
- I did some final front end during the night to get this project into a representable state in time for the presentation.
- After the presentation:
- - A lot of bugs. Like A LOT. Small bugs that needed ironing, this ended up being kinda fun.
- - Late in the evening I notice our posting isn't working and full on panic ensued. Thankfully Lauri noticed what was wrong and we fixed it.

### 8.5. Friday: PWA and HTTPS fixes and implementation to Jelastic
- Pushed the code to git and pulled it to jelastic. After a lot of tinkering with mongod and .env file I got it to work as it should.
- Finally got the PWA and HTTPS redirect working after finding jelastic's "hidden" SSL setting.
