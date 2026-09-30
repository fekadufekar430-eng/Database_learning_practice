const mysql=require('mysql2');
const express=require('express');

const cors=require('cors');

const app=express();

app.use(cors());
// this three line of code use extract data or info from frontend
//  the change in json file the give backend code !!!!


app.use(express.urlencoded({
    extended:true
}))

// extract from front end then gave the body file

app.use(express.json());

const db=mysql.createConnection({
    user:"Mrs fikadu",
    database:"mrs fikadu",
    password:"6140"
});

db.connect((err)=>{
    if(err){
        console.log("database and project code is not connect");
    }
    else {
        console.log("Database and code completed connected!!!");
    }
})

app.get("/checker",(req,res)=>{
    res.send("up and Running the code!!");
})

// method 1

// let customer = 'CREATE TABLE IF NOT EXISTS customers (customer_id INT AUTO_INCREMENT,customer_name VARCHAR(20) NOT NULL, PRIMARY KEY (customer_id))';
// let address = 'CREATE TABLE IF NOT EXISTS address(address_id INT AUTO_INCREMENT,customer_id INT NOT NULL,address_place VARCHAR(20) NOT NULL,PRIMARY KEY(address_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id) )';
// let company= 'CREATE TABLE IF NOT EXISTS company (company_id INT AUTO_INCREMENT,customer_id INT NOT NULL,company_name VARCHAR(20) NOT NULL,PRIMARY KEY(company_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id)  )';
// db.query(customer,(err)=>{
//     if(err){
//         console.log("when think create table i can happen some problems!!! ",err.message)
//     }
// })

// db.query(company,(err)=>{
//     if(err){
//         console.log("when think create table i can happen some problems!!!" ,err.message)
//     }
// })
// db.query(address,(err)=>{
//     if(err){
//         console.log("when think create table i can happen some problems!!! ",err.message)
//     }
// })


// // method 2 
// // write code manual in SQL write like this way
// CREATE TABLE IF NOT EXISTS customers (customer_id INT AUTO_INCREMENT,customer_name VARCHAR(20) NOT NULL, PRIMARY KEY (customer_id));
// CREATE TABLE IF NOT EXISTS address(address_id INT AUTO_INCREMENT,customer_id INT NOT NULL,address_place VARCHAR(20) NOT NULL,PRIMARY KEY(address_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id));
// CREATE TABLE IF NOT EXISTS company (company_id INT AUTO_INCREMENT,customer_id INT NOT NULL,company_name VARCHAR(20) NOT NULL,PRIMARY KEY(company_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id));



// method 3

app.get('/create-table', (req,res)=>{

let customer = 'CREATE TABLE IF NOT EXISTS customers (customer_id INT AUTO_INCREMENT,customer_name VARCHAR(20) NOT NULL, PRIMARY KEY (customer_id))';
let address = 'CREATE TABLE IF NOT EXISTS address(address_id INT AUTO_INCREMENT,customer_id INT NOT NULL,address_place VARCHAR(20) NOT NULL,PRIMARY KEY(address_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id) )';
let company= 'CREATE TABLE IF NOT EXISTS company (company_id INT AUTO_INCREMENT,customer_id INT NOT NULL,company_name VARCHAR(20) NOT NULL,PRIMARY KEY(company_id),FOREIGN KEY (customer_id) REFERENCES customers (customer_id)  )';
db.query(customer,(err)=>{
    if(err){
        console.log("when think create table i can happen some problems!!! ",err.message)
    }
})

db.query(company,(err)=>{
    if(err){
        console.log("when think create table i can happen some problems!!!" ,err.message)
    }
})
db.query(address,(err)=>{
    if(err){
        console.log("when think create table i can happen some problems!!! ",err.message)
    }
})

res.send("tables are created!!!!")
    
})
// console.log("hello")

app.post('/add', (req, res) => {
    console.log(req.body); 
    // this destructure is not work in array the correct way destructure in object
   const {name,address,company}= req.body;
   
   const insertCustomer= 'INSERT INTO customers (customer_name) VALUES(?)'
   const insertAddress='INSERT INTO address (customer_id,address_place) VALUES(?,?)'
   const insertCompany='INSERT INTO company (customer_id,company_name) VALUES(?,?)'

   db.query(insertCustomer,[name],(err,result,fields)=>{
    if(err) console.log(err.message);
    else{
        console.log(result)
        let id=result.insertId;
        db.query(insertAddress,[id,address],(err)=>{
         if(err)console.log(err.message);
        })

          db.query(insertCompany,[id,company],(err)=>{
             if(err)console.log(err.message);
        })
    }
   })
   
    res.status(200).send("Received");
});


app.get("/list",(req,res)=>{
  
    let customers=`SELECT * FROM customers JOIN address JOIN 
                   company ON customers.customer_id=address.customer_id
                    AND customers.customer_id=company.customer_id`;


      db.query( customers,(err,results,field)=>{
            if(err){
                 console.log("error happen within get request",err.message);
              }
              else {
                res.send(results);

              }
      })              
})

app.put("/update",(req,res)=>{
    console.log(req.body);
    // let {id,newName,newAddress,newCompany}=req.body;
    let {id,name}=req.body;
    // let updateData=`UPDATE customers,address,company SET customer_name='${newName}' address_place='${newAddress}',company_name='${newCompany}' WHERE customer_id='${id}'`;

    let updateData=`UPDATE customers SET customer_name='${name}' WHERE customer_id='${id}'`;

    db.query(updateData,(err)=>{
        if(err){
            console.log("error occur at the area of updata",err.message);
        }
    });
    res.send("update are successfully")
})

app.delete("/delete",(req,res)=>{
    const {id}=req.body;
  let deleteName= `DELETE FROM customers   WHERE customer_id='${id}'`;
    let deleteAddress= `DELETE FROM address   WHERE customer_id='${id}'`;
      let deleteCompany= `DELETE FROM company   WHERE customer_id='${id}'`;

    // When creating database tables, 
    // the main table that was supposed to serve as the parent should be created last. 
    // This is because if you create it first, 
    // deleting it later becomes difficult due to foreign key (FK) constraints, 
    // since those keys already exist inside the other child tables.

      db.query(deleteAddress,(err)=>{
        if(err){
            console.log(err.message)
        }
      })

      db.query(deleteCompany,(err)=>{
        if(err){
            console.log(err.message)
        }
      })

        db.query(deleteName,(err)=>{
        if(err){
            console.log(err.message)
        }
      })

      res.send("Deleted the data successfully")
    })

app.listen(6140,()=>{
    console.log("server listen within this 6140 port: http://localhost:6140")
});



