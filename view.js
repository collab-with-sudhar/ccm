let genre=[
    {
        g_id:1,
        genre:'Thriller'
    },
    {
        g_id:2,
        genre:'Mystery'
    },
    {
        g_id:3,
        genre:'Comedy'
    }

]

const home=(req,res)=>{
    res.render('index',{genre});
}

const about=(req,res)=>{
    const data={
        name:"sudharshan",
        age:20,
        education:"B.Tech IT",
        CGPA:7.8
    }
    res.render('about',data);
}

const contact=(req,res)=>{
    const data={
        email:"sudharshan@gmail.com",
        phone:"9025078201"
    }
    res.render('contact',data);
}


export {home,about,contact};