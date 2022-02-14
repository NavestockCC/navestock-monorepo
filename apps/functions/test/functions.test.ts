import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

import * as myFunctions from "../src/main";
import { FunctionsErrorCode } from 'firebase-functions/v1/https';
import { pubsub } from 'firebase-functions/v1';
import assert = require('assert');


const testEnv =functions({
  databaseURL: "https://test-navestock-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: 'test-navestock-website'
}, '../test-navestock-website-firebase-adminsdk.json')


describe('Hello World Test', () => {
   let wrapped: any;

   const req = new Request();
   const res = {
    redirect: (code, url) => {
      assert.equal(code, 303);
      assert.equal(url, "new_ref");
    }
  };
myFunctions.httpTriggerPlayCricetImport(req, res);  
});