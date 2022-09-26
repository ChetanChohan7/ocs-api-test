'use strict';
let I;
const helper = require('@codeceptjs/helper');
var config = require('codeceptjs').config.get();

class restHelper extends helper {
  _init() {
    I = actor();
  };

  async getAthletes() {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(config.endpoints.athletes, headers);
    return response;
  };

  async getAthlete(athleteId) {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(`${config.endpoints.athletes}/${athleteId}`, headers);
    return response;
  };

  async getAthletePhoto(athleteId) {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(`${config.endpoints.athletes}/${athleteId}/photo`, headers);
    return response;
  };

  async getAthleteResults(athleteId) {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(`${config.endpoints.athletes}/${athleteId}/results`, headers);
    return response;
  };

  async getGames() {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(config.endpoints.games, headers);
    return response;
  };

  async getGameAthletes(gameId) {
    var client = this.helpers['REST'];
    let response = null;
    var headers = `{ accept: application/json }`;
    response = await client.sendGetRequest(`${config.endpoints.games}/${gameId}/athletes`, headers);
    return response;
  };

}
module.exports = restHelper;