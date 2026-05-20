import mongoose ,{Schema ,Document} from "mongoose";
import bcrypt from "bcrypt";

type UserRole="admin"|"user";

interface User extends Document{
    email:string;
    password:string;
    name:string;
    role:UserRole
}

const UserSchema=new Schema<User>({
    name:{
        type:String,
        required: [true, 'Name is required'],
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role:{
        type:String,
        required:true,
        default:"user"

    }

},{timestamps:true})

UserSchema.pre("save", async function () {

    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



const UserModel= mongoose.model("User",UserSchema)
export default UserModel

