# firestore-emulator-unit-testing

https://firebase.google.com/docs/functions/unit-testing



setup firebase project - just do it as usual.
firebase login
firebase init

then either:
npm init
npm install @firebase/testing --save-dev
npm install mocha --save-dev

OR
 
git clone ...
npm install

----
from new shell run: firebase emulators:start
now local firestore instance is available here: http://localhost:4000/firestore/posts/public_post
 