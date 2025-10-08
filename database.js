import mongoose from "mongoose";

const schema = new mongoose.Schema({
    movie:{type:String,required:true},
    director:{
        type:String,required:true
    },
    rating:{type:mongoose.Decimal128},
    genre:{type:Array},
    release:{type:Date,default:null},
    created_by:{
        type:String,required:true
    }
});

const saveSchema= mongoose.model('movie',schema);

async function saveData(data){
    await saveSchema.insertMany(data);
    console.log(data);
}

const readData=async()=>{
    const res=await saveSchema.find();
    console.log(res);
}

const updateData=async()=>{
    await saveSchema.updateMany({rating:{$gt:8.2}},{director:'rockstar'});
    console.log('updated.....')
}

const deleteData=async(rate)=>{
    await saveSchema.deleteOne({rating:rate});
    console.log('deleted....')
}
export {saveData,saveSchema,readData,updateData,deleteData}
