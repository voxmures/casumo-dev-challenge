import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '');
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

new Game();
