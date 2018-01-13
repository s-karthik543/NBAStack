import createReducer from '../utility/createReducer';
import * as types from '../actions/types'

export const playerStatsData = createReducer({
    allPlayers: {}
}, {
        [types.PLAYER_STATS_DATA](state, action) {
            return action.data
        }
    });

export const isPlayersStatsLoading = createReducer(true, {
    [types.PLAYER_STATS_LOADER](state, action) {
        return action.isLoading
    }
})

export const isPlayerStatsLoading = createReducer(true, {
    [types.PLAYER_LOADER](state, action) {
        return action.isLoading
    }
})

export const playerData = createReducer({playerStats:[]
}, {
        [types.PLAYER_DATA](state, action) {
            return action.data
        }
    });