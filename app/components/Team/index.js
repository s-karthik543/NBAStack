import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    ActivityIndicator,
    FlatList
} from 'react-native'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import TeamMap from '../../utility/TeamMap';
import PlayerCell from './PlayerCell';

import STORE from '../../utility/Store'

class TeamStats extends React.Component {

    constructor(props) {
        super(props);
        this.team = this.props.navigation.state.params.team;
    }

    // adds suffix to a number for league ranking. ex: 1 -> 1st
    rankingSuffix(number) {
        switch (parseInt(number)) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return number + 'th';
        }
    }

    componentDidMount() {
        this.changeNavBarColor();
        // let team = this.props.navigation.state.params.team;
        let teamID = TeamMap[this.team].id;
        let season = STORE.season;
        this.props.getTeamStats(teamID, season)
    }

    changeNavBarColor() {
        STORE.navBarColorForTeamPage = TeamMap[this.team].color;
        // Actions.refresh({ navigationBarStyle: { backgroundColor: STORE.navBarColorForTeamPage, borderBottomWidth: 0 } });
    }

    render() {

        const { isTeamStatsLoading, teamStatsData } = this.props
        const { teamStatsRecord, teamStatsLeague, playerStats, playersBasicStats } = teamStatsData

        if (isTeamStatsLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        return (
            <View style={styles.body}>
                <View style={[styles.header, { backgroundColor: TeamMap[teamStatsRecord[0][4].toLowerCase()].color }]}>

                    <View style={styles.city}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFFFFF' }}> {teamStatsRecord[0][2]} </Text>
                        <Text style={{ fontWeight: '200', fontSize: 12, color: '#FFFFFF' }}> {teamStatsRecord[0][3]} </Text>
                    </View>

                    <View style={styles.logo}>
                        <Image
                            source={TeamMap[teamStatsRecord[0][4].toLowerCase()].logo}
                            style={{ width: 70, height: 70, alignSelf: 'flex-start' }}
                        />
                    </View>

                    <View style={styles.rankings1}>
                        <Text style={styles.leagueRankingsText}> Wins: {teamStatsRecord[0][8]} </Text>
                        <Text style={styles.leagueRankingsText}> Losses: {teamStatsRecord[0][9]} </Text>
                        <Text style={styles.leagueRankingsText}> {this.rankingSuffix(teamStatsRecord[0][11])} in the {teamStatsRecord[0][5]} </Text>
                        <Text style={styles.leagueRankingsText}> {this.rankingSuffix(teamStatsRecord[0][12])} in the {teamStatsRecord[0][6]} </Text>
                    </View>

                </View>
                <View style={styles.teamStatsRankings}>

                    <View style={styles.rankingItem}>
                        <Text style={styles.itemLabel}> PPG </Text>
                        <Text style={styles.itemData}> {teamStatsLeague[0][4]} </Text>
                        <Text style={styles.itemData}> ({this.rankingSuffix(teamStatsLeague[0][3])}) </Text>
                    </View>

                    <View style={styles.rankingItem}>
                        <Text style={styles.itemLabel}> OPP PPG </Text>
                        <Text style={styles.itemData}> {teamStatsLeague[0][10]} </Text>
                        <Text style={styles.itemData}> ({this.rankingSuffix(teamStatsLeague[0][9])}) </Text>
                    </View>

                    <View style={styles.rankingItem}>
                        <Text style={styles.itemLabel}> RPG </Text>
                        <Text style={styles.itemData}> {teamStatsLeague[0][6]} </Text>
                        <Text style={styles.itemData}> ({this.rankingSuffix(teamStatsLeague[0][5])}) </Text>
                    </View>

                    <View style={styles.rankingItem}>
                        <Text style={styles.itemLabel}> APG </Text>
                        <Text style={styles.itemData}> {teamStatsLeague[0][8]} </Text>
                        <Text style={styles.itemData}> ({this.rankingSuffix(teamStatsLeague[0][7])}) </Text>
                    </View>

                </View>

                    <FlatList
                        data={playerStats}
                        renderItem={({ item }) => (
                            <PlayerCell
                                player={item}
                                team={this.team}
                                roster={playersBasicStats}
                            />
                        )}
                        keyExtractor={(item, index) => index} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        backgroundColor: '#FCFCFC',
        flex:1
    },
    header: {
        height: 100,
        flexDirection: 'row'
    },
    city: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1.5,
        marginLeft: 15
    },
    logo: {
        flex: 1,
        justifyContent: 'center'
    },
    rankings1: {
        flex: 1.5,
        justifyContent: 'center',
        marginRight: 15
    },
    leagueRankingsText: {
        fontWeight: '400',
        fontSize: 12,
        color: '#FCFCFC'
    },
    secondHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    teamStatsRankings: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 65
    },
    rankingItem: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemLabel: {
        color: '#4a5669',
        fontSize: 12,
        fontWeight: '200'
    },
    itemData: {
        color: '#404a5a',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 2,
        position: 'relative',
        top: 2
    }
});

const mapStateToProps = (state) => {
    return {
        isTeamStatsLoading: state.isTeamStatsLoading,
        teamStatsData: state.teamStatsData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamStats)