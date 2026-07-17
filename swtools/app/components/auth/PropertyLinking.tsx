"use client";

import React from "react";
import Button from "../universal/Button";
import Image from "next/image";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

type PropertyLinkingProps = {
	linked: boolean;
	uuid?: string;
};

const PropertyLinking: React.FC<PropertyLinkingProps> = ({ linked, uuid }) => {
	const [user, ,] = useAuthState(auth);
	const [dialogisOpen, setDialogIsOpen] = React.useState(false);
	const [ign, setIgn] = React.useState("");
	const [ignError, setIgnError] = React.useState(false);
	const [code, setCode] = React.useState<string>("");
	const [codeError, setCodeError] = React.useState(false);

	function unlink() {
		console.log("Unlinking account");
		if (!user) return;
		user.getIdToken().then((token) => {
			fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/unlink`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				if (res.ok) {
					window.location.reload();
				} else {
					alert("Failed to unlink account. Please contact me");
					console.error("Failed to unlink account");
				}
			});
		});
	}

	function openLinkDialog() {
		if (ign) {
			setIgnError(false);
			setDialogIsOpen(true);
		} else {
			setIgnError(true);
		}
	}

	function linkAccount() {
		if (!code) setCodeError(true);
		if (!ign) setIgnError(true);
		if (!user) {
			alert("You must be logged in to link an account - How are you even seeing this?");
			return;
		}
		const ode = code.trim();

		user.getIdToken().then((token) => {
			fetch(
				`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/link?player=${encodeURIComponent(ign)}&code=${encodeURIComponent(ode)}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			).then((res) => {
				res.json().then((data) => console.log(data));
				if (res.ok) {
					alert("Successfully linked account!");
					setDialogIsOpen(false);
				} else {
					alert("Failed to link account. Please ensure your IGN and code are correct.");
					console.error("Failed to link account");
				}
			});
		});
	}

	const title = "MC Account Link";
	const explainText = linked
		? "Your Minecraft account is currently linked"
		: "Currently not linked to any Minecraft account - do so to access all features";

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between items-center rounded-lg w-full">
				<div>
					<div>
						<div className="flex items-center">
							<strong className="text-lg">{title}</strong>
						</div>
						{explainText && <div className="text-sm text-gray-200 mt-[-6px]">{explainText}</div>}
					</div>
				</div>
				{linked ? (
					<div className="flex justify-end gap-2 items-center">
						<Button onClick={unlink}>Unlink</Button>
						<div className="text-xl font-semibold">
							{uuid && (
								<Tooltip title={uuid}>
									<Link href={`/redirect?uuid=${uuid}`}>
										<Image
											src={`${process.env.NEXT_PUBLIC_HEADS_API}/${uuid}`}
											width={50}
											height={50}
											className="lg:rounded-lg w-30 lg:w-10"
											alt="Minecraft Avatar"
										/>
									</Link>
								</Tooltip>
							)}
						</div>
					</div>
				) : (
					<div className="flex justify-end gap-2 items-center">
						<input
							placeholder="Your IGN"
							className="bg-layer rounded-xl p-2 mr-2"
							style={ignError ? { border: "1px solid red" } : { border: "1px solid transparent" }}
							value={ign}
							onChange={(e) => setIgn(e.target.value)}
						/>
						<Button onClick={openLinkDialog}>Link</Button>
					</div>
				)}
			</div>

			{dialogisOpen && (
				<div className="bg-layer p-2 rounded-lg flex flex-col gap-2 justify-center items-center">
					<p className="font-semibold text-xl">
						Connect to the <span className="text-[var(--accent)]">verify.skywarstools.com</span> Minecraft server and input the
						given code below{" "}
					</p>
					<div>
						<input
							placeholder="Code"
							className="bg-layer rounded-xl p-2 mr-2 w-30"
							style={codeError ? { border: "1px solid red" } : { border: "1px solid transparent" }}
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
						<Button onClick={linkAccount}>Confirm</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PropertyLinking;
