Feature('Athletes @API');
var assert = require('assert');
var response;
var data;

Before(async({I}) => {
    response = await I.getAthletes();
    assert(response.status === 200 && response.statusText === "OK");
    data = response.data;    
});

Scenario('001: Validate athlete_id key is present for every athlete', async ({ I }) => {
    var key_athleteId = await I.validateKeyInObject(data, "athlete_id");
    assert.strictEqual(key_athleteId.isValid, true, `${key_athleteId.message}`);
});

Scenario('002: Validate name key is present for every athlete', async ({ I }) => {
    var key_name = await I.validateKeyInObject(data, "name");
    assert.strictEqual(key_name.isValid, true, `${key_name.message}`);
});

Scenario('003: Validate surname key is present for every athlete', async ({ I }) => {
    var key_surname = await I.validateKeyInObject(data, "surname");
    assert.strictEqual(key_surname.isValid, true, `${key_surname.message}`);
});

Scenario('004: Validate bio key is present for every athlete', async ({ I }) => {
    var key_bio = await I.validateKeyInObject(data, "bio");
    assert.strictEqual(key_bio.isValid, true, `${key_bio.message}`);
});

Scenario('005: Validate date of birth key is present for every athlete', async ({ I }) => {
    var key_dateOfBirth = await I.validateKeyInObject(data, "dateOfBirth");
    assert.strictEqual(key_dateOfBirth.isValid, true, `${key_dateOfBirth.message}`);
});

Scenario('006: Validate weight key is present for every athlete', async ({ I }) => {
    var key_weight = await I.validateKeyInObject(data, "weight");
    assert.strictEqual(key_weight.isValid, true, `${key_weight.message}`);
});

Scenario('007: Validate height key is present for every athlete', async ({ I }) => {
    var key_height = await I.validateKeyInObject(data, "height");
    assert.strictEqual(key_height.isValid, true, `${key_height.message}`);
});

Scenario('008: Validate photo_id key is present for every athlete', async ({ I }) => {
    var key_photoId = await I.validateKeyInObject(data, "photo_id");
    assert.strictEqual(key_photoId.isValid, true, `${key_photoId.message}`);
});

Scenario('009: Validate athlete_id is a string @SMOKE', async ({ I }) => {
    var value_athlete_id = await I.validateValueType(data, "athlete_id", "string");
    assert.strictEqual(value_athlete_id.isValid, true, `${value_athlete_id.message}`);
});

Scenario('010: Validate name is a string', async ({ I }) => {
    var value_name = await I.validateValueType(data, "name", "string");
    assert.strictEqual(value_name.isValid, true, `${value_name.message}`);
});

Scenario('011: Validate surname is a string', async ({ I }) => {
    var value_surname = await I.validateValueType(data, "surname", "string");
    assert.strictEqual(value_surname.isValid, true, `${value_surname.message}`);
});

Scenario('012: Validate date of birth is a string', async ({ I }) => {
    var value_dateOfBirth = await I.validateValueType(data, "dateOfBirth", "string");
    assert.strictEqual(value_dateOfBirth.isValid, true, `${value_dateOfBirth.message}`);
});

Scenario('013: Validate bio is a string', async ({ I }) => {
    var value_bio = await I.validateValueType(data, "bio", "string");
    assert.strictEqual(value_bio.isValid, true, `${value_bio.message}`);
});

Scenario('014: Validate weight is a number', async ({ I }) => {
    var value_weight = await I.validateValueType(data, "weight", "number");
    assert.strictEqual(value_weight.isValid, true, `${value_weight.message}`);
});

Scenario('015: Validate height is a number', async ({ I }) => {
    var value_height = await I.validateValueType(data, "height", "number");
    assert.strictEqual(value_height.isValid, true, `${value_height.message}`);
});

Scenario('016: Validate photo_id is a number', async ({ I }) => {
    var value_photoId = await I.validateValueType(data, "photo_id", "number");
    assert.strictEqual(value_photoId.isValid, true, `${value_photoId.message}`);
});

Scenario('017: Get singular athlete @SMOKE', async ({ I }) => {
    response = await I.getAthlete("1");
    data = response.data;
    assert(response.status === 200 && response.statusText === "OK");
    assert(data.hasOwnProperty('athlete_id'));
    assert(data.hasOwnProperty('name'));
    assert(data.hasOwnProperty('surname'));
    assert(data.hasOwnProperty('dateOfBirth'));
    assert(data.hasOwnProperty('bio'));
    assert(data.hasOwnProperty('weight'));
    assert(data.hasOwnProperty('height'));
    assert(data.hasOwnProperty('photo_id'));
});

Scenario('018: Validating Athlete Results have City, Year, # of Gold, # of Silver, # of Bronze @SMOKE', async ({ I }) => {
    var listOfAthleteIds = await I.getList(data, "athlete_id");
    for (var i = 0; i < listOfAthleteIds.length; i++){
        var athlete_id = listOfAthleteIds[i];
        response = await I.getAthleteResults(athlete_id);
        data = response.data;
        assert(response.status === 200 && response.statusText === "OK"); 
        if (Object.keys(data).length === 0){
            console.log(`No results found for athlete_id: ${athlete_id}`)
        } else{
            var key_city = await I.validateKeyInObject(data, "city");
            var key_year = await I.validateKeyInObject(data, "year");
            var key_gold = await I.validateKeyInObject(data, "gold");
            var key_silver = await I.validateKeyInObject(data, "silver");
            var key_bronze = await I.validateKeyInObject(data, "bronze");

            assert.strictEqual(key_city.isValid, true, `${key_city.message}`);
            assert.strictEqual(key_year.isValid, true, `${key_year.message}`);
            assert.strictEqual(key_gold.isValid, true, `${key_gold.message}`);
            assert.strictEqual(key_silver.isValid, true, `${key_silver.message}`);
            assert.strictEqual(key_bronze.isValid, true, `${key_bronze.message}`);
        };
    };
});

// Separated test for "Fourths" as although it is part of the API spec, it is not an included paramter in the database
Scenario('019: Validate Fourths is present in the athletes results @fail', async ({ I }) => {
    response = await I.getAthleteResults("1");
    data = response.data;
    assert(response.status === 200 && response.statusText === "OK");
    var key_fourths = await I.validateKeyInObject(data, "fourths");
    assert.strictEqual(key_fourths.isValid, true, `${key_fourths.message}`);
    // Fourths is missing from the database and so is missing from the return
});

Scenario('020: Validate city is a number', async ({ I }) => {
    var value_city = await I.validateValueType(data, "city", "number");
    assert.strictEqual(value_city.isValid, true, `${value_city.message}`);
});

Scenario('021: Validate year is a number', async ({ I }) => {
    var value_year = await I.validateValueType(data, "year", "number");
    assert.strictEqual(value_year.isValid, true, `${value_year.message}`);
});

Scenario('022: Validate gold is a number', async ({ I }) => {
    var value_gold = await I.validateValueType(data, "gold", "number");
    assert.strictEqual(value_gold.isValid, true, `${value_gold.message}`);
});

Scenario('023: Validate silver is a number', async ({ I }) => {
    var value_silver = await I.validateValueType(data, "silver", "number");
    assert.strictEqual(value_silver.isValid, true, `${value_silver.message}`);
});

Scenario('024: Validate bronze is a number', async ({ I }) => {
    var value_bronze = await I.validateValueType(data, "bronze", "number");
    assert.strictEqual(value_bronze.isValid, true, `${value_bronze.message}`);
});

Scenario('025: Validate a 404 response when requesting an athlete using an non-existing athlete_id @fail', async ({ I }) => {
    response = await I.getAthlete("99");
    data = response.data;
    assert(response.status === 404 && response.statusText === "Not Found");
    // Would normally expect a 404 Not Found response when the request made has an non-existing id
});

Scenario('026: Validate a 404 response when requesting an athletes photo for a non-existing athlete_id @fail', async ({ I }) => {
    response = await I.getAthletePhoto("99");
    data = response.data;
    assert(response.status === 404 && response.statusText === "Not Found");
    // Would normally expect a 404 Not Found response when the request made has an non-existing id
});

Scenario('027: Validate a 400 response when requesting athletes for an invalid athlete_id @fail', async ({ I }) => {
    response = await I.getAthlete(9%9);
    data = response.data;
    assert(response.status === 400 && response.statusText === "Bad Request");
    // Would normally expect a 400 Bad Request response when the request made has an invalid input
});