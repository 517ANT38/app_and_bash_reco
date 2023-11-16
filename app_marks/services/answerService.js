const createHttpError = require("http-errors");

module.exports=({answer})=>({
    add:async(payload)=>{
        
        return await answer.create(payload);
        
    },
    update:async(_id)=>{
        let res=await answer.findByPk(_id);
        if(!res)
            throw createHttpError(404,`Question with id=${_id} not found`);
        res.stateAnswer=!res.stateAnswer;
        await res.save();
        return res;     
    },
    findAll:async()=>{
        return await answer.findAll();
    },
    findById:async(_id)=>{
        let res= await answer.findByPk(_id);
        if(!res)
            throw createHttpError(404,`Answer with ${_id} not found`);
        return res;
    },
    
});