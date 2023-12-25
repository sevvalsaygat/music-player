import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import songData from "@app/data/songs.json";

type UsePlayerStateType = {
	songs: {
		url: string;
		name: string;
	}[];
	currentSong: {
		url: string;
		name: string;
	};
	updateCurrentSong: (name: string, url: string) => void;
};

const usePlayerStore = create<UsePlayerStateType>()(
	devtools(
		persist(
			(set) => ({
				songs: songData,
				currentSong: songData[0],
				updateCurrentSong: (name: string, url: string) => {
					set({
						currentSong: {
							name,
							url,
						},
					});
				},
			}),
			{
				name: "player-store",
			},
		),
	),
);

export default usePlayerStore;
