import { handleAuth } from "@supabase/supabase-auth-helpers/nextjs"
import { NextApiRequest, NextApiResponse } from "next"

export default function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.cookie || req.query.supabase[0] === 'callback') {
    handleAuth()(req, res)
  } else {
    res.status(200).json({})
  } 
}