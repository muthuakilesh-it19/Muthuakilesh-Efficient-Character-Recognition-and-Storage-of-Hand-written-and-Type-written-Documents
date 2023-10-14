import { prisma } from "../../lib/prisma";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res: NextApiResponse){
    const {name,roll,title,guide}=req.body
    try{
        await prisma.entry.create({
            data: {
                name,
                roll,
                title,
                guide
            }
        })
        res.status(200).json({message: 'created'})
    }catch(error){
        console.log("failure");
    }
}