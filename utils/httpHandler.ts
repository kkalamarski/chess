import type { NextApiRequest, NextApiResponse } from 'next'

interface Methods {
  get?: (req: NextApiRequest, res: NextApiResponse) => void
  post?: (req: NextApiRequest, res: NextApiResponse) => void
  put?: (req: NextApiRequest, res: NextApiResponse) => void
  delete?: (req: NextApiRequest, res: NextApiResponse) => void
  [K: string]: any
}

const httpHandler =
  (methods: Methods) => (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase()

    if (!method) return res.status(405).json({ error: 'method not allowed' })

    if (!methods[method])
      return res.status(405).json({ error: 'method not allowed' })

    return methods[method](req, res)
  }

export default httpHandler
