import { Player, SongList } from "@app/components";

function App() {
	return (
		<div className='music-player-bg flex flex-col items-center justify-center h-screen w-full'>
			<div className='bg-neutral-500 px-20 pt-20 pb-20 rounded-5xl'>
				<div className='rounded-xl py-10 pl-10 pr-5 bg-neutral-600'>
					<SongList />
				</div>
				<Player />
			</div>
		</div>
	);
}

export default App;
