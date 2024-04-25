import Router from 'koa-router'
import getHealth from './health/health'
import { agregar_incidente, nuevo_incidente} from './funciones'

let patentes=["HGNV12","HGNV12","HGNV12","PTHB15"]

const router = new Router()

router.get('/health', getHealth)


router.post('/api/event/threshold/:umbral',(ctx)=>{
    //console.log("Alo")
    try{
        for (i in patentes){//simula las llegadas nose si es lo correcto la otra idea era postman
            nuevo=nuevo_incidente(i)
            if (!nuevo.event_id || !nuevo.context || !nuevo.metadata ||!nuevo.timestamp) {
                ctx.status = 400;
                ctx.body = { error: 'One or more attributes did no came on the request' };
                return ctx;
            }
            const umbral = ctx.params.umbral;
            Datos=agregar_incidente(nuevo,umbral)
            ctx.status=200
            ctx.body=Datos
            return ctx
        }
       
    } catch(error){
        ctx.status = 500;
        ctx.body = { error: 'INTERNAL SERVER ERROR!!!' };
        return ctx
    }
    
})

//router.get('/api/event/threshold',getData)

export default router