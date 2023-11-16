
const objectSight=({connection,types})=>{
    const res=connection.define(
        'ObjectSight',
        {
            name:{
                type:types.STRING(80),
                allowNull:false,
                validate:{
                    is:/^[a-zA-Zа-яёА-ЯЁ0-9 ]+$/i,
                    len:[2,50],
                    notEmpty: true
                }
                
            },            
            description:{
                type:types.STRING(600)
            },
            
        },
        {
            freezeTableName:true,
            
        }
    );
    res.associate=({address,question})=>{
        res.belongsTo(address,{
            foreignKey:{
                allowNull:false,
                unique:true
            }
        });    
        res.hasOne(question);
    };
    return res;
}
module.exports=objectSight;