import { useContext } from 'react'
import Display from './components/Display.jsx'
import Player from './components/Player.jsx'
import Sidebar from './components/sidebar.jsx'
import { PlayerContext } from './context/playerContext.jsx'

const App = () => {

  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black text-white">
  {songsData.length > 0 ? (
    <>
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
    </>
  ) : (
    <div className="flex items-center justify-center h-full">
      No songs found in database
    </div>
  )}

  <audio
    ref={audioRef}
    src={track?.file || undefined}
    preload="none"
  />
</div>
    // <div className='h-screen bg-black'>
    //   {songsData.length !== 0 ?
    //     <>
    //       <div className="h-[90%] flex">
    //         <Sidebar />
    //         <Display />
    //       </div>
    //       <Player />
    //     </>
    //     : null}
    //   <audio ref={audioRef} src={track ? track.file : ""} preload='none'></audio>
    // </div>
  )
}

export default App