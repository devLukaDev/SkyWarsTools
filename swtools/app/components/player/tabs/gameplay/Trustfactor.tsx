"use client";
import Loading from "@/app/components/universal/Loading";
import { OverallResponse } from "@/app/types/OverallResponse";
import { Credit, TrustfactorResponse } from "@/app/types/TrustFactor";
import { fetcher } from "@/app/utils/Utils";
import React, { ReactNode } from "react";
import useSWR from "swr";

function Trustfactor({ response }: { response: OverallResponse }) {
	const { data, error, isLoading } = useSWR<TrustfactorResponse>(
		process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + "/api/trustfactor?uuid=" + response.uuid,
		fetcher,
	);

	return <TrustFactorCards data={data} isLoading={isLoading}></TrustFactorCards>;
}

// --- helpers -----------------------------------------------------------

type Severity = "high" | "medium" | "none";

/** Flags text that indicates a ban/blacklist/cheat finding so it can be
 *  visually distinguished from neutral stats (KDR, ping, playtime, etc). */
function severityOf(text?: string): Severity {
	if (!text) return "none";
	const t = text.toLowerCase();
	if (t.includes("blacklist") || t.includes("cheat") || t.includes("ban")) return "high";
	if (t.includes("gap") || t.includes("risky") || t.includes("alternative")) return "medium";
	return "none";
}

function combinedSeverity(label?: string, detail?: string): Severity {
	const fromLabel = severityOf(label);
	return fromLabel !== "none" ? fromLabel : severityOf(detail);
}

const severityDot: Record<Severity, string> = {
	high: "bg-red-400",
	medium: "bg-amber-400",
	none: "bg-white/20",
};

const severityRank: Record<Severity, number> = { high: 2, medium: 1, none: 0 };

/** Returns a copy of `tags`, highest severity first. Stable for ties, so
 *  tags of equal severity keep the order the API returned them in. */
function sortBySeverity<T>(tags: T[] | undefined, getLabel: (t: T) => string | undefined, getDetail: (t: T) => string | undefined): T[] {
	if (!tags) return [];
	return [...tags].sort(
		(a, b) => severityRank[combinedSeverity(getLabel(b), getDetail(b))] - severityRank[combinedSeverity(getLabel(a), getDetail(a))],
	);
}

// --- building blocks -----------------------------------------------------

function CreditBadge({ credit, name }: { credit?: Credit; name: string }) {
	if (!credit) return null;

	let sourceLabel = name;
	try {
		sourceLabel = new URL(credit.link).hostname.replace(/^www\./, "");
	} catch {
		// credit.link isn't a full URL — fall back to the service name
	}

	return (
		<a
			href={credit.link}
			target="_blank"
			rel="noreferrer"
			title={`Data provided by ${name}`}
			className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
		>
			<img src={credit.image} alt={name} className="w-4 h-4 rounded-full object-cover" />
			<span className="text-[11px] font-medium text-white">{sourceLabel}</span>
		</a>
	);
}

function TagRow({ label, detail }: { label?: string; detail?: string }) {
	if (!label && !detail) return null;
	const severity = combinedSeverity(label, detail);

	return (
		<div className="flex gap-2.5 py-2.5 border-b border-white/[0.06] last:border-b-0">
			<span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${severityDot[severity]}`} />
			<div className="flex flex-col gap-0.5 min-w-0">
				{label && <span className="text-sm text-white leading-snug">{label}</span>}
				{detail && <span className="text-xs text-white leading-relaxed">{detail}</span>}
			</div>
		</div>
	);
}

function EmptyState() {
	return (
		<div className="flex h-full items-center justify-center">
			<span className="text-xs text-white/50">No flags reported</span>
		</div>
	);
}
function LoadingState() {
	return (
		<div className="flex h-full items-center justify-center">
			<Loading></Loading>
		</div>
	);
}

function SourceCard({
	title,
	credit,
	isEmpty,
	isLoading,
	children,
}: {
	title: string;
	credit?: Credit;
	isEmpty: boolean;
	isLoading: boolean;
	children: ReactNode;
}) {
	return (
		<div className="w-full lg:w-64 h-100 flex flex-col bg-layer rounded-lg p-4">
			<div className="flex items-center justify-between mb-1 pb-3 border-b border-white/[0.08]">
				<h1 className="text-lg font-semibold text-white tracking-tight">{title}</h1>
				<CreditBadge credit={credit} name={title} />
			</div>
			<div className="flex-1 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{isLoading ? <LoadingState></LoadingState> : null}
				{isEmpty ? <EmptyState /> : children}
			</div>
		</div>
	);
}

// --- main component -----------------------------------------------------

function TrustFactorCards({ data, isLoading }: { data?: TrustfactorResponse; isLoading: boolean }) {
	const aurora = data?.externals?.aurora;
	const winstr = data?.externals?.winstr;
	const urchin = data?.externals?.urchin;
	const seraph = data?.externals?.seraph;

	return (
		<div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-start flex-wrap">
			<SourceCard title="Aurora" credit={aurora?.credit} isEmpty={!aurora?.tags?.length} isLoading={isLoading}>
				{sortBySeverity(
					aurora?.tags,
					(t) => t.text,
					(t) => t.tooltip,
				).map((tag, i: number) => (
					<TagRow key={i} label={tag.text} detail={tag.tooltip} />
				))}
			</SourceCard>

			<SourceCard title="Winstreak" credit={winstr?.credit} isEmpty={!winstr?.tags?.length} isLoading={isLoading}>
				{sortBySeverity(
					winstr?.tags,
					(t) => t.name,
					(t) => t.description,
				).map((tag, i: number) => (
					<TagRow key={i} label={tag.name} detail={tag.description} />
				))}
			</SourceCard>

			<SourceCard title="Coral (Urchin)" credit={urchin?.credit} isEmpty={!urchin?.tags?.length} isLoading={isLoading}>
				{sortBySeverity(
					urchin?.tags,
					(t) => t.text,
					(t) => t.tooltip,
				).map((tag, i: number) => (
					<TagRow key={i} label={tag.text} detail={tag.tooltip} />
				))}
			</SourceCard>

			<SourceCard title="Seraph" credit={seraph?.credit} isEmpty={!seraph?.tags?.length} isLoading={isLoading}>
				{sortBySeverity(
					seraph?.tags,
					(t) => t.text,
					(t) => t.tooltip,
				).map((tag, i: number) => (
					<TagRow key={i} label={tag.text} detail={tag.tooltip} />
				))}
			</SourceCard>
		</div>
	);
}

export default Trustfactor;
