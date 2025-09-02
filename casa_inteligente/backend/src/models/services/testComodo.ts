import { ComodoService } from "./comodoService";
import { AppDataSource } from "../bdConfig";
import { Database } from "../bdConnect";

async function testComodo(){
    
    await Database.getInstance().connect()
    const comodoService = new ComodoService()

        //insert
        //const newRoom = await comodoService.createRoom({nome:'quarto'})
        //console.log('Novo cômodo: ',newRoom)

        //select por id
        //const roomByID = await comodoService.listRoomById(3)
        //console.log('comodo por id ', roomByID)

        //select
        const rooms = await comodoService.listRooms()
        console.log(rooms)
        
        //update
        //const updatedRoom = await comodoService.updateRoom(2, {nome:'sala'})
        //console.log(updatedRoom)

        //delete
        const deletedRoom = await comodoService.deleteRoom(2)
        console.log('Comodo deletado')


    
}

testComodo()