const { QueryTypes } = require("sequelize");

const textQuery=`
    select 
        u.id userId,
        count(ans.id) "countAnswer",
        ans."stateAnswer" ,
        q.text text
    from "Users" u
    join "Answer" ans
    on ans."UserId"=u.id
    join "Questions" q
    on q.id=ans."QuestionId"
    group by userId,text,"stateAnswer"
`;

const vUserAnswer=({connection})=>{
    const sync=async()=>connection.query(`create or replace view VUserAnswer as ${textQuery}`)
    return {
        
            
        
        findAll:async()=>{
            await sync();
            return await connection.query("select * from vuseranswer",{type: QueryTypes.SELECT});
        },
        findByPkDataAnswer:async(_id)=>{
            await sync();
            return await connection.query("select * from vuseranswer where userid=?",
              {
                replacements: [_id],
                type: QueryTypes.SELECT
              }
            );
        },
        associate:(m)=>{}
    }
}

module.exports=vUserAnswer;