import React, { useEffect } from "react";

import { useAudio } from "react-use";

import { usePlayerStore } from "@app/hooks";
import {
	PlayIcon,
	StopIcon,
	BackwardIcon,
	ForwardIcon,
} from "@heroicons/react/24/solid";

type PlayerPropTypes = {};

const Player: React.FC<PlayerPropTypes> = () => {
	const currentSong = usePlayerStore((state) => state.currentSong);
	const songs = usePlayerStore((state) => state.songs);
	const updateCurrentSong = usePlayerStore((state) => state.updateCurrentSong);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [audio, state, controls] = useAudio({
		src: currentSong.url,
		autoPlay: false,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!currentSong) {
			return;
		}

		if (!controls) {
			return;
		}

		controls.play();
	}, [currentSong]);

	const onClickBackward = () => {
		const songIndex = songs.findIndex((s) => s.url === currentSong.url);
		if (songIndex === 0) {
			const lastSongIndex = songs.length - 1;
			const newSong = songs[lastSongIndex];
			updateCurrentSong(newSong.name, newSong.url);

			return;
		}

		const newSong = songs[songIndex - 1];
		updateCurrentSong(newSong.name, newSong.url);
	};

	const onClickForward = () => {
		const songIndex = songs.findIndex((s) => s.url === currentSong.url);
		if (songIndex === songs.length - 1) {
			const newSong = songs[0];
			updateCurrentSong(newSong.name, newSong.url);

			return;
		}

		const newSong = songs[songIndex + 1];
		updateCurrentSong(newSong.name, newSong.url);
	};

	return (
		<div className='flex flex-row gap-2'>
			{/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
			{audio}
			<BackwardIcon onClick={onClickBackward} className='w-7 h-7' />
			<PlayIcon onClick={controls.play} className='w-7 h-7' />
			<StopIcon onClick={controls.pause} className='w-7 h-7' />
			<ForwardIcon onClick={onClickForward} className='w-7 h-7' />
			{currentSong.name}
		</div>
	);
};

export default Player;
