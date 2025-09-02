
import { Database } from "../bdConnect";
import { DispositivoService } from "./deviceService";

async function testDevice(){

    await Database.getInstance().connect()
    const deviceService = new DispositivoService()
    

        //insert
        //const newDevice = await deviceService.createDevice({nome:'Lampada'}, 1)
        //console.log('novo dispositivo ',newDevice)

        //desligar
        //const deviceOff = await deviceService.desligar(1)
        //console.log('dispositivo desligado \n', deviceOff)

        //ligar
        //const deviceOn = await deviceService.ligar(1)
        //console.log('dispositivo ligado \n', deviceOn)

        //criar novo dipositivo
        //const newDevice2 = await deviceService.createDevice({nome:'ventilador'}, 1)
        //console.log('novo dispositivo \n', newDevice2)

        //listar dispositivos
        //const devices = await deviceService.listDevices()
        //console.log(devices)

        //listar dispositivo 1
        //const device1 = await deviceService.listDeviceById(1)
        //console.log(device1)
        
        //listar dipositivo 2
        //const device2 = await deviceService.listDeviceById(2)
        //console.log(device2)

        //desligar
        //const deviceOff = await deviceService.desligar(2)
        //console.log('dispositivo desligado \n', deviceOff)

    //ligar
    //const deviceOn = await deviceService.ligar(2)
    //console.log('dispositivo ligado \n', deviceOn)



    //update
    const updateDevice2 = await deviceService.updateDevice(2, {nome:'arcondicionado'})
    console.log(updateDevice2)

}

testDevice()