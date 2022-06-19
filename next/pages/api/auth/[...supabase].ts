import { handleAuth } from "@supabase/supabase-auth-helpers/nextjs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function AuthHandler(
  req: NextApiRequest, res: NextApiResponse
) {
  // check for cookies before fetching user data
  // https://github.com/supabase-community/auth-helpers/issues/114
  return req.headers.cookie 
    ? handleAuth() 
    : res.status(200).send('ok')
}