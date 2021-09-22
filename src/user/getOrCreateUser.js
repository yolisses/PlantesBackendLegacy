import { Users } from "../db/entities.js";

export async function getOrCreateUser({email, name}){
    const user = await Users.findOne({email})
    if(user) return user;

    const newUser = new Users({name,email});
    newUser.id = newUser._id;
    
    return new Promise((resolve, reject) => {
    newUser.save((err, data) => {
        if (err) reject(err);
        else resolve(data);
        });
        console.error(newUser)
    })
}