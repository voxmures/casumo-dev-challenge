class ScalableSprite extends Phaser.Sprite {
	
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);
		this.anchor.setTo(0.5);
	}

	scaleObject(availableSpaceWidth) {
		let scale = this.getScaleFactor(availableSpaceWidth);
		this.scale.set(scale, scale);
	}

	getScaleFactor(availableSpaceWidth) {
		let ratio = 1;
		let currentDevicePixelRatio = window.devicePixelRatio;

		let widthRatio = (this._frame.width * currentDevicePixelRatio + this._frame.width * 0.3) / availableSpaceWidth;
		ratio = 1 / widthRatio;

		return ratio * currentDevicePixelRatio;
	}
}

export default ScalableSprite;