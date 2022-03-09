const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
app.get("/", (req,res)=>{
    User.find({},function(err, usersinfo){
        // console.log(usersinfo); //fetch all data from database in terminal
        if(err) throw err;
    res.render("index",{
        usersinfo:usersinfo
    });
}); 
// .sort({"name":1}); sorting the data by ascending order
});

app.post("/contact", async(req,res)=>{
    try{
        console.log(req.body);
        const userData = new User(req.body);
        console.log(userData);
        const insertUsers = await userData.save();
        // res.status(201).send(insertUsers); //for postman showing the data
        res.redirect("/");
    }catch(error){
        res.status(500).send(error);
    }
})

app.get("/contact", async (req,res)=>{
    try{
        // const getUsers = await User.find({});
        // res.send(getUsers); //for postman showing the data
        res.render("contact",{
            title:"Contact Us"
        });
    }catch(err){
        res.status(400).send(err);
    }
});

// Edit route for edit page
app.get("/edit/:id", (req,res)=>{
        const _id = req.params.id;
        User.findById(_id, function(err,result){
            if(err) throw err;
            res.render("edit",{
                editLists:result
            });
        });
    });
       
// update route 
app.post("/update/:id", async(req,res)=>{
        const _id = req.params.id;
        await User.findByIdAndUpdate(_id, req.body); //req.body get the data from edit page and update it to database; for now index page
        res.redirect("/");
});

// delete route 
app.get('/delete/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

//server create
app.listen(port, ()=>{
    console.log(`Server is running at port no. ${port}.`)
})