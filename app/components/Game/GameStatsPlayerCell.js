/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

// import { Actions } from 'react-native-router-flux';
import STORE from '../../utility/Store'

export default class GameStatsPlayerCell extends React.Component {

    goToIndividualPlayerPage(player) {
        console.log("Pla ", this.props.navigator)
        this.props.navigator.navigate('IndividualPlayer', { player: player })
    }

    /* used for historical stats since a player id isn't returned with historical data.
     * STORE.playersInSeason is an array with every player in current season. player_code is
     * essentially the player's name, so we look up the player_code in the array and get
     * the player id
     */
    getPersonID() {
        for (let i = 0; i < STORE.playersInSeason.length; i++) {
            if (STORE.playersInSeason[i][6] === this.props.player.player_code) {
                return STORE.playersInSeason[i][0];
            }
        }
    }

    render() {
        let player = this.props.player;
        let id = player.person_id === undefined ? this.getPersonID() : player.person_id;
        return (
            <TouchableHighlight onPress={this.goToIndividualPlayerPage.bind(this, player)} underlayColor='#FFFFFF'>
                <View style={styles.body}>

                    <View style={styles.imageBlock}>
                        <Image
                            source={{ uri: 'http://stats.nba.com/media/players/230x185/' + id + '.png' }}
                            style={styles.playerImage}
                        />
                    </View>

                    <View style={styles.playerName}>
                        <Text style={{ fontSize: 14 }}> {player.first_name} {player.last_name}</Text>
                        <Text style={{ fontSize: 12 }}> #{player.jersey_number} </Text>
                        <Text style={{ fontSize: 12 }}> {player.position_short} </Text>
                    </View>

                    <View style={styles.gameStats}>

                        <View style={styles.statsLine1}>
                            <View style={styles.gameStatsItem}>
                                <Text style={styles.itemNumber}> {player.minutes} </Text>
                                <Text style={styles.itemLabel}> MINUTES PLAYED </Text>
                            </View>
                        </View>

                        <View style={styles.statsLine2}>

                            <View style={styles.gameStatsItem}>
                                <Text style={styles.itemNumber}> {player.points} </Text>
                                <Text style={styles.itemLabel}> PTS </Text>
                            </View>

                            <View style={styles.gameStatsItem}>
                                <Text style={styles.itemNumber}> {parseInt(player.rebounds_offensive) + parseInt(player.rebounds_defensive)} </Text>
                                <Text style={styles.itemLabel}> REB </Text>
                            </View>
                            <View style={styles.gameStatsItem}>
                                <Text style={styles.itemNumber}> {player.assists} </Text>
                                <Text style={styles.itemLabel}> AST </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        height: 70,
        backgroundColor: '#FCFCFC',
        flexDirection: 'row',
        borderColor: '#E1E1E1',
        borderBottomWidth: 0.5
    },
    imageBlock: {
        flex: 1,
        justifyContent: 'center'
    },
    playerImage: {
        height: 60,
        width: 60,
        marginTop: 3,
        marginLeft: 2,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#dadada'
    },
    playerName: {
        marginLeft: 8,
        flex: 2,
        justifyContent: 'center'
    },
    gameStats: {
        flex: 3,
        justifyContent: 'center'
    },
    gameStatsItem: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginRight: 10
    },
    statsLine1: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statsLine2: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemNumber: {
        fontSize: 14,
        fontWeight: '500',
        position: 'relative',
        top: 1,
        color: '#2c333f'
    },
    itemLabel: {
        fontSize: 12,
        fontWeight: '200',
        color: '#16191f'
    }
});
