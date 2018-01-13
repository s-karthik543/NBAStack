import createReducer from '../utility/createReducer';
import * as types from '../actions/types'

export const gameStatsData = createReducer({
    homeStats: {},
    awayStats: {}
}, {
        [types.GAME_STATS_DATA](state, action) {
            return action.data
        }
    });

export const isStatsLoading = createReducer(true, {
    [types.GAME_STATS_LOADER](state, action) {
        return action.isLoading
    }
})

export const teamStatsData = createReducer({
    teamStatsRecord: {},
    teamStatsLeague: {},
    playerStats: {},
    playersBasicStats: {}
}, {
        [types.TEAM_STATS_DATA](state, action) {
            console.log("In Reducer ",action.data)
            return action.data
        }
    });

export const isTeamStatsLoading = createReducer(true, {
    [types.TEAM_STATS_LOADER](state, action) {
        return action.isLoading
    }
})