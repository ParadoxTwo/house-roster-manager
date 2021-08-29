const express = require('express')
const route = express.Router()
const pool = require('../db')

//create a user
route.post("/create", async(req,res)=>{
    try {
        let {emailId, emailIdVisible, fullName, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl} = req.body
        if(dob===''){
            dob="01/01/1000"
        }
        const newUser = await pool.query(
            "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", //adding " RETURNING *" will return the rows which could be used if needed (newUser.rows)//(email_id, email_id_visible, full_name, dob, dob_visible, full_address, full_address_visible, bio) 
            [emailId, emailIdVisible, fullName, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl]
        ).catch(error=>{
            console.log(error)
            res.send(error)
        })
        res.json(newUser)
        
    } catch (error) {
        console.error(error.message)
    }
})
/*req.body is mainly used with form using POST method. You've to use enctype="application/x-www-form-urlencoded" in the form properties. 
As POST method don't show anything in URL, you have to use body-parser middleware if the form contains an input text with name="age" then req.body.age return the value of this feld.
req.query takes parameters in the URL (mainly GET method) example for this URL ► http://localhost/books?author=Asimov app.get('/books/', (req, res) => { console.log(req.query.author) } will return Asimov
by the way, req.params take the end part of the URL as a parameter. example for this URL ► http://localhost/books/14 app.get('/books/:id', (req, res) => { console.log(req.params.id) } will return 14
- David guy...
*/
//get a user's info
route.get("/get", async(req,res)=>{
    try {
        let {emailId} = req.query                                 
        !emailId?{emailId} = req.body:null
        const qResult = await pool.query(
            `SELECT * FROM users WHERE email_id='${emailId}'`
        ).catch(error=>{
            // console.log(error)
            res.send(error)
        })
        res.json(qResult.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//image experiments
route.post("/image", async(req, res)=>{
    try {
        const {imgPath} = req.body
    } catch (error) {
        console.error(error)
    }
})

//update a user's info
route.put("/update", async(req,res)=>{
    try {
        let {emailId, emailIdVisible, fullName, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl} = req.body        
        if(dob===''){
            dob="01/01/1000"
        }                         
        const qResult = await pool.query(
            `UPDATE users 
            SET email_id=$1, 
                email_id_visible=$2, 
                full_name=$3, 
                dob=$4, 
                dob_visible=$5, 
                full_address=$6, 
                full_address_visible=$7, 
                bio=$8,
                img_url=$9
            WHERE email_id='${emailId}' RETURNING *`,
            [emailId, emailIdVisible, fullName, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl]
        ).catch(error=>{
            // console.log(error)
            res.send(error)
        }).then(result=>{
            res.send(result)
        })
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = route