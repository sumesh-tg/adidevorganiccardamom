// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"http://localhost:1337",
  firebaseConfig : {
    apiKey: "AIzaSyCNPSIFhAgdCeYO9HtbtTKUXmMlDlZCnHk",
    authDomain: "adidevorganiccardamom.firebaseapp.com",
    projectId: "adidevorganiccardamom",
    storageBucket: "adidevorganiccardamom.appspot.com",
    messagingSenderId: "476846755194",
    appId: "1:476846755194:web:56d5058227382627df5ac3",
    measurementId: "G-RLCMB7J970"
  },
  postCollectionsName:"test_posts",
  quizCategoryCollectionName:"test_quiz_cat",
  quizQuestionsCollectionName:"test_quiz_questions",
  stockCollectionName:"test_stocks",
  qualityReportCollectionName:"test_quality_report"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
