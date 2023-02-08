import validator from 'validator';
import { dbConnection } from '../database/database.connection';
/**
 * @description if returned array is not empty the email is not valid
 * @param email 
 * @returns 
 */
export const validateEmail:(email:string)=>Promise<Array<string>>= async (email:string)=>{
    //la validazione dell'email deve essere la seguente : 1, se è 
    const errors = []
   
    if(!validator.isEmail(email)){
     errors.push('wrong email format')
    }

    const user = await dbConnection.findUserByEmail(email);

    if(user){
        errors.push(`${email} already used`)
    }

    return errors
    
    //cerchiamo di trovare un indice per email

}