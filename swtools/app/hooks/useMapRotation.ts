import useSWR from "swr";
import { fetcher } from "../utils/Utils";

type UseMapRotationResult = {
	mapData?: MapRotationMapResponse;
	mapError?: Error;
	currentData?: MapRotationCurrentResponse;
	currentError?: Error;
	isMapLoading: boolean;
	isCurrentLoading: boolean;
};

type MapRotationCurrentResponse = {
	success: boolean;
	maps: string[];
};

type MapRotationMapResponse = {
	success: boolean;
	map: SWMap
};
export type SWMap = {
	map_name: string;
	added: number[];
	removed: number[];
	last_change: number;
	last_status: boolean;
	createdAt: string;
	updatedAt: string;
	blockStats: {
		ores: Record<string, string>;
	};
	seasonalInfo: {
		original: null | string;
		season: null | string;
		seasonal: boolean;
	};
};
type MapRotationAllResponse = {
	success: boolean;
	maps: SWMap[]
}

export const useMapRotationCurrent = () => {
	const {
		data: currentData,
		error: currentError,
		isLoading: isCurrentLoading,
	} = useSWR<MapRotationCurrentResponse>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/map-rotation/current`, fetcher);

	return {
		currentData,
		currentError,
		isCurrentLoading,
	};
};
export const useMapRotationAll = () => {
	const {
		data: allMapsData,
		error: allMapsError,
		isLoading: allMapsIsLoading,
	} = useSWR<MapRotationAllResponse>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/map-rotation/all`, fetcher);

	return {
		allMapsData,
		allMapsError,
		allMapsIsLoading,
	};
};

export const useMapRotationMap = (mapName: string) => {
	const mapUrl = `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/map-rotation/map?mapName=${encodeURIComponent(mapName)}`;

	const { data: mapData, error: mapError, isLoading: isMapLoading } = useSWR<MapRotationMapResponse>(mapUrl, fetcher);

	return {
		mapData,
		mapError,
		isMapLoading,
	};
};
