
const verifyAdmin=async(req,res,next)=>{
try{
    const role=req.user.role
if(role !=="admin"){
    res.status(403).json({message:"admin access denied"})
}
next();
}catch(error){
console.log(error.message)
res.status(400).json({message:"invalid input"})

}


}