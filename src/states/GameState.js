import ScalableSprite from 'objects/ScalableSprite';
import ScalableButton from 'objects/ScalableButton';

class GameState extends Phaser.State {

	init() {
		this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	}

	preload() {
		this.game.load.image('egg', 'assets/img/egg.png');
		this.game.load.image('bird', 'assets/img/bird.png');
		this.game.load.image('watchman', 'assets/img/watchman.png');
		this.game.load.image('irish', 'assets/img/irish.png');
		this.game.load.image('pixel', 'assets/img/pixel.png');
		this.game.load.image('A', 'assets/img/A.png');
		this.game.load.image('K', 'assets/img/K.png');
		this.game.load.image('Q', 'assets/img/Q.png');
		this.game.load.image('J', 'assets/img/J.png');
		this.game.load.image('10', 'assets/img/10.png');
		this.game.load.spritesheet('button', 'assets/img/button.png', 587, 640, 2);

		this.game.load.audio('bgmusic', 'assets/sounds/bgmusic.mp3');
		this.game.load.audio('buttonmusic', 'assets/sounds/button.mp3');
	}

	create() {
		this.game.stage.backgroundColor = '#44beb9';

		this.button = new ScalableButton(this.game, -200, -200, 'button', this.handleInput, this, 0, 0, 1, 0);
		this.game.world.add(this.button);

		this.initWheelElem();
		this.positionElements(this.game.width, this.game.height);

		this.isRotating = false;
		this.rotatingWheels = 0;

		this.result = [];

		this.bgMusic = this.game.add.audio('bgmusic');
		this.bgMusic.loop = true;
		this.bgMusic.play();

		this.buttonMusic = this.game.add.audio('buttonmusic');
	}

	update() {
		if (this.isRotating) {
			for (let i = 5 - this.rotatingWheels; i < 5; i++) {
				let wheel = this.elemGroup.getChildAt(i);
				wheel.rotation += 0.4;
			}
		}
	}

	resize(width, height) {
		this.wheel.clear();
		this.positionElements(width, height);
	}

	positionElements(width, height) {
		let isLandscape = height / width < 1.3;
		if (isLandscape) {
			let availableWheelSpace = Math.min(width * 2 / 3, height);
			let maxDiameter = availableWheelSpace * 0.95;
			let verticalMargin = (height - maxDiameter) / 2;
			let horizontalMargin = (width * 2 / 3 - maxDiameter) / 2;

			this.elemGroup.forEach((elem) => {
				elem.pivot.x = maxDiameter / 2;
				elem.pivot.y = maxDiameter / 2;
				elem.x = maxDiameter / 2;
				elem.y = maxDiameter / 2;
			}, this);
			this.elemGroup.pivot.x = maxDiameter / 2;
			this.elemGroup.pivot.y = maxDiameter / 2;
			this.elemGroup.x = horizontalMargin + maxDiameter / 2;
			this.elemGroup.y = verticalMargin + maxDiameter / 2;

			let center = maxDiameter / 2;
			let minRad = maxDiameter / 12;
			for (let i = 0; i < 5; i++) {
				let rad = minRad * (i + 1);
				for (let j = 0; j < 10; j++) {
					let elem = this.wheelElem[i][j];
					elem.scaleObject(minRad);
					elem.x = center + (rad + minRad / 2) * Math.cos((j + 1) * Math.PI / 5);
					elem.y = center + (rad + minRad / 2) * Math.sin((j + 1) * Math.PI / 5);
				}
			}

			this.drawWheel(horizontalMargin, verticalMargin, maxDiameter);

			let availableButtonSpace = width / 3;
			this.button.scaleObject(availableButtonSpace);
			this.button.y = height / 2;
			this.button.x = availableWheelSpace + availableButtonSpace / 2;
		}
		else {
			let availableWheelSpace = width;
			let maxDiameter = availableWheelSpace * 0.9;
			let verticalMargin = availableWheelSpace * 0.1;
			let horizontalMargin = (width - maxDiameter) / 2;

			this.elemGroup.forEach((elem) => {
				elem.pivot.x = maxDiameter / 2;
				elem.pivot.y = maxDiameter / 2;
				elem.x = maxDiameter / 2;
				elem.y = maxDiameter / 2;
			}, this);
			this.elemGroup.pivot.x = maxDiameter / 2;
			this.elemGroup.pivot.y = maxDiameter / 2;
			this.elemGroup.x = horizontalMargin + maxDiameter / 2;
			this.elemGroup.y = verticalMargin + maxDiameter / 2;

			let center = maxDiameter / 2;
			let minRad = maxDiameter / 12;
			for (let i = 0; i < 5; i++) {
				let rad = minRad * (i + 1);
				for (let j = 0; j < 10; j++) {
					let elem = this.wheelElem[i][j];
					elem.scaleObject(minRad);
					elem.x = center + (rad + minRad / 2) * Math.cos((j + 1) * Math.PI / 5);
					elem.y = center + (rad + minRad / 2) * Math.sin((j + 1) * Math.PI / 5);
				}
			}

			this.drawWheel(horizontalMargin, verticalMargin, maxDiameter);

			let availableButtonSpace = Math.min(width * 0.6, height - availableWheelSpace);
			this.button.scaleObject(availableButtonSpace);
			this.button.y = availableWheelSpace + (height - availableWheelSpace) / 2;
			this.button.x = width / 2;
		}

		this.game.world.bringToTop(this.elemGroup);
	}

	drawWheel(x, y, maxDiameter) {
		// Draw the wheel
		let graphics = this.game.add.graphics(x + maxDiameter / 2, y + maxDiameter / 2);

		graphics.beginFill(0xFE938C, 1);
		graphics.drawCircle(0, 0, maxDiameter);

		graphics.beginFill(0xE6B89C, 1);
		graphics.drawCircle(0, 0, maxDiameter * 5 / 6);

		graphics.beginFill(0xEAD2AC, 1);
		graphics.drawCircle(0, 0, maxDiameter * 4 / 6);

		graphics.beginFill(0x9CAFB7, 1);
		graphics.drawCircle(0, 0, maxDiameter * 3 / 6);

		graphics.beginFill(0x4281A4, 1);
		graphics.drawCircle(0, 0, maxDiameter * 2 / 6);

		graphics.beginFill(0x44BEB9, 1);
		graphics.drawCircle(0, 0, maxDiameter / 6);

		graphics.lineStyle(1, 0xFFFFFF, 1);
		graphics.moveTo(0, 0);
		graphics.lineTo(maxDiameter / 2 + 50, 0);

		this.wheel = graphics;
	}

	initWheelElem() {
		let availableElem = ['egg', 'pixel', 'watchman', 'irish', 'bird', 'A', 'K', 'Q', 'J', '10'];
		this.wheelElem = [];
		this.elemGroup = this.game.add.group();

		let availableWheelSpace = Math.min(this.game.width * 2 / 3, this.game.height);
		let maxDiameter = availableWheelSpace * 0.9;
		this.elemGroup.pivot.x = maxDiameter / 2; 
		this.elemGroup.pivot.y = maxDiameter / 2; 

		let center = maxDiameter / 2;
		let minRad = maxDiameter / 12;
		for (let i = 0; i < 5; i++) {
			this.wheelElem[i] = [];
			let elemGroup = this.game.add.group();

			let rad = minRad * (i + 1);
			for (let j = 0; j < 10; j++) {
				let elem = new ScalableSprite(this.game, -200, -200, availableElem[j]);
				elem.angle = 360 / 10 * (j + 1);

				this.wheelElem[i][j] = elem;
				elemGroup.add(elem);
			}

			this.elemGroup.add(elemGroup);
		}
	}

	handleInput() {
		if (!this.isRotating) {
       		this.isRotating = true;
       		this.rotatingWheels = 5;

       		// Choose randomly the final result
       		for (let i = 0; i < 5; i++) {
       			this.result[i] = Math.floor(Math.random() * 10);
       		}
		}
		else {
			let idx = 5 - this.rotatingWheels;
			let wheelToStop = this.elemGroup.getChildAt(idx);

			// Show wheel stop animation
			let tween = this.game.add.tween(wheelToStop).to({
				rotation: this.result[idx] * Math.PI / 5
			}, 1000, Phaser.Easing.Quadratic.Out, true);

			this.rotatingWheels -= 1;
			if (this.rotatingWheels == 0) {
				this.isRotating = false;
			}
		}

		this.buttonMusic.play();
	}

}

export default GameState;
