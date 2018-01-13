
import * as types from './types'
import Api from '../utility/Api'

// retrieves league standings for a given year
export const fetchStandings = (year) => {

    return (dispatch, getState) => {

        let url = 'http://data.nba.com/data/json/cms/' + year + '/league/standings.json';

        dispatch(setStandingsLoader(true))

        return Api.get(url).then((jsonResponse) => {

            let standings = jsonResponse.sports_content.standings.team;

            if (standings) {
                dispatch(setStandingsData({ standings }))
            }

            dispatch(setStandingsLoader(false))

        }).catch((error) => {
            console.log(error);

            dispatch(setStandingsLoader(false))
        })
    }
}

export const setStandingsData = (data) => {
    return {
        type: types.STANDINGS_DATA,
        standingsData: data
    }
}

export const setStandingsLoader = (isLoading) => {
    return {
        type: types.STANDINGS_LOADER,
        isLoading: isLoading
    }
}