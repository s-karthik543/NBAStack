import React from 'react';
import {
    View,
    StyleSheet,
    RefreshControl,
    Image,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';
import GameCell from './GameCell'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../../actions'

class Scores extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isRefreshing: false }
    }

    _onRefresh() {
        this.setState({ isRefreshing: true })
        this.props.actions.fectchGames().then(() => {
            this.setState({ isRefreshing: false })
        })
    }

    render() {
        const { isLoading, gameData } = this.props

        if (isLoading && !this.state.isRefreshing) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        if (gameData.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Image
                        source={require('../../../../assets/images/nba.png')}
                        style={{ height: 250, width: 110 }}
                    />
                    <Text> No games 😢</Text>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatList style={styles.flatlistview} refreshControl={
                    <RefreshControl
                        colors={["#E64A19", "#689F38"]}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                } /* refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)}*/
                    data={gameData}
                    renderItem={({ item }) => (
                        <GameCell navigator={this.props.screenProps}
                            game={item}
                            onPress={() => { this.props.goToGameStats(item) }}
                        />
                    )}
                    keyExtractor={(item, index) => item.home.abbreviation} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70
    },
    flatlistview: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        marginTop: 10
    }
});

const mapStateToProps = (state) => {
    return {
        gameData: state.gameData,
        isLoading: state.isLoading,
        date: state.date
    }
}

const mapDispatchToPros = (dispatch) => {
    return { actions: bindActionCreators(ActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToPros)(Scores)