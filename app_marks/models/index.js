const address=require("./address");
const objectSight=require("./objectSight");
const question=require("./question");
const answer=require("./answer");
const user=require("./user");
const vUserAnswer=require("./vUserAnswer");
const vQuestionCountStateAns=require("./vQuestionCountStateAns");
const  init_model  = require("./init");




const models={
    address,
    objectSight,
    question,
    user,
    answer,
    vUserAnswer,
    vQuestionCountStateAns
    
}

module.exports=init_model(models);