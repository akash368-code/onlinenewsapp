const mongoose=require('mongoose');

const country= new mongoose.Schema({
    WMO:String,
    CLDR:String,
    
});
const Code=module.exports=mongoose.model("Code",country);