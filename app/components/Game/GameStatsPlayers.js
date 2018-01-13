/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    SectionList,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import TeamMap from '../../utility/TeamMap';
import GameStatsPlayerCell from './GameStatsPlayerCell';

let windowHeight = Dimensions.get('window').height;

class GameStatsPlayers extends React.Component {

    constructor(props) {
        super(props)

        this.game = this.props.screenProps.navigation.state.params.game
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.actions.getGamePlayerStats(this.game)
        })
    }

    render() {
        const awayTeamColor = TeamMap[this.game.visitor.abbreviation.toLowerCase()].color;
        const homeTeamColor = TeamMap[this.game.home.abbreviation.toLowerCase()].color;

        const { isPlayersStatsLoading, playerStatsData } = this.props
        const allPlayers = playerStatsData.allPlayers

        if (isPlayersStatsLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        if (!isPlayersStatsLoading && allPlayers.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text> Player data should be available at tipoff </Text>
                </View>
            )
        }

        return (

            <View style={{ flex: 1 }} >
                <SectionList
                    sections={allPlayers}
                    renderItem={({ item }) => (
                        <GameStatsPlayerCell navigator={this.props.screenProps.navigation}
                            player={item}
                        />
                    )}
                    renderSectionHeader={({ section }) => {
                        return (
                            <View style={[styles.header, TeamMap[this.game.visitor.abbreviation.toLowerCase()].city === section.title ? { backgroundColor: awayTeamColor } : { backgroundColor: homeTeamColor }]}>
                                <Text style={styles.headerText}> {section.title} </Text>
                            </View>)
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#e2e2e2'
    },
    headerText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16,
        color: '#FFFFFF'
    }
});

function mapStateToPros(state) {
    return {
        isPlayersStatsLoading: state.isPlayersStatsLoading,
        playerStatsData: state.playerStatsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(GameStatsPlayers)