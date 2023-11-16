const { randomUUID } = require("crypto");
const fs=require("fs/promises");
const path = require("path");

const base64ToBuffer = s=> Buffer.from(s.replace(/data:image\/[~_,\w]{2,}\;base64,/g,""),'base64');

const bufferToBase64=theBuff=>theBuff.toString('base64');


const createNameFile=(img)=>{
    const reg=/data:image\/[~_,\w]{2,}\;/g;
    const arr=reg.exec(img);  
   
    
    let uuid=randomUUID();
    if(!arr)return uuid +".bin";
    const type=arr[0].split("/")
    
    return uuid+"."+type[1].replace(";","");
}
const asyncHandler=func => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

const deleteFiles=async(directory)=>{
    for (const file of await fs.readdir(directory)) {
        await fs.unlink(path.join(directory, file));
    }
}
const fraz=()=>(Math.random() + 10).toString(36).substring(7);

const clearDB=async (models)=>{
        await deleteFiles("./static");
        for (const key in models) {
            if("destroy" in models[key])
            {
                await models[key].destroy({
                    where: {},
                    truncate: false
                });
            }
        }
}
async function createTestQuestion(count,id_obj,creater){
    const arr=[];
    for(let i=0;i<count;i++){
        arr.push({
            ObjectSightId:id_obj,
            text:fraz()
        });
        
    }
    return await creater.bulkCreate(arr);
   
}
async function createTestObjectSight(createrObjS,createAddress,img){
    let name=null;
    let r=await createAddress.create({
        address:"safhjksdhgjkdhsjkghsdhgjk ",
        x:82.22,
        y:78.9
    });
    if(img){
         name=randomUUID()+".bin";
        await fs.writeFile(path.join("./static",name),Buffer.from(img,'base64'));
    }
    return await createrObjS.create({
        name:"hrjekrek",
        description:"hsjfhjgfhjsgfhgshf sfhjkshfjksjkfskf",
        urlImg:name,
        AddressId:r.id
    });
}
async function createTestDataForAnswer(models,count=1,insert=false){
    const {objectSight,address,question,user,answer}=models;
    let objS= await createTestObjectSight(objectSight,address,null); 
    let quest=await createTestQuestion(count,objS.id,question);
    let uRes=await user.create({name:"Anton"});
    let arr=quest.map(x=>({QuestionId:x.dataValues.id,UserId:uRes.id,stateAnswer:true}));
    if(insert){
       for (let i=0;i<arr.length;i++) {
            arr[i]=await answer.create(arr[i]);
       }
       
    }
    return arr;

}
async function createTestDataForUserInfoAns(models,countQ=20,countU=10){
    const {objectSight,address,question,user,answer}=models;
    let objS = await createTestObjectSight(objectSight,address,null); 
    let quest = await createTestQuestion(countQ,objS.id,question);
    let uRes = await lotOfUsers(user,countU);
    let arr=quest.map(x=>({QuestionId:x.dataValues.id,UserId:null,stateAnswer:x.dataValues.id/2==0}));
    let i=0,a,b,step;
    a=0;b=step=(countU>countQ)?1:countQ/countU;
    while(i<uRes.length&&b<arr.length){
        for(let j=a;j<b;j++){
            arr[j].UserId=uRes[i].id;
        }
        i++;
        a=b;
        b+=step;

    }
    await answer.bulkCreate(arr);
    return {
        users:uRes.map(x=>x.id),
        quests:quest.map(x=>x.id)
    }
}
async function asyncDataForGetAll(models,count=15,img){
    
    let b= await createTestObjectSight(models.objectSight,models.address,img);
    return await createTestQuestion(count,b.id,models.question);
}
async function lotOfCreateTestObjs(models,count=10){
    for(let i=0;i<count;i++){
        await createTestObjectSight(models.objectSight,models.address,res);
    }
}
async function lotOfUsers(user,count=15){
    const arr=[];
    for (let index = 0; index < count; index++) {
       arr.push({name:"Anton"});
        
    }
    const res=await user.bulkCreate(arr);
    
    return res.map(x=>x.dataValues);
}


module.exports={
    base64ToBuffer,
    bufferToBase64,
    createNameFile,
    asyncHandler,
    clearDB,
    fraz,
    createTestObjectSight,
    asyncDataForGetAll,
    createTestDataForUserInfoAns,
    createTestDataForAnswer,
    lotOfCreateTestObjs,
    lotOfUsers
}