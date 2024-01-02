import React from "react";

import cn from "classnames";

import { Player, SongList } from "@app/components";
import { usePlayerStore } from "@app/hooks";

function App() {
	const isPaused = usePlayerStore((state) => state.isPaused);

	return (
		<React.Fragment>
			<div
				className={cn("absolute -z-10 h-screen w-screen top-0 left-0 right-0", {
					"idle-bg": isPaused,
					"animated-bg": !isPaused,
				})}
			/>
			<div className='flex flex-col items-center justify-center h-screen w-full'>
				<div className='bg-neutral-500 px-20 pt-20 pb-20 rounded-5xl'>
					<div className='rounded-xl py-10 pl-10 pr-5 bg-neutral-600'>
						<SongList />
					</div>
					<Player />
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
