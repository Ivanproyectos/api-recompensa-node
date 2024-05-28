import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const imagePath = path.join('./public/uploads', id)
    const [, extension] = id.split('.')
    const imageBuffer = await fs.readFile(imagePath)
    res.setHeader('Content-Type', `image/${extension}`)
    res.status(200).send(imageBuffer)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
