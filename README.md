Node js module to integrate with github openid provider.

This module allows users to login with their own github credentials using github openid interface. 

Step1: Copy the bundle to /login directory
Step2: Create /register Oauth application in git hub
        * Enter Home page url as http://<hostname>:<port>/index.html
        * Enter Callback url as http://<hostname>:<port>/callback
Step3: Change clientId, and Client Secret in ./index.js (Server side)
Step4: run `npm install in /login directory`
Step5: run `node --trace-warnings index.js`
Step6: open browser navigate to http://<hostname>:<port>/index.html
Step7: follow login process with github
Step8: Once user is verified by github, will get redirected to /callback method.
Step9: a token is generated and sent to /home.html, which pull user details and repos and display them

