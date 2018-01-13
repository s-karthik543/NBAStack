import * as ScoreAction from './score';
import * as StandingsAction from './standings';
import * as teamAction from './team';
import * as playerAction from './Player';


export const ActionCreators = Object.assign({}, ScoreAction, StandingsAction, teamAction, playerAction)