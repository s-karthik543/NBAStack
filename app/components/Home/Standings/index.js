import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Platform,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import STORE from '../../../utility/Store'
import TeamStandingsCell from './TeamStandingsCell';

import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../../actions'

class Standings extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.fetchStandings(STORE.year)
        })
    }

    render() {
        const { standingsData, isStandingsLoading } = this.props

        if (isStandingsLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        if (typeof standingsData !== 'undefined' && standingsData.length > 0) {
            return (
                <View style={styles.view}>

                    <View style={styles.listHeader}>
                        <Text> Team </Text>
                        <Text> Wins </Text>
                        <Text> Losses </Text>
                        <Text> Last 10 </Text>
                        <Text> Streak </Text>
                    </View>

                    <View style={styles.line} />

                    <FlatList
                        data={standingsData}
                        renderItem={({ item }) => (
                            <TeamStandingsCell
                                navigator={this.props.screenProps}
                                team={item}
                                onPress={() => this.props.onPress(item)}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            )
        }

        return null
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: Platform.OS === 'android' ? '#ffffff' : '#FCFCFC'
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    line: {
        marginLeft: 15,
        marginRight: 15,
        height: 1,
        backgroundColor: '#000'
    }
});

const mapStateToProps = (state) => {
    return {
        standingsData: state.standingsData,
        isStandingsLoading: state.isStandingsLoading
    }
}

const mapDispatchToPros = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToPros)(Standings)