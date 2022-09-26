Feature('Games @API');
var assert = require('assert');
var response;
var data;

Before(async({I}) => {
    response = await I.getGames();
    assert(response.status === 200 && response.statusText === "OK");
    data = response.data;
});

Scenario('001: Validate game_id key is present for every game', async ({ I }) => {  
    var key_gameId = await I.validateKeyInObject(data, "game_id");
    assert.strictEqual(key_gameId.isValid, true, `${key_gameId.message}`);
});

Scenario('002: Validate city key is present for every athlete', async ({ I }) => {
    var key_city = await I.validateKeyInObject(data, "city");
    assert.strictEqual(key_city.isValid, true, `${key_city.message}`);
});

Scenario('003: Validate year key is present for every athlete', async ({ I }) => {
    var key_year = await I.validateKeyInObject(data, "year");
    assert.strictEqual(key_year.isValid, true, `${key_year.message}`);
});

Scenario('004: Return a list of athletes who have competed in a given game @SMOKE', async ({ I }) => {
    var listOfGameIds = await I.getList(data, "game_id");
    for (var i = 0; i < listOfGameIds.length; i++){
        var game_id = listOfGameIds[i];
        response = await I.getGameAthletes(game_id);
        data = response.data;
        assert(response.status === 200 && response.statusText === "OK"); 
        if (Object.keys(data).length === 0){
            console.log(`No Athletes found for game_id: ${game_id}`)
        } else{
            var key_athleteId = await I.validateKeyInObject(data, "athlete_id");
            var key_name = await I.validateKeyInObject(data, "name");
            var key_surname = await I.validateKeyInObject(data, "surname");
            var key_bio = await I.validateKeyInObject(data, "bio");
            var key_dateOfBirth = await I.validateKeyInObject(data, "dateOfBirth");
            var key_weight = await I.validateKeyInObject(data, "weight");
            var key_height = await I.validateKeyInObject(data, "height");
            var key_photoId = await I.validateKeyInObject(data, "photo_id");
            assert.strictEqual(key_athleteId.isValid, true, `${key_athleteId.message}`);  
            assert.strictEqual(key_name.isValid, true, `${key_name.message}`);
            assert.strictEqual(key_surname.isValid, true, `${key_surname.message}`);
            assert.strictEqual(key_dateOfBirth.isValid, true, `${key_dateOfBirth.message}`);
            assert.strictEqual(key_bio.isValid, true, `${key_bio.message}`);
            assert.strictEqual(key_weight.isValid, true, `${key_weight.message}`);
            assert.strictEqual(key_height.isValid, true, `${key_height.message}`);
            assert.strictEqual(key_photoId.isValid, true, `${key_photoId.message}`);
        };
    };
});

Scenario('005: Validate a 404 response when requesting athletes for a non-existing games_id @fail', async ({ I }) => {
    response = await I.getGameAthletes(99);
    data = response.data;
    assert(response.status === 404 && response.statusText === "Not Found");
    // Would normally expect a 404 Not Found response when the request made has an non-existing id
});

Scenario('006: Validate a 400 response when requesting athletes for an invalid games_id @fail', async ({ I }) => {
    response = await I.getGameAthletes("abc");
    data = response.data;
    assert(response.status === 400 && response.statusText === "Bad Request");
    // Would normally expect a 400 Bad Request response when the request made has an invalid input
});