
import * as types from './types'
import Api from '../utility/Api'

// retrieves games being played for a date. date is in YYYYMMDD format
export const fectchGames = () => {

    return (dispatch, getState) => {
        console.log("getState ", getState())
        let url = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/' + getState().date + '/games.json';

        dispatch(setLoader(true))
        return Api.get(url).then((jsonResponse) => {
            let data = jsonResponse['sports_content']['games']['game']
            if (data) {
                dispatch(setGameData({ data }))
            }
            dispatch(setLoader(false))
        }).catch((error) => {
            dispatch(setLoader(false))
            console.log("Error ", error)
        });
    }
}

export const setGameData = (data) => {
    return {
        type: types.GAME_DATA,
        gameData: data
    }
}

export const setDate = (date) => {
    if (date.indexOf('-') > -1) {
        date = date.split('-');
    } else {
        date = date.split('/');
    }
    let month = date[0];
    let day = date[1];
    let year = date[2];
    date = year + month + day;
    return {
        type: types.DATE,
        date: date
    }
}

export const setLoader = (isLoading) => {
    return {
        type: types.GAME_LOADER,
        isLoading: isLoading
    }
}