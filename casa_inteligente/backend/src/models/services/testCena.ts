import { Database } from "../bdConnect";
import { CenaService } from "./cenaServices";


async function testCena() {
    
    await Database.getInstance().connect()
    const cenaService = new CenaService()

    // 1. Criar uma cena
    /* const novaCena = await cenaService.createScene({ nome: "Cena Teste" });
    console.log("Criada:", novaCena);

    const novaCena2 = await cenaService.createScene({ nome: "Cena Teste 2" });
    console.log("Criada:", novaCena2); */

    // 2. Listar todas as cenas
    const todasCenas = await cenaService.listScene();
    console.log("Todas as cenas:", todasCenas);

    // 3. Buscar cena por ID
    //const cenaById = await cenaService.listSceneById(todasCenas[0].idCena);
    //console.log("Cena por ID:", cenaById);

    //4. Ativar cena
    //const sceneOn = await cenaService.ativar(novaCena.idCena)
    //console.log(sceneOn)

    //5. Desativar cena
    //const sceneOff = await cenaService.desativar(todasCenas[1].idCena)
    //console.log(sceneOff)

    // 6. Atualizar a cena
    //const cenaAtualizada = await cenaService.updateScene(todasCenas[1].idCena, { nome: "Cena Atualizada" });
    //onsole.log("Atualizada:", cenaAtualizada);

    // 7. Deletar a cena
    await cenaService.deleteScene(todasCenas[0].idCena);
    console.log("Deletada!");
}

testCena()
