//lista con la data
let data=[{}]

exports.getData = (ctx) => {
    ctx.body=data
    return ctx
}
exports.agregar_incidente=(incidente,umbral)=>{
    nuevo={
        "incident_id": incidente.event_id,
        "incidentes": [incidente]
      }

    if(data.isEmpty()==true){//si la lista esta vacia
        data.push(nuevo)
    }
    for (i in data){
        if(i.incidentes[0].metadata==incidente.metadata){//misma patente
            if((incidente.timestamp/1000)-(i.incidente.timestamp/1000)<=umbral){//comprueba el umbral
                data.incident_id[i.incident_id].incidentes.push(incidente)   //añade un nuevo incidente con mismo patente dentro del umbral 
            }
            else{
                console.log("fuera del umbral")
                continue
            }
        }
        else{
            data.push((incidente.event_id,incidente))//distinta patente

        }
    }
    return data

}

exports.nuevo_incidente=(patente)=>{
    const nuevo_incidente = {
        event_id: Math.random()*1000,
        context: "car_plate",
        metadata:patente,
        timestamp:System.currentTimeMillis() 

    }
    return nuevo_incidente



}