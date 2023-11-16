const asyncHandler = require("express-async-handler");

module.exports=({router,services,models})=>{
    const routers=router();
    const service=services.answer(models);
    routers.get("/",asyncHandler(async(req,res)=>{
        const data = await service.findAll();
        res.send(data);
    }));
    routers.get("/:id",asyncHandler(async(req,res)=>{
        const data=await service.findById(req.params.id);
        res.send(data);
    }));
    routers.post("/new",asyncHandler(async(req,res)=>{        
        const data=await service.add(req.body);
        res.status(201).send(data);
    }));
    routers.patch("/:id",asyncHandler(async(req,res)=>{
        const data=await service.update(req.params.id,req.body);
        res.send(data);
    }));
    routers.get("/diff_answer_user/all",asyncHandler(async(req,res)=>{
        const data=await service.findByIdUserAnswerDType(req.params.id);
        res.send(data);
    }));
    routers.get("/diff_answer_user/:id",asyncHandler(async(req,res)=>{
        const data=await service.findByIdUserAnswerDType(req.params.id);
        res.send(data);
    }));
    


    return routers;
};