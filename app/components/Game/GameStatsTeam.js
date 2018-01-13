import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import TeamMap from '../../utility/TeamMap';

class GameStatsTeam extends React.Component {

    constructor(props) {
        super(props);
        this.game = this.props.screenProps.navigation.state.params.game
        this.state = {
            homeScores: this.game.home,
            awayScores: this.game.visitor
        }
    }

    componentDidMount() {
        this.props.actions.getGameStats(this.game)
    }

    render() {

        const { isStatsLoading, gameStatsData } = this.props
        const { homeStats, awayStats } = gameStatsData

        if (isStatsLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        let h1 = 0;
        let h2 = 0;
        let h3 = 0;
        let h4 = 0;
        let hFinal = 0;
        let a1 = 0;
        let a2 = 0;
        let a3 = 0;
        let a4 = 0;
        let aFinal = 0;
        if (this.state.awayScores.linescores && this.state.homeScores.linescores) {
            switch (this.state.awayScores.linescores.period.length) {
                case 1:
                    a1 = this.state.awayScores.linescores.period[0].score;
                    break;
                case 2:
                    a1 = this.state.awayScores.linescores.period[0].score;
                    a2 = this.state.awayScores.linescores.period[1].score;
                    break;
                case 3:
                    a1 = this.state.awayScores.linescores.period[0].score;
                    a2 = this.state.awayScores.linescores.period[1].score;
                    a3 = this.state.awayScores.linescores.period[2].score;
                    break;
                case 4:
                    a1 = this.state.awayScores.linescores.period[0].score;
                    a2 = this.state.awayScores.linescores.period[1].score;
                    a3 = this.state.awayScores.linescores.period[2].score;
                    a4 = this.state.awayScores.linescores.period[3].score;
                    break;
                default:
                    a1 = 0;
                    a2 = 0;
                    a3 = 0;
                    a4 = 0;
                    break;
            }
            switch (this.state.homeScores.linescores.period.length) {
                case 1:
                    h1 = this.state.homeScores.linescores.period[0].score;
                    break;
                case 2:
                    h1 = this.state.homeScores.linescores.period[0].score;
                    h2 = this.state.homeScores.linescores.period[1].score;
                    break;
                case 3:
                    h1 = this.state.homeScores.linescores.period[0].score;
                    h2 = this.state.homeScores.linescores.period[1].score;
                    h3 = this.state.homeScores.linescores.period[2].score;
                    break;
                case 4:
                    h1 = this.state.homeScores.linescores.period[0].score;
                    h2 = this.state.homeScores.linescores.period[1].score;
                    h3 = this.state.homeScores.linescores.period[2].score;
                    h4 = this.state.homeScores.linescores.period[3].score;
                    break;
                default:
                    h1 = 0;
                    h2 = 0;
                    h3 = 0;
                    h4 = 0;
                    break;
            }
        }
        aFinal = parseInt(a1) + parseInt(a2) + parseInt(a3) + parseInt(a4);
        hFinal = parseInt(h1) + parseInt(h2) + parseInt(h3) + parseInt(h4);
        return (
            <View style={styles.main}>
                <View style={styles.scoreHead}>

                    <View style={styles.scoreboardHeader}>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text />
                        </View>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text> Q1 </Text>
                        </View>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text> Q2 </Text>
                        </View>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text> Q3 </Text>
                        </View>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text> Q4 </Text>
                        </View>
                        <View style={styles.scoreboardHeaderLabel}>
                            <Text> Final </Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.quarterScores}>

                        <View style={styles.teamScores}>
                            <View style={[styles.teamQuarterCell]}>
                                <Text> {awayStats.abbreviation} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {a1} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {a2} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {a3} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {a4} </Text>
                            </View>
                            <View style={styles.teamQuarterCellEnd}>
                                <Text> {aFinal} </Text>
                            </View>
                        </View>

                        <View style={styles.line} />

                        <View style={styles.teamScores}>
                            <View style={styles.teamQuarterCell}>
                                <Text> {homeStats.abbreviation} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {h1} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {h2} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {h3} </Text>
                            </View>
                            <View style={styles.teamQuarterCell}>
                                <Text> {h4} </Text>
                            </View>
                            <View style={styles.teamQuarterCellEnd}>
                                <Text> {hFinal} </Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.line} />

                <View style={styles.head}>
                    <TouchableHighlight onPress={() => this.props.screenProps.navigation.navigate('TeamStats', { team: awayStats.abbreviation.toLowerCase() })} >
                        <Image
                            style={styles.logo}
                            source={TeamMap[awayStats.team_key.toLowerCase()].logo}
                        />
                    </TouchableHighlight>
                    <View style={styles.vertical} />
                    <Text> Stats </Text>
                    <View style={styles.vertical} />
                    <TouchableHighlight onPress={() => this.props.screenProps.navigation.navigate('TeamStats', { team: homeStats.abbreviation.toLowerCase() })} underlayColor='#FFFFFF'>
                        <Image
                            style={styles.logo}
                            source={TeamMap[homeStats.team_key.toLowerCase()].logo}
                        />
                    </TouchableHighlight>
                </View>

                <View style={styles.line} />
                <View style={styles.body}>

                    <View style={styles.statsColumn}>
                        <Text> {awayStats.stats.points === '' ? '0' : awayStats.stats.points} </Text>
                        <Text> {awayStats.stats.field_goals_made === '' ? '-' : awayStats.stats.field_goals_made + '/' + awayStats.stats.field_goals_attempted + '(' + awayStats.stats.field_goals_percentage + '%)'} </Text>
                        <Text> {awayStats.stats.three_pointers_made === '' ? '-' : awayStats.stats.three_pointers_made + '/' + awayStats.stats.three_pointers_attempted + '(' + awayStats.stats.three_pointers_percentage + '%)'} </Text>
                        <Text> {awayStats.stats.free_throws_made === '' ? '-' : awayStats.stats.free_throws_made + '/' + awayStats.stats.free_throws_attempted + '(' + awayStats.stats.free_throws_percentage + '%)'} </Text>
                        <Text> {awayStats.stats.assists === '' ? '0' : awayStats.stats.assists} </Text>
                        <Text> {awayStats.stats.rebounds_offensive === '' ? '0' : awayStats.stats.rebounds_offensive} </Text>
                        <Text> {awayStats.stats.rebounds_defensive === '' ? '0' : awayStats.stats.rebounds_defensive} </Text>
                        <Text> {awayStats.stats.steals === '' ? '0' : awayStats.stats.steals} </Text>
                        <Text> {awayStats.stats.blocks === '' ? '0' : awayStats.stats.blocks} </Text>
                        <Text> {awayStats.stats.turnovers === '' ? '0' : awayStats.stats.turnovers} </Text>
                        <Text> {awayStats.stats.fouls === '' ? '0' : awayStats.stats.fouls} </Text>
                    </View>

                    <View style={styles.statsColumn}>
                        <Text> Points </Text>
                        <Text> Field Goals </Text>
                        <Text> 3 Pointers </Text>
                        <Text> Free Throws </Text>
                        <Text> Assists </Text>
                        <Text> O. Rebounds </Text>
                        <Text> D. Rebounds </Text>
                        <Text> Steals </Text>
                        <Text> Blocks </Text>
                        <Text> Turnovers </Text>
                        <Text> Fouls </Text>
                    </View>

                    <View style={styles.statsColumn}>
                        <Text> {homeStats.stats.points === '' ? '0' : homeStats.stats.points} </Text>
                        <Text> {homeStats.stats.field_goals_made === '' ? '-' : homeStats.stats.field_goals_made + '/' + homeStats.stats.field_goals_attempted + '(' + homeStats.stats.field_goals_percentage + '%)'} </Text>
                        <Text> {homeStats.stats.three_pointers_made === '' ? '-' : homeStats.stats.three_pointers_made + '/' + homeStats.stats.three_pointers_attempted + '(' + homeStats.stats.three_pointers_percentage + '%)'} </Text>
                        <Text> {homeStats.stats.free_throws_made === '' ? '-' : homeStats.stats.free_throws_made + '/' + homeStats.stats.free_throws_attempted + '(' + homeStats.stats.free_throws_percentage + '%)'} </Text>
                        <Text> {homeStats.stats.assists === '' ? '0' : homeStats.stats.assists} </Text>
                        <Text> {homeStats.stats.rebounds_offensive === '' ? '0' : homeStats.stats.rebounds_offensive} </Text>
                        <Text> {homeStats.stats.rebounds_defensive === '' ? '0' : homeStats.stats.rebounds_defensive} </Text>
                        <Text> {homeStats.stats.steals === '' ? '0' : homeStats.stats.steals} </Text>
                        <Text> {homeStats.stats.blocks === '' ? '0' : homeStats.stats.blocks} </Text>
                        <Text> {homeStats.stats.turnovers === '' ? '0' : homeStats.stats.turnovers} </Text>
                        <Text> {homeStats.stats.fouls === '' ? '0' : homeStats.stats.fouls} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    quarterScores: {
        flex: 1
        // marginLeft: 15
    },
    scoreHead: {
        flex: 0.5
    },
    scoreboardHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-between',
        // marginLeft: 75,
        // marginRight: 15,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        // marginBottom: -5,
        flex: 0.5
    },
    scoreboardHeaderLabel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10
    },
    logo: {
        width: 70,
        height: 70,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10
    },
    line: {
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: '#dadada'
    },
    vertical: {
        marginLeft: 15,
        marginRight: 15,
        width: 1,
        marginTop: -10,
        marginBottom: -10,
        backgroundColor: '#000'
    },
    verticalScores: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: -10,
        width: 1,
        backgroundColor: '#000'
    },
    teamScores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        borderRightWidth: 1,
        borderColor: '#dadada',
        borderLeftWidth: 1,
        flex: 1,
        // marginTop: 10,
    },
    teamQuarterCell: {
        borderRightWidth: 1,
        borderRightColor: '#dadada',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamQuarterCellEnd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    }
});

function mapStateToProps(state) {
    return {
        isStatsLoading: state.isStatsLoading,
        gameStatsData: state.gameStatsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStatsTeam)