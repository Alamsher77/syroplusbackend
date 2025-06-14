import mongoose from 'mongoose'

const schema = mongoose.Schema({
bankdetails: {
type: Object,
required: true
},
amount: {
type: Number,
required: true,
min: 300
},
userId: {
 type:String,
 required: true
}
},{timestamps:true})

const Withdrawal = mongoose.model('Withdrawal', schema)

export default Withdrawal