const address=({connection,types})=>{
    const res=connection.define(
        'Address',
        {
            
            address:{
                type:types.STRING()
            },
            x:{
                type:types.DECIMAL(10,5)
            },        
            y:{
                type:types.DECIMAL(10,5)
            }
        },
        { timestamps: false }
    );
    res.associate=({objectSight})=>{
        res.hasOne(objectSight);
    }
    return res;
}
module.exports=address;
