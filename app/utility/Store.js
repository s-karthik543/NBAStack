/* eslint-disable semi */
import moment from 'moment';
/*
  season will always be YYYY-YY
  ex1: if the season is in the month March 2016,
    year will be 2015
    season will be 2015-16
  ex2: if the season is in the month October 2016,
    year will be 2016
    season will be 2016-17
*/
export default {
    date: moment().format('L'),
    season: '2016-17',
    seasonForPlayerIDLookup: '2016-17',
    year: 2016,
    playersInSeason: [],
    navBarColorForTeamPage: '#4CAF50'
};
/* eslint-enable semi */
