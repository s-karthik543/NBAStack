import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    TouchableHighlight,
    ScrollView,
    Platform,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import STORE from '../../utility/Store'

class IndividualPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.player = props.navigation.state.params.player

        this.state = {
            currentIndex: 0
        }
    }

    componentDidMount() {
        this.getPlayoffStats();
    }

    /* used for historical stats since a player id isn't returned with historical data.
     * STORE.playersInSeason is an array with every player in current season. player_code is
     * essentially the player's name, so we look up the player_code in the array and get
     * the player id
     */
    getPersonID() {
        for (var i = 0; i < STORE.playersInSeason.length; i++) {
            if (STORE.playersInSeason[i][6] === this.player.player_code) {
                return STORE.playersInSeason[i][0];
            }
        }
    }

    // retrieves playoff stats, if any, for a player
    getPlayoffStats() {
        let season = STORE.season; // IMPORTANT
        let id = this.player.person_id || this.getPersonID();
        this.props.actions.getPlayoffStats(id, season)
    }

    // determines the proper width for each stat bar
    getWidth(data) {
        const mapper = { pts: 24, min: 6, reb: 18, ast: 19, stl: 20, blk: 21, to: 22, fgm: 7, fga: 8, _3pm: 10, _3pa: 11, ftm: 13, fta: 14 }; // position in data where those values can be found
        const deviceWidth = Dimensions.get('window').width;
        const maxWidth = 350;
        const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'to', 'min', 'fgm', 'fga', '_3pm', '_3pa', 'ftm', 'fta'];
        const unit = {
            ptsUnit: Math.floor(maxWidth / 45),
            astUnit: Math.floor(maxWidth / 15),
            rebUnit: Math.floor(maxWidth / 20),
            stlUnit: Math.floor(maxWidth / 6),
            blkUnit: Math.floor(maxWidth / 7),
            toUnit: Math.floor(maxWidth / 10),
            minUnit: Math.floor(maxWidth / 60),
            fgmUnit: Math.floor(maxWidth / 55),
            fgaUnit: Math.floor(maxWidth / 55),
            _3pmUnit: Math.floor(maxWidth / 55),
            _3paUnit: Math.floor(maxWidth / 55),
            ftmUnit: Math.floor(maxWidth / 55),
            ftaUnit: Math.floor(maxWidth / 55)
        };
        let width = {};
        let widthCap; // Give with a max cap
        indicators.forEach(item => {
            widthCap = data[mapper[item]] * unit[`${item}Unit`] || 0; // nothing is displayed if value is 0
            width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50);
        });
        return width
    }

    getAnimatedValues(width) {
        return {
            pts: new Animated.Value(width.pts),
            ast: new Animated.Value(width.ast),
            reb: new Animated.Value(width.reb),
            stl: new Animated.Value(width.stl),
            blk: new Animated.Value(width.blk),
            to: new Animated.Value(width.to),
            min: new Animated.Value(width.min),
            fgm: new Animated.Value(width.fgm),
            fga: new Animated.Value(width.fga),
            _3pm: new Animated.Value(width._3pm),
            _3pa: new Animated.Value(width._3pa),
            ftm: new Animated.Value(width.ftm),
            fta: new Animated.Value(width.fta)
        }
    }

    // animates the bar graphs
    handleAnimation(index) {
        const timing = Animated.timing;
        const width = this.getWidth(this.props.playerData.playerStats[index]);
        const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'to', 'min', 'fgm', 'fga', '_3pm', '_3pa', 'ftm', 'fta'];
        const animatedValue = this.getAnimatedValues(width)
        Animated.parallel(indicators.map(item => {
            return timing(animatedValue[item], { toValue: width[item] });
        })).start();
        return animatedValue
        /*   this.setState({
               currentIndex: index
           });*/
    }

    onRight() {
        if (this.state.currentIndex > 0) {
            this.setState({
                currentIndex: this.state.currentIndex - 1
            });
            // this.handleAnimation(this.state.currentIndex - 1);
        }
    }

    onLeft() {
        if (this.state.currentIndex < this.props.playerData.playerStats.length - 1) {
            // this.handleAnimation(this.state.currentIndex + 1);
            this.setState({
                currentIndex: this.state.currentIndex + 1
            });
        }
    }

    render() {

        const { isPlayerStatsLoading, playerData } = this.props
        const playerStats = playerData.playerStats

        // var player = this.props.player;
        let id = this.player.person_id === undefined ? this.getPersonID() : this.player.person_id;
        let nextAvailable = this.state.currentIndex === 0 ? 0 : 1;
        let previousAvailable = this.state.currentIndex === playerStats.length - 1 ? 0 : 1;

        if (playerStats !== undefined && playerStats.length > 0) {
            var { pts, ast, reb, stl, blk, to, min, fgm, fga, _3pm, _3pa, ftm, fta } = this.handleAnimation(this.state.currentIndex)

        }

        if (isPlayerStatsLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCFCFC' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        if (playerStats === undefined || playerStats.length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCFCFC' }}>
                    <Text> No player data available </Text>
                </View>
            )
        }

        return (
            <View style={styles.body}>
                <View style={styles.header}>
                    <View style={styles.imageBlock}>
                        <Image
                            source={{ uri: 'http://stats.nba.com/media/players/230x185/' + id + '.png' }}
                            style={styles.playerImage}
                        />
                    </View>
                    <View style={styles.playerName}>
                        <Text style={{ color: 'white', fontWeight: '200', fontSize: 24 }}> {this.player.first_name}<Text style={{ fontWeight: '500' }}> {this.player.last_name}</Text></Text>
                        <Text style={{ color: 'white', fontWeight: '200', fontSize: 24 }}> #{this.player.jersey_number}</Text>
                        <Text style={{ color: 'white', fontWeight: '200', fontSize: 24 }}> {this.player.position_full}</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Points</Text>
                            <View style={styles.itemData}>
                                {pts &&
                                    <Animated.View style={[styles.bar, styles.points, { width: pts }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][24]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Rebounds</Text>
                            <View style={styles.itemData}>
                                {reb &&
                                    <Animated.View style={[styles.bar, styles.rebounds, { width: reb }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][18]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Assists</Text>
                            <View style={styles.itemData}>
                                {ast &&
                                    <Animated.View style={[styles.bar, styles.assists, { width: ast }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][19]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Steals</Text>
                            <View style={styles.itemData}>
                                {stl &&
                                    <Animated.View style={[styles.bar, styles.steals, { width: stl }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][20]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Blocks</Text>
                            <View style={styles.itemData}>
                                {blk &&
                                    <Animated.View style={[styles.bar, styles.blocks, { width: blk }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][21]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Turnovers</Text>
                            <View style={styles.itemData}>
                                {to &&
                                    <Animated.View style={[styles.bar, styles.turnovers, { width: to }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][22]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>Minutes</Text>
                            <View style={styles.itemData}>
                                {min &&
                                    <Animated.View style={[styles.bar, styles.minutes, { width: min }]} />
                                }
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][6]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>FGM/FGA </Text>
                            <View style={styles.itemData}>
                                <Animated.View style={[styles.bar, styles.attempted, { width: fga }]} />
                                <Animated.View style={[styles.bar, styles.fgm, styles.overlayBar, { width: fgm }]} />
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][7]}/{playerStats[this.state.currentIndex][8]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>3PM/3PA </Text>
                            <View style={styles.itemData}>
                                <Animated.View style={[styles.bar, styles.attempted, { width: _3pa }]} />
                                <Animated.View style={[styles.bar, styles._3pm, styles.overlayBar, { width: _3pm }]} />
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][10]}/{playerStats[this.state.currentIndex][11]}</Text>
                            </View>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.itemLabel}>FTM/FTA </Text>
                            <View style={styles.itemData}>
                                <Animated.View style={[styles.bar, styles.attempted, { width: fta }]} />
                                <Animated.View style={[styles.bar, styles.ftm, styles.overlayBar, { width: ftm }]} />
                                <Text style={styles.dataNumber}> {playerStats[this.state.currentIndex][13]}/{playerStats[this.state.currentIndex][14]}</Text>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 5 }}>
                            <Text style={styles.gameStatus}> {playerStats[this.state.currentIndex][5]} {playerStats[this.state.currentIndex][4].slice(3)} </Text>
                        </View>

                        <View style={styles.date}>

                            <TouchableHighlight onPress={this.onLeft.bind(this)} underlayColor='#FFFFFF' style={{ opacity: previousAvailable }}>
                                <Image
                                    source={require('../../../assets/images/left_arrow.png')}
                                    style={{ width: 40, height: 40, alignSelf: 'flex-start' }}
                                />
                            </TouchableHighlight>

                            <Text style={styles.dateText}>
                                {playerStats[this.state.currentIndex][3]}
                            </Text>

                            <TouchableHighlight
                                onPress={this.onRight.bind(this)}
                                underlayColor='#FFFFFF'
                                style={{ opacity: nextAvailable }}>
                                <Image
                                    source={require('../../../assets/images/right_arrow.png')}
                                    style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
                                />
                            </TouchableHighlight>

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        backgroundColor: '#FCFCFC',
        height: Dimensions.get('window').height
    },
    header: {
        height: 120,
        flexDirection: 'row',
        backgroundColor: '#000'
    },
    imageBlock: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    },
    playerImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 7,
        shadowColor: '#151515',
        shadowOpacity: 0.9,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    playerName: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 15,
        marginBottom: 8
    },
    // play around with
    statItem: {
        flexDirection: 'column',
        marginBottom: 2,
        paddingHorizontal: 10,
        marginTop: 2
    },
    itemLabel: {
        color: '#CBCBCB',
        flex: 1,
        fontSize: 14,
        position: 'relative',
        top: 1
    },
    itemData: {
        flex: 2,
        flexDirection: 'row'
    },
    bar: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 10,
        marginRight: 9
    },
    overlayBar: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 4.5 : 3.5,
        left: 0
    },
    points: {
        backgroundColor: '#EC644B'
    },
    rebounds: {
        backgroundColor: '#F4D03F'
    },
    assists: {
        backgroundColor: '#F39C12'
    },
    steals: {
        backgroundColor: '#19B5FE'
    },
    blocks: {
        backgroundColor: '#3FC380'
    },
    turnovers: {
        backgroundColor: '#BF55EC'
    },
    minutes: {
        backgroundColor: '#8AA8AD'
    },
    fgm: {
        backgroundColor: '#ff8557'
    },
    attempted: {
        backgroundColor: '#8e8499'
    },
    _3pm: {
        backgroundColor: '#95E7ED'
    },
    ftm: {
        backgroundColor: '#FFEB3B'
    },
    dataNumber: {
        color: '#CBCBCB',
        fontSize: 14
    },
    //
    gameStatus: {
        fontSize: 20,
        fontWeight: '200'
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    dateText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '200'
    }
});

function mapStateToProps(state) {
    return {
        isPlayerStatsLoading: state.isPlayerStatsLoading,
        playerData: state.playerData
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(ActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualPlayer);