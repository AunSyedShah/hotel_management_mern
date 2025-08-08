import RoomList from './components/Room/RoomList'
import { Button } from './components/ui'

function App(){

  return (
    <>
      <div>
        <Button>Hello World</Button>
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
