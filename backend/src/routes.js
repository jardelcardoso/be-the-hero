express = require("express")
const crypto = require("crypto")
const connection = require("./database/connetion")

const routes = express.Router()

routes.post("/ongs",(request, response) =>{
    
    const id = crypto.randomBytes(4).toString("HEX");
  //  console.log(id)
    const data = {...request.body,"id":id}
    console.log(data)
    connection("ongs").insert(data)
    .then(result=>{
        console.log(result)
        return response.send({id})
    }).catch(erro=>{
        console.log(erro)
        return response.send(erro)
    })
})

routes.get("/ongs",(request, response) =>{
    
  
    connection("ongs").select("*")
    .then(result=>{
        console.log(result)
        return response.send(result)
    }).catch(erro=>{
        console.log(erro)
        return response.send(erro)
    })
})
routes.post("/insidents",(request, response) =>{
    
  const ong_id = request.headers.authorization;
    const data = {...request.body,"ong_id":ong_id}
    console.log(data)
    connection("incidents").insert(data)
    .then(result=>{
        console.log(result)
        return response.send({result})
    }).catch(erro=>{
        console.log(erro)
        return response.send(erro)
    })
})

routes.get("/insidents",(request, response) =>{
    
    const ong_id = request.headers.authorization;

    const {page = 1} = request.query;

     // const data = {...request.body,"ong_id":ong_id}
     // console.log(data)
      response.header("X-Total-count",5)
      connection("incidents")
      .join("ongs","ongs.id","=","incidents.ong_id")
      .limit(5)
      .offset((page - 1)*5)
      .select(["incidents.*","ongs.name","ongs.whatsapp","ongs.email"])
      .where({"incidents.ong_id":ong_id})
      .then(result=>{
          return response.send({result})
      }).catch(erro=>{
          return response.send(erro)
      })
  })

module.exports = routes