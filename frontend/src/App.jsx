import RoomList from './components/Room/RoomList'

function App() {

  return (
    <>
      <div>
        <RoomList permissions={{
          read_room: true,
          create_room: true,
          delete_room: false,
          update_room: false
        }}/>
      </div>
    </>
  )
}

export default App
