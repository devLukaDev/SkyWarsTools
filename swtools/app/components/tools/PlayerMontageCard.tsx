"use client";
import { OverallResponse } from "@/app/types/OverallResponse";
import { calcLevel, fillMCColorText } from "@/app/utils/Utils";
import React from "react";
import { useRef } from "react";
import Button from "../universal/Button";
import { formatScheme } from "@/app/utils/Scheme";
import { getPlayerRank } from "@/app/utils/RankTag";

const MontageCard: React.FC<OverallResponse> = (data) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [useLevelScheme, setUseLevelScheme] = React.useState(true);
	const [useLevel, setUseLevel] = React.useState(true);
	const [useRank, setUseRank] = React.useState(true);
	const [useCheaterSuffix, setUseCheaterSuffix] = React.useState(false);
	const [useName, setUseName] = React.useState(true);
	const [fontSize, setFontSize] = React.useState(80);
	const [useShadow, setUseShadow] = React.useState(true);
	const [useCustomName, setUseCustomName] = React.useState(false);
	const [customName, setCustomName] = React.useState("");

	const [showOptions, setShowOptions] = React.useState(false);

	const handleSave = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const link = document.createElement("a");
			link.download = data.player + "_card.png";
			link.href = canvas.toDataURL("image/png");
			link.click();
		}
	};
	const handleCopy = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.toBlob((blob) => {
				if (blob) {
					const item = new ClipboardItem({ "image/png": blob });
					navigator.clipboard.write([item]);
				}
			});
		}
	};

	// Kind of hardcoded, but it works
	const box = [10, 0, 2000, 180 + fontSize / 2];

	// Scheme bits
	const level = calcLevel(data.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, data, useLevelScheme);

	// Rank
	const rank = getPlayerRank(data);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");

			const myFont = new FontFace("MinecraftReg", "url(/fonts/MinecraftRegular.ttf)");
			myFont.load().then((font) => {
				document.fonts.add(font);
				if (ctx) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.font = `${fontSize}px MinecraftReg`;
					let text = "";
					if (useLevel) {
						text = `${scheme}`;
					}
					if (rank.cleanPrefix && useRank) {
						text += " " + rank.prefix + " ";
					} else {
						text += "§7 ";
					}
					if (useName) text += useCustomName && customName.trim() ? customName : data.player;

					if (useCheaterSuffix) {
						text += " §c[CHEATING]";
					}
					if (useShadow) {
						ctx.shadowColor = "black";
						ctx.shadowOffsetX = 4;
						ctx.shadowOffsetY = 4;
						ctx.shadowBlur = 4;
					} else {
						ctx.shadowColor = "transparent";
						ctx.shadowOffsetX = 0;
						ctx.shadowOffsetY = 0;
						ctx.shadowBlur = 0;
					}
					fillMCColorText(ctx, text.trimEnd(), box);
				}
			});
		}
	});

	return (
		<div className="flex flex-col items-center gap-4 py-8 overflow-visible">
			<div className="w-full max-w-full overflow-x-auto lg:justify-center flex">
				<canvas
					ref={canvasRef}
					width={2000}
					height={170}
					style={{
						border: "3px solid #ffffff22",
						borderRadius: "10px",
						display: "block",
						minWidth: "600px",
						maxWidth: "100%",
					}}
				/>
			</div>
			<div className="relative">
				<button
					className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition cursor-pointer"
					onClick={() => setShowOptions((v) => !v)}
				>
					Options
				</button>
				{showOptions && (
					<div className="absolute left-0 mt-2 w-60 bg-content rounded z-10 p-4 flex flex-col gap-3">
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useLevel}
								onChange={(e) => setUseLevel(e.target.checked)}
							/>
							<span>Show Level</span>
						</label>
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useLevelScheme}
								onChange={(e) => setUseLevelScheme(e.target.checked)}
							/>
							<span>Use Level Scheme</span>
						</label>
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useRank}
								onChange={(e) => setUseRank(e.target.checked)}
							/>
							<span>Include Rank</span>
						</label>
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useName}
								onChange={(e) => setUseName(e.target.checked)}
							/>
							<span>Show Name</span>
						</label>
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useCustomName}
								onChange={(e) => setUseCustomName(e.target.checked)}
							/>
							<span>Custom Name</span>
						</label>
						{useCustomName && (
							<input
								type="text"
								value={customName}
								maxLength={32}
								onChange={(e) => setCustomName(e.target.value)}
								placeholder={data.player}
								className="w-full p-1 rounded border border-gray-300 focus:outline-none text-white bg-gray-800"
							/>
						)}
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useCheaterSuffix}
								onChange={(e) => setUseCheaterSuffix(e.target.checked)}
							/>
							<span>Cheater Suffix</span>
						</label>

						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="number"
								min={20}
								max={200}
								value={fontSize}
								onChange={(e) => setFontSize(parseInt(e.target.value))}
								className="w-14 p-1 rounded border border-gray-300 focus:outline-none text-white bg-gray-800"
							/>
							<span>Font Size</span>
						</label>
						<label className="flex items-center gap-2 text-base font-medium text-white">
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
								checked={useShadow}
								onChange={(e) => setUseShadow(e.target.checked)}
							/>
							<span>Text Shadow</span>
						</label>
					</div>
				)}
			</div>
			<div className="flex gap-2">
				<Button onClick={handleSave}>Save</Button>
				<Button onClick={handleCopy}>Copy</Button>
			</div>
		</div>
	);
};

export default MontageCard;
