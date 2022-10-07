require("dotenv").config();
const sgMail=require("@sendgrid/mail");
const express = require('express')
const bp = require('body-parser')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.static("www"))
sgMail.setApiKey("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");
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const stripe = require("stripe")("sk_test_51LoSPNGf7xX6DrhUj9imNzJfh4FvU7Z78Ompl2dRFLxP6nVw1olnfn0oWimMYnTyFXjFsTy6e6NM8GsTEyrN642s002XYXjGSs");
app.get('/', (req, res) => {
	res.send('Hello!')
})

app.post('/',(req,res)=>{
    const email=req.body.email
    console.log(email)
    const sendMail=async(msg) =>{
        try{
            await sgMail.send(msg);
            res.json({
                code:200,
                success:"message send successfully"
            })
        }
        catch(error){
            console.error(error);
            if(error.response){
                console.error(error.response.body);
                res.json({
                    code:406,
                    fail:"sorry,your email may be false"
                })
            }
      
        }
    };
    sendMail({
        to:email,
        from:"993450372@qq.com",
        subject:"welcome",
        text:"Welcome to use our website!",
    });
})


app.post("/stripe/charge", cors(), async (req, res) => {
    console.log(" route reached", req.body);
    let { amount, id } = req.body;
    console.log(" amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "",
        payment_method: id,
        confirm: true,
      });
      console.log(" payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });
  
  app.listen(8000,(req,res)=>{
    console.log("Server is running on port 8000")
})