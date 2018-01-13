import createReducer from '../utility/createReducer';
import * as types from '../actions/types'

export const gameData = createReducer([], {
    [types.GAME_DATA](state, action) {
        return action.gameData.data
    }
});

export const isLoading = createReducer(false, {
    [types.GAME_LOADER](state, action) {
        return action.isLoading
    }
})

export const date = createReducer(null, {
    [types.DATE](state, action) {
        return action.date
    }
})