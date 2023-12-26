import React, { useEffect, useState } from "react";

import { useAudio } from "react-use";

import { usePlayerStore } from "@app/hooks";
import {
	PlayIcon,
	StopIcon,
	BackwardIcon,
	ForwardIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
} from "@heroicons/react/24/solid";

type PlayerPropTypes = {};

const Player: React.FC<PlayerPropTypes> = () => {
	const currentSong = usePlayerStore((state) => state.currentSong);
	const songs = usePlayerStore((state) => state.songs);
	const updateCurrentSong = usePlayerStore((state) => state.updateCurrentSong);
	const setIsPaused = usePlayerStore((state) => state.setIsPaused);

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsPaused(state.paused);
	}, [state.paused]);

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

	const totalSeconds = state.time;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	const duration = state.duration;
	const durationMinutes = Math.floor(duration / 60);
	const durationSeconds = Math.floor(duration % 60);

	const playerDurationValue = (state.time / state.duration) * 100;

	const [volume, setVolume] = useState(1);

	return (
		<div className='flex flex-col'>
			<div className='flex justify-center m-10 text-lg font-light text-neutral-100'>
				{currentSong.name}
			</div>
			<div className='mt-10'>
				<div className='flex flex-row gap-2'>
					<div className='time w-7 text-sm text-neutral-200'>
						{minutes}:{seconds}
					</div>
					<input
						type='range'
						min='0'
						max={100}
						value={playerDurationValue}
						className='timeline w-full'
						onChange={(e) => {
							const percent = parseFloat(e.target.value);
							const newDuration = (state.duration / 100) * percent;
							controls.seek(newDuration);
						}}
					/>
					<div className='time w-7 text-sm text-neutral-200'>
						{durationMinutes}:{durationSeconds}
					</div>
				</div>
				<div className='flex flex-row mt-11 items-center justify-between'>
					<br />
					<div className='flex flex-row items-center'>
						{audio}
						<ArrowUturnLeftIcon
							onClick={() => controls.seek(state.time - 10)}
							className='w-4 h-4 text-neutral-300 mr-5'
						/>
						<BackwardIcon
							onClick={onClickBackward}
							className='w-8 h-8 text-neutral-300'
						/>

						{state.paused ? (
							<PlayIcon
								onClick={controls.play}
								className='w-8 h-8 text-neutral-300'
							/>
						) : (
							<StopIcon
								onClick={controls.pause}
								className='w-8 h-8 text-neutral-300'
							/>
						)}
						<ForwardIcon
							onClick={onClickForward}
							className='w-8 h-8 text-neutral-300'
						/>
						<ArrowUturnRightIcon
							onClick={() => controls.seek(state.time + 10)}
							className='w-4 h-4 text-neutral-300 ml-5'
						/>
					</div>
					<div className='flex flex-row'>
						{state.muted ? (
							<SpeakerXMarkIcon
								onClick={controls.unmute}
								className='w-5 h-5 text-neutral-300'
							/>
						) : (
							<SpeakerWaveIcon
								onClick={controls.mute}
								className='w-5 h-5 text-neutral-300'
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Player;
