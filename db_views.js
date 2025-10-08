import { saveSchema } from "../models/database.js"

const readDa=async(req,res)=>{
    const read=await saveSchema.find();
    res.render('getdata',{read});
}

const readData=async(req,res)=>{
    const read=await saveSchema.find();
    console.log("api fetched");
    res.json(read);
}

const readById=async(req,res)=>{
    const result=await saveSchema.find({created_by:req.params.user});
    res.send(result);
}

const postData=async(req,res)=>{
    console.log(`api called ${req.body.movie}`)
    const {movie,director,rating,genre}=req.body;
    const create=req.body.created_by;
    console.log(movie)
    const obj={
        movie:movie,
        director:director,
        rating:rating,
        genre:genre,
        created_by:create
    }
    const write=await saveSchema.create(obj);
    res.send('record inserted....');
}

const updateData=async(req,res)=>{
    const update=await saveSchema.updateOne({rating:parseFloat(req.params.movie)},{director:req.body.director})
    res.send('record Updated...')
}

const deleteData= async(req,res)=>{
    const delet=await saveSchema.deleteOne({rating:parseFloat(req.params.rate)});
    res.send('record deleted...')
}

const lookData= async(req,res)=>{
    const read = await saveSchema.find({created_by:req.user.username});
    res.render('getdata',{read});
}

export { readById,readDa,readData,postData,updateData,deleteData,lookData };