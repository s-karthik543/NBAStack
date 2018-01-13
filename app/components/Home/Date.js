import React from 'react'
import {
    Text,
    View,
    InteractionManager,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import STORE from '../../utility/Store'

class Date extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateWithDay: ''
        }
        this.props.action.setDate(moment().format('L'))
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.action.fectchGames()
        })
    }

    getDate() {
        let date1 = moment().format('LLLL');
        date1 = date1.split(' ');
        let day = date1[0].replace(',', '');
        let dayNum = date1[2].replace(',', '');
        let month = date1[1];
        return day + ', ' + month + ' ' + dayNum;
        // return combinedDate;
    }

    handleDateChange(date) {
        let currentSeason = STORE.season;
        let date2 = date.split('-');
        let month = date2[0];
        let day = date2[1];
        let year = date2[2];
        date2 = year + '-' + month + '-' + day;
        let dateDay = moment(date2).format('LLLL').slice(0, moment(date2).format('LLLL').lastIndexOf(','));
        if (month >= 10 && month <= 12) {
            STORE.year = year;
            let currentSeasonArray = currentSeason.split('');
            STORE.season = year + '-' + currentSeasonArray[2] + (parseInt(currentSeasonArray[3]) + 1);
        } else {
            STORE.year = parseInt(year) - 1;
            let currentSeasonArray = year.split('');
            STORE.season = (parseInt(year) - 1) + '-' + currentSeasonArray[2] + currentSeasonArray[3];
        }

        this.setState({ dateWithDay: dateDay })

        // STORE.date = date
        this.props.action.setDate(date)
        this.props.action.fectchGames()
    }

    render() {

        const { isLoading, gameData, date } = this.props
        console.log("Date ", date)
        return (
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.dateContainer}>

                    <Text style={styles.dateText}>
                        {this.state.dateWithDay || this.getDate()}
                    </Text>

                    <Text style={styles.numberOfGamesText}>
                        {isLoading ? 'Checking number of games' :
                            (() => {
                                switch (gameData.length === 0) {
                                    case true: return 'There are no games today';
                                    case false: switch (gameData.length === 1) {
                                        case true: return 'There is 1 game today';
                                        case false: return 'There are ' + gameData.length + ' games today';
                                    }
                                }
                            })()
                        }
                    </Text>

                    {date && <Text style={styles.summerLeagueText}>
                        {/*STORE.*/date.split('/')[0] === '07' && gameData.length !== 0 ?
                            'Some games may not be displayed due to Summer League play' : ''
                        }
                    </Text>}

                </View>

                <View style={{ backgroundColor: '#FF5722', flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                    <DatePicker
                        style={{ width: 100 }}
                        date={date}
                        mode='date'
                        format='MM-DD-YYYY'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        iconSource={require('../../../assets/images/calendar.png')}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0,
                                opacity: 0
                            },
                            dateTouchBody: {
                                flexDirection: 'column'
                            },
                            dateIcon: {
                                width: 25,
                                height: 25
                            }
                        }}
                        onDateChange={(date) => { this.handleDateChange(date) }} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    dateContainer: {
        backgroundColor: '#FF5722',
        padding: 35,
        flexDirection: 'column',
        flex: 1
    },
    dateText: {
        fontSize: 17,
        fontWeight: '500',
        marginTop: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    numberOfGamesText: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    summerLeagueText: {
        fontSize: 10,
        marginTop: 5,
        textAlign: 'center',
        color: '#FFFFFF'
    }
});

function mapStateToProps(state) {
    return {
        gameData: state.gameData,
        isLoading: state.isLoading,
        date: state.date
    }
}

export default connect(mapStateToProps)(Date)