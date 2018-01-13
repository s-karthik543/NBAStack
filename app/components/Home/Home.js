import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    Platform
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TabNavigator } from 'react-navigation'

import { ActionCreators } from '../../actions'
import Date from './Date';
import Scores from './Scores'
import Standings from './Standings'

class Home extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Date action={this.props.actions} />
                <GameTabs screenProps={this.props.navigation} />
            </View>
        )

    }
} 

const GameTabs = TabNavigator({
    Scores: {
        screen: Scores
    },
    Standings: {
        screen: Standings
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
            indicatorStyle: { backgroundColor: '#FFF', height: 3 },
            scrollEnabled:false,
        },
        tabBarPosition: 'top',
        backBehavior: 'none',
        lazy: false,
        animationEnabled: false
    })

const styles = StyleSheet.create({
    tabBar2: {
        backgroundColor: '#E64A19'
    },
    underline: {
        backgroundColor: '#FFCCBC'
    }
});

/*
function mapStateToProps(state) {
    return {
        gameData: state.gameData
    }
}*/

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(ActionCreators, dispatch) }
}

export default connect((state) => { return {} }, mapDispatchToProps)(Home)