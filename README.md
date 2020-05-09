# Hospital-API-with-unit-testing

## Problem Statement
[Click here to view problem statement](https://docs.google.com/document/d/1z3PhoPuouGzGQxp9kTms47ctYMeUq2xHwdJKWivj3wA/edit)


## Project setup:
  * install all dependencies using npm install. [Note: You should have npm and node setup]
  * For starting the app run nodemon app.js or node app.js if nodemon is not installed.
  * To run the tests use command npm test and the output will be on your console.
  * To test the api manually you should have postman installed. You can find the link to download it here:
  [Link to download postman](https://www.postman.com/)

* Below are different routes that were used in this project with detailed description. You can use these routes with 
 postman to get a better understanding. The base url is "localhost:3000/api/v1/". 

## Routes

### Register a doctor
  * Method:POST
  * Url: "localhost:3000/api/v1/doctors/register"
  * You can pass the request either in url-encoded or raw json format.
  * Parameters: {username:"xyz",password:"abc"}

### Login a doctor using username and password
  * Method:POST
  * Url: "localhost:3000/api/v1/doctors/login"
  * You can pass the request either in url-encoded or raw json format.
  * Parameters: {username:"xyz",password:"abc"}
  * The response of this request will contain an encrypted token that you need to store for future purposes. It will be valid for
  1hour.

### Register a patient if Doctor is authenticated
  * Method:POST
  * Url: "localhost:3000/api/v1/patients/register"
  * You can pass the request either in url-encoded or raw json format.
  * Parameters: {phone:"1234567891"}
  * You will need the token generated in previous step. After passing the above parameters to request.body, add that token to
  headers in postman. Create a new field "Authorization" and pass the toke value as "Bearer "
  +{token value generated in previous step}.
  * You would likely get a positive response if the token is genuine. 

### Add reports for a patient (if Authenticated): 
  * Method:POST
  * Url: "localhost:3000/api/v1/patients/:patientId/create_report"
  * In the above Url the ":patientId" must be replaced by a valid id of the existing patients _id in database.
  * You can pass the request either in url-encoded or raw json format.
  * Parameters: {status:"Negative"}. [#Note value of status can only be among ['Negative', 'Travelled-Quarantine', 
  'Symptoms-Quarantine', 'Positive-Admit']]. These values are case-sensitive.
  * You will need to pass the token as described in above route2 (Point number 5).

### Get a list of all the reports of a patient
  * Method:POST
  * Url: "localhost:3000/api/v1/patients/:patientId/all_reports"
  * In the above Url the ":patientId" must be replaced by a valid id of the existing patients _id in database.
  * You will need to pass the token as described in above route2 (Point number 5).

### List all the reports of all the patients filtered by a specific status
  * Method:POST
  * Url: "localhost:3000/api/v1/reports/:status"
  * Replace ":status" in the above url from one of these ['Negative', 'Travelled-Quarantine',   'Symptoms-Quarantine',
  'Positive-Admit']. These values are case-sensitive.
  * You will need to pass the token as described in above route2 (Point number 5). Generate a new token if expired.
