import React from 'react'
import {
    View,
    Text,
    Platform,
    StyleSheet
} from 'react-native'
import { TabNavigator } from 'react-navigation'

import GameStatsTeam from './GameStatsTeam';
import GameStatsPlayers from './GameStatsPlayers';


export default class GameStats extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: { backgroundColor: '#E64A19', elevation: 0 }
    })

    render() {
        const game = this.props.navigation.state.params.game;
        return (
            <View style={styles.main}>
                <GameStatsTab screenProps={this.props} />
            </View>
        )
    }
}

const GameStatsTab = TabNavigator({
    Team: {
        screen: GameStatsTeam
    },
    Players: {
        screen: GameStatsPlayers
    }
},
    {
        ...TabNavigator.Presets.AndroidTopTabs,
        tabBarOptions: {
            labelStyle: {
                fontSize: 13,
                padding: Platform.OS === 'ios' ? '3%' : 0,
            },
            style: { backgroundColor: '#E64A19', borderTopWidth: 0 },
            activeTintColor: '#ffffff',
            inactiveTintColor: '#ffffff',
            indicatorStyle: { backgroundColor: '#FFF', height: 3 }
        },
        tabBarPosition: 'top',
        backBehavior: 'none',
        lazy: false,
        animationEnabled: false
    })



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    }
});