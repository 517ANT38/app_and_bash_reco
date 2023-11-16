const answer=({connection,types})=>{
    const res=connection.define(
        'Answer',
        {
            
            stateAnswer:{
                type:types.BOOLEAN()
            }
        },
        {
            freezeTableName:true
        }
    );
    res.associate=({user,question})=>{
        res.belongsTo(user,{
            foreignKey:{
                allowNull:false
            }
        });
        res.belongsTo(question,{
            foreignKey:{
                allowNull:false
            }
        })    
    }
    return res;
}

module.exports=answer;