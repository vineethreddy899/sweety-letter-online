import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: 32,
				height: 32,
				background: "#FAF7F2",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
			}}
		>
			<div
				style={{
					width: 22,
					height: 15,
					border: "2px solid #C4B49A",
					background: "#E8DFD0",
					display: "flex",
				}}
			>
				<div
					style={{
						position: "absolute",
						width: 8,
						height: 8,
						borderRadius: "50%",
						background: "#8B2942",
						transform: "translate(11px,4px)",
					}}
				/>
			</div>
		</div>,
		{ ...size }
	);
}
