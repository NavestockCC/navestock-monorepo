// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  stage: "production",

  // Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebaseConfig: {
  apiKey: "AIzaSyB0K4yHNm8n7VWAn0JsmPZEcSnsCXQKrW8",
  authDomain: "navestock-website.firebaseapp.com",
  databaseURL: "https://navestock-website.firebaseio.com",
  projectId: "navestock-website",
  storageBucket: "navestock-website.appspot.com",
  messagingSenderId: "394030533382",
  appId: "1:394030533382:web:073bcb2d1969fcf2",
  measurementId: "G-VJWGM43DTB"
},

  // Google map key
    googleMapKey: {
    apiKey: 'AIzaSyB0K4yHNm8n7VWAn0JsmPZEcSnsCXQKrW8'
    }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// For Firebase JS SDK v7.20.0 and later, measurementId is optional