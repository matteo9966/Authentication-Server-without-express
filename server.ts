import { pipelineServer } from "./Pipeline/Pipeline";

const pipeline = pipelineServer();


pipeline.listen(8000,()=>{
    console.log('listening on 8000')
})


pipeline.route('/dogos').get(async (request,response)=>{
    response.end('you made it :)')
})