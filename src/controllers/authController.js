import {prisma} from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const body = req.body;

const {name, email, password} = body;

//Check if user already exists
const userExists = await prisma.user.findUnique({
  where: { 
    email: email,
  },
});
    
if (userExists) {
    return res.status(400).json({message: "User already exists with this email"});
}

//Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

//Create user
const user = await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword,
    },
});

return res.status(201).json({
    status: "success",
    data: {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
})

};


const login = async (req, res) => {
    const body = req.body;

    const {email, password} = body;

    //Check if user exists

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (!user) {
        return res.status(400).json({message: "Invalid email or password"});
    }

    //Check if password is correct
    const isPasswordValide = await bcrypt.compare(password, user.password);

    if (!isPasswordValide) {
        return res.status(400).json({message: "Invalid email or password"});
    }

}


export { register, login };
