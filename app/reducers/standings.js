import createReducer from '../utility/createReducer';
import * as types from '../actions/types'

export const standingsData = createReducer({}, {
    [types.STANDINGS_DATA](state, action) {
        return action.standingsData.standings
    }
});

export const isStandingsLoading = createReducer(true, {
    [types.STANDINGS_LOADER](state, action) {
        return action.isLoading
    }
})
