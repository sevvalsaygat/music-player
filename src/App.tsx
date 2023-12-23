import { Player, SongList } from "@app/components";

function App() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<SongList />
			<Player />
		</div>
	);
}

export default App;
