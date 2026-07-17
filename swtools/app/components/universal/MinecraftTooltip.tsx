"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect, ReactNode } from "react";

interface PortalTooltipProps {
	trigger: (props: {
		ref: React.RefObject<HTMLDivElement | null>;
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		onFocus: () => void;
		onBlur: () => void;
		tabIndex: number;
	}) => ReactNode;
	children: ReactNode;
	className?: string;
}

export default function PortalTooltip({ trigger, children, className }: PortalTooltipProps) {
	const [open, setOpen] = useState(false);
	const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
	const anchorRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => setMounted(true), []);

	const updatePosition = () => {
		if (!anchorRef.current) return;
		const rect = anchorRef.current.getBoundingClientRect();
		setCoords({
			top: rect.bottom + window.scrollY + 8,
			left: rect.left + window.scrollX,
		});
	};

	const show = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		updatePosition();
		setOpen(true);
	};

	// tiny delay avoids flicker if the pointer briefly leaves between trigger and tooltip
	const hide = () => {
		closeTimer.current = setTimeout(() => setOpen(false), 10);
	};

	useEffect(() => {
		return () => {
			if (closeTimer.current) clearTimeout(closeTimer.current);
		};
	}, []);

	return (
		<>
			{trigger({ ref: anchorRef, onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide, tabIndex: 0 })}
			{mounted &&
				open &&
				coords &&
				createPortal(
					<div
						style={{ position: "absolute", top: coords.top, left: coords.left }}
						className={className ?? "w-100 p-2 rounded bg-black/90 text-xl text-white z-50"}
						onMouseEnter={show}
						onMouseLeave={hide}
					>
						{children}
					</div>,
					document.body,
				)}
		</>
	);
}
