const createHttpError = require("http-errors");
const { Op } = require("sequelize");


module.exports=({user,vUserAnswer})=>({
    add:async(payload)=>{
        try{
            
            return await user.create(payload);
        }
        catch(e){
            throw  createHttpError(400,"Wrong format name user");
        }
    },
    update:async(_id,payload)=>{
        let res=await user.findByPk(_id);
        if(!res)
            throw createHttpError(404,`User with id=${_id} not found`);
        for(let key in payload){
            if(key!="id")
                res[key]=payload[key];
        }
        try{
            await res.save();
        }
        catch(e){
            throw createHttpError(400,"Bad format question");
        }
        return res;    
    },
    findAll:async()=>{
        return await user.findAll();
    },
    findById:async(_id)=>{
        let res= await user.findByPk(_id);
        if(!res)
            throw createHttpError(404,`User with id=${_id} not found`);
        return res;    
    },
    findByName:async(_name)=>{
        let res= await user.findAll({
            where:{
                name:{[Op.like]:`${_name}%`}
            }
        });
        if(res.length==0)
            throw createHttpError(404,`User with name=${_name} not found`);
        return res;
    },
    findByIdUserInfoAns:async(_id)=>{
        let res= await vUserAnswer.findByPkDataAnswer(_id);
        if(res.length==0)
            throw createHttpError(404,`User with id=${_id} not found`);
        return res; 
    },
    findAllUserInfoAns:async()=>{
        
        return await vUserAnswer.findAll();
        
    }
});