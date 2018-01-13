import * as types from './types'
import Api from '../utility/Api'

// retrieves game stats for a specific game
export const getGameStats = (game) => {

    return (dispatch, getState) => {
        let date = game.date;
        let gameID = game.id;
        let url = 'http://data.nba.com/data/10s/json/cms/noseason/game/' + date + '/' + gameID + '/boxscore.json';

        dispatch(setStatsLoader(true))
        return Api.get(url).then((jsonResponse) => {
            let homeStats = jsonResponse.sports_content.game.home;
            let awayStats = jsonResponse.sports_content.game.visitor;

            dispatch(setGameStatsData(homeStats, awayStats))

            dispatch(setStatsLoader(false))

        }).catch((error) => {
            console.log(error);
            dispatch(setStatsLoader(false))
        })
    }
}

export const setGameStatsData = (homeStats, awayStats) => {
    return {
        type: types.GAME_STATS_DATA,
        data: {
            homeStats: homeStats,
            awayStats: awayStats
        }
    }
}

export const setStatsLoader = (isLoading) => {
    return {
        type: types.GAME_STATS_LOADER,
        isLoading: isLoading
    }
}

export const getTeamStats = (teamID, season) => {
    return (dispatch, getState) => {
        let url = 'http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=' + teamID + '&season=' + season;
        dispatch(setTeamStatsLoader(true))
        return Api.get(url).then((jsonResponse) => {

            let teamStatsRecord = jsonResponse.resultSets[0].rowSet
            let teamStatsLeague = jsonResponse.resultSets[1].rowSet

            dispatch(getPlayers(teamID, season, teamStatsRecord, teamStatsLeague))

        }).catch((error) => {
            dispatch(setTeamStatsLoader(false))
            console.log(error);
        });
    }
}

export const getPlayers = (teamID, season, teamStatsRecord, teamStatsLeague) => {
    return (dispatch, getState) => {
        let url = 'http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=' + season + '&SeasonSegment=&SeasonType=Regular+Season&TeamID=' + teamID + '&VsConference=&VsDivision';
        return Api.get(url).then((jsonResponse) => {

            let playerStats = jsonResponse.resultSets[1].rowSet

            dispatch(getBasicPlayerInfo(teamID, season, teamStatsRecord, teamStatsLeague, playerStats))

        }).catch((error) => {
            console.log(error);
        });
    }
}

export const getBasicPlayerInfo = (teamID, season, teamStatsRecord, teamStatsLeague, playerStats) => {

    return (dispatch, getState) => {
        let url = 'http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=' + season + '&TeamID=' + teamID; // <-- basic player info, position, number, height, weight, etc.
        return Api.get(url).then((jsonResponse) => {

            let playersBasicStats = jsonResponse.resultSets[0].rowSet

            dispatch(setTeamStatsData(teamStatsRecord, teamStatsLeague, playerStats, playersBasicStats))
            dispatch(setTeamStatsLoader(false))

        }).catch((error) => {
            console.log(error);
        });
    }
}

export const setTeamStatsData = (teamStatsRecord, teamStatsLeague, playerStats, playersBasicStats) => {

    return {
        type: types.TEAM_STATS_DATA,
        data: {
            teamStatsRecord: teamStatsRecord,
            teamStatsLeague: teamStatsLeague,
            playerStats: playerStats,
            playersBasicStats: playersBasicStats
        }
    }
}

export const setTeamStatsLoader = (isLoading) => {
    return {
        type: types.TEAM_STATS_LOADER,
        isLoading: isLoading
    }
}