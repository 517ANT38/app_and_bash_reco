const { QueryTypes } = require("sequelize");

const textQuery=`
    select 
        q.id,
        q.text,
        count(case ans."stateAnswer" when true then 1 else null end) ansGREAT,
        count(case ans."stateAnswer" when false then 1 else null end) ansBAD
    from "Questions" q
    join "Answer" ans
    on ans."QuestionId"=q.id
    group by q.id,q.text
`;

const vQuestionCountStateAns=({connection})=>{
    const sync=async()=>connection.query(`create or replace view vQuestionCountStateAns as ${textQuery}`);
    return {
        
            
        
        findAll:async()=>{
            
            await sync();
            return await connection.query("select * from vQuestionCountStateAns",{type: QueryTypes.SELECT});
            
        },
        findByPkDataAnswer:async(_id)=>{
            
            await sync();
            return await connection.query("select * from vQuestionCountStateAns where id=:id",
            {
              replacements: {id:_id},
              type: QueryTypes.SELECT
            }
          );
        },
        associate:(m)=>{}
    }
}

module.exports=vQuestionCountStateAns;