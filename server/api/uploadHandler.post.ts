import { Buffer } from 'node:buffer'
import * as fs from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)

    if (body![0]) {
      const b64 = Buffer.from(body![0].data).toString('base64')

      fs.writeFile(`./uploads/${body![0].filename as string}`, b64, {
        encoding: 'base64',
      })

      const mimeType = 'image/png'
      return `data:${mimeType};base64,${b64}`

      //
    } else {
      return { serverMsg: 'Unabled to read file!' }
    }
  } catch (error) {
    return { serverMsg: error }
  }
})
