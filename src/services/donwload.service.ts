import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const imagePath = path.join('./public/images', id)
    const [, extension] = id.split('.')
    try {
      const imageBuffer = await fs.readFile(imagePath)
      res.setHeader('Content-Type', `image/${extension}`)
      res.status(200).send(imageBuffer)
    } catch (error) {
      console.error(error)
      res.status(404).json({ error: 'Image not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
