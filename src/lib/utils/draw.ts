import { PlaygroundConfig } from '$lib/enums/playground.config';

export function drawArrow(
	context: CanvasRenderingContext2D,
	fromX: number,
	fromY: number,
	toX: number,
	toY: number,
	color?: string
) {
	let cornerRadius = PlaygroundConfig.ARROWHEAD_LENGTH; // radius of the corner in pixels

	let dx = toX - fromX;
	let dy = toY - fromY;

	context.lineWidth = 3;
	context.lineCap = 'round';
	context.strokeStyle = color ?? 'silver';
	context.beginPath();

	if (
		Math.abs(dy) >
		PlaygroundConfig.ARROWHEAD_LENGTH +
			cornerRadius * 2 +
			PlaygroundConfig.NODE_SIZE * 2 +
			PlaygroundConfig.NODE_GAP * 2
	) {
		fromY =
			fromY +
			(dy < 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		toY =
			toY +
			(dy > 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		dy = toY - fromY;
		if (Math.abs(dx / 2) < cornerRadius) {
			cornerRadius = Math.abs(dx / 2);
		}

		if (Math.abs(dy / 2) < cornerRadius) {
			cornerRadius = Math.abs(dy / 2);
		}
		// Begin line
		context.moveTo(fromX, fromY);
		// Draw first vertical line
		context.lineTo(fromX, toY - (dy < 0 ? dy / 2 - cornerRadius : dy / 2 + cornerRadius));
		// Draw first corner
		context.arcTo(
			fromX,
			toY - dy / 2,
			fromX + (dx < 0 ? -cornerRadius : cornerRadius),
			toY - dy / 2,
			cornerRadius
		);
		// Draw horizontal line
		context.lineTo(toX + (dx < 0 ? cornerRadius : -cornerRadius), toY - dy / 2);
		// Draw second corner
		context.arcTo(
			toX,
			toY - dy / 2,
			toX,
			toY - (dy < 0 ? dy / 2 + cornerRadius : dy / 2 - cornerRadius),
			cornerRadius
		);

		// Draw second vertical line
		context.lineTo(toX, toY);

		// Arrow head
		context.moveTo(toX, toY);
		context.lineTo(
			toX - PlaygroundConfig.ARROWHEAD_LENGTH,
			toY + (dy > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH)
		);
		context.moveTo(toX, toY);
		context.lineTo(
			toX + PlaygroundConfig.ARROWHEAD_LENGTH,
			toY + (dy > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH)
		);
	} else if (
		Math.abs(dx) >
		PlaygroundConfig.ARROWHEAD_LENGTH * 2 +
			cornerRadius * 2 +
			PlaygroundConfig.NODE_SIZE * 2 +
			PlaygroundConfig.NODE_GAP * 2
	) {
		fromX =
			fromX +
			(dx < 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		toX =
			toX +
			(dx > 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		dx = toX - fromX;
		if (Math.abs(dx / 2) < cornerRadius) {
			cornerRadius = Math.abs(dx / 2);
		}

		if (Math.abs(dy / 2) < cornerRadius) {
			cornerRadius = Math.abs(dy / 2);
		}
		// Begin line
		context.moveTo(fromX, fromY);
		// Draw first horizontal line
		context.lineTo(toX - (dx < 0 ? dx / 2 - cornerRadius : dx / 2 + cornerRadius), fromY);
		// Draw first corner
		context.arcTo(
			toX - dx / 2,
			fromY,
			toX - dx / 2,
			fromY + (dy < 0 ? -cornerRadius : cornerRadius),
			cornerRadius
		);

		context.lineTo(toX - dx / 2, toY + (dy < 0 ? cornerRadius : -cornerRadius));
		context.arcTo(
			toX - dx / 2,
			toY,
			toX + (dx < 0 ? dx / 2 - cornerRadius : dx / 2 + cornerRadius),
			toY,
			cornerRadius
		);
		context.lineTo(toX, toY);
		// Arrow head
		context.moveTo(toX, toY);
		context.lineTo(
			toX + (dx > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH),
			toY + PlaygroundConfig.ARROWHEAD_LENGTH
		);
		context.moveTo(toX, toY);
		context.lineTo(
			toX + (dx > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH),
			toY - PlaygroundConfig.ARROWHEAD_LENGTH
		);
	} else {
		if (
			Math.abs(dx) <
				PlaygroundConfig.NODE_SIZE +
					cornerRadius +
					PlaygroundConfig.NODE_GAP +
					PlaygroundConfig.ARROWHEAD_LENGTH ||
			Math.abs(dy) < cornerRadius + PlaygroundConfig.NODE_GAP + PlaygroundConfig.NODE_SIZE
		) {
			return;
		}
		fromY =
			fromY +
			(dy < 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		toX =
			toX +
			(dx > 0
				? -PlaygroundConfig.NODE_SIZE - PlaygroundConfig.NODE_GAP
				: PlaygroundConfig.NODE_SIZE + PlaygroundConfig.NODE_GAP);
		dx = toX - fromX;
		dy = toY - fromY;

		// Begin line
		context.moveTo(fromX, fromY);
		context.lineTo(fromX, toY + (dy < 0 ? cornerRadius : -cornerRadius));
		context.arcTo(fromX, toY, toX + (dx < 0 ? -cornerRadius : cornerRadius), toY, cornerRadius);
		context.lineTo(toX, toY);

		context.moveTo(toX, toY);
		context.lineTo(
			toX + (dx > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH),
			toY + PlaygroundConfig.ARROWHEAD_LENGTH
		);
		context.moveTo(toX, toY);
		context.lineTo(
			toX + (dx > 0 ? -PlaygroundConfig.ARROWHEAD_LENGTH : PlaygroundConfig.ARROWHEAD_LENGTH),
			toY - PlaygroundConfig.ARROWHEAD_LENGTH
		);
	}
	context.stroke();
}
