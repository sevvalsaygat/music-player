import React from "react";

import { usePlayerStore } from "@app/hooks";

import { PlayIcon } from "@heroicons/react/24/solid";

type SongListProps = {};

const SongList: React.FC<SongListProps> = () => {
	const songs = usePlayerStore((state) => state.songs);

	const updateCurrentSong = usePlayerStore((state) => state.updateCurrentSong);

	const onClickSongPlay = (name: string, url: string) => {
		updateCurrentSong(name, url);
	};

	return (
		<div>
			{songs.map((song, index) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className='flex flex-row'>
						<div>{song.name}</div>{" "}
						<PlayIcon
							onClick={() => {
								onClickSongPlay(song.name, song.url);
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default SongList;
