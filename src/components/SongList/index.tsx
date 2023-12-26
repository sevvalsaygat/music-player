import React from "react";

import { usePlayerStore } from "@app/hooks";

import { PlayIcon, StopIcon, SparklesIcon } from "@heroicons/react/24/outline";

type SongListProps = {};

const SongList: React.FC<SongListProps> = () => {
	const songs = usePlayerStore((state) => state.songs);
	const updateCurrentSong = usePlayerStore((state) => state.updateCurrentSong);
	const isPaused = usePlayerStore((state) => state.isPaused);
	const currentSong = usePlayerStore((state) => state.currentSong);

	const onClickSongPlay = (name: string, url: string) => {
		updateCurrentSong(name, url);
	};

	return (
		<div>
			{songs.map((song, index) => {
				return (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className='flex flex-row justify-between items-center bg-inherit w-[250px] mb-4'
					>
						<div className='flex flex-row items-center gap-3 text-sm font-thin text-neutral-100'>
							<SparklesIcon className='w-4 h-4 text-orange-200 animate-pulse' />
							{song.name}
						</div>
						{currentSong.name === song.name ? (
							isPaused ? (
								<PlayIcon
									className='w-6 h-6 text-neutral-300'
									onClick={() => {
										onClickSongPlay(song.name, song.url);
									}}
								/>
							) : (
								<StopIcon className='w-6 h-6 text-neutral-300' />
							)
						) : (
							<PlayIcon
								className='w-6 h-6 text-neutral-300'
								onClick={() => {
									onClickSongPlay(song.name, song.url);
								}}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default SongList;
