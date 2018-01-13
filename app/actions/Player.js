import * as types from './types'
import Api from '../utility/Api'

// retrieves player stats for a specific game
export const getGamePlayerStats = (game) => {

    return (dispatch, getState) => {
        let date = game.date;
        let gameID = game.id;
        let url = 'http://data.nba.com/data/10s/json/cms/noseason/game/' + date + '/' + gameID + '/boxscore.json';

        dispatch(setPlayersStatsLoader(true))
        return Api.get(url).then((jsonResponse) => {
            let homePlayers = jsonResponse.sports_content.game.home.players.player;
            let awayPlayers = jsonResponse.sports_content.game.visitor.players.player;

            let allPlayers = [];

            if (typeof awayPlayers !== 'undefined' && typeof homePlayers !== 'undefined') {

                // allPlayers[game.visitor.city] = awayPlayers;
                // allPlayers[game.home.city] = homePlayers;
                allPlayers.push({ data: awayPlayers, title: game.visitor.city })
                allPlayers.push({ data: homePlayers, title: game.home.city })

            } else {
                allPlayers = []
            }

            dispatch(setPlayerStatsData(allPlayers))
            dispatch(setPlayersStatsLoader(false))

        }).catch((error) => {
            console.log(error);
            dispatch(setPlayersStatsLoader(false))
        })
    }
}

export const setPlayerStatsData = (allPlayers) => {
    return {
        type: types.PLAYER_STATS_DATA,
        data: {
            allPlayers: allPlayers
        }
    }
}

export const setPlayersStatsLoader = (isLoading) => {
    return {
        type: types.PLAYER_STATS_LOADER,
        isLoading: isLoading
    }
}

// retrieves playoff stats, if any, for a player
export const getPlayoffStats = (playerId, season) => {

    return (dispatch, getState) => {

        let url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=+' + playerId + '&Season=' + season + '&SeasonType=Playoffs';
        dispatch(setPlayerStatsLoader(true))
        return Api.get(url).then((jsonResponse) => {

            let playoffStats = jsonResponse.resultSets[0].rowSet;
            dispatch(getPlayerGameStatsForYear(playerId, season, playoffStats))


        }).catch((error) => {
            console.log("Error", error)
        });
    }
}

// retrieves game stats for every game the player played in during the season
export const getPlayerGameStatsForYear = (playerId, season, playoffStats) => {

    return (dispatch, getState) => {
        let url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=' + playerId + '&Season=' + season + '&SeasonType=Regular+Season';

        return Api.get(url).then((jsonResponse) => {

            let gameStats = jsonResponse.resultSets[0].rowSet;
            let playerStats = {}
            if (typeof playoffStats !== undefined && playoffStats.length > 0) {
                playerStats = playoffStats.concat(gameStats);
            } else {
                playerStats = gameStats
            }

            dispatch(setPlayerData(playerStats))
            dispatch(setPlayerStatsLoader(false))

        }).catch((error) => {

        });
    }
}

export const setPlayerStatsLoader = (isLoading) => {
    return {
        type: types.PLAYER_LOADER,
        isLoading: isLoading
    }
}

export const setPlayerData = (playerStats) => {

    return {
        type: types.PLAYER_DATA,
        data: {
            playerStats: playerStats
        }
    }
}