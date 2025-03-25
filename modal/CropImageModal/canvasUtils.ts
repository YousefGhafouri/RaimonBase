export function rotateSize(width: number, height: number, rotation: number): { width:number,height:number } {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}
export const createImage = (url: string):Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param imageSrc
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0):Promise<{blob:Blob,b64?:string}> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image and store oman.
  ctx.drawImage(image,0,0)

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)


  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotated image at the top left corner
  ctx.putImageData(data, 0, 0)

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      // resolve(URL.createObjectURL(file))
      // if () {
      //   resolve({blob: file, b64: canvas.toDataURL('image/jpeg')})
      // }
      resolve({blob:file})
    }, 'image/png')
  })
}

/**
 * This function was adapted from the one in the answers of https://stackoverflow.com/questions/18379818/canvas-image-masking-overlapping
 * @param imageSrc image url
 * @param maskSrc mask image url
 */
export async function getMaskedImg(imageSrc: string, maskSrc: string):Promise<{blob:Blob}> {
  const image = await createImage(imageSrc)
  const maskImage = await createImage(maskSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const biggestWidth = Math.max(image.width,maskImage.width)
  const biggestHeight = Math.max(image.height,maskImage.height)
  canvas.width = biggestWidth
  canvas.height = biggestHeight
  // draw stretched image
  ctx.drawImage(    maskImage,    0,    0,  maskImage.width, maskImage.height,0,0,biggestWidth, biggestHeight )
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(    image,    0,    0, image.width, image.height,0,0,biggestWidth, biggestHeight   )


  // set canvas width to final desired crop size - this will clear existing context


  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      // resolve(URL.createObjectURL(file))
      // if () {
      //   resolve({blob: file, b64: canvas.toDataURL('image/jpeg')})
      // }
      resolve({blob:file})
    }, 'image/png')
  })
}

export async function getRotatedImage(imageSrc, rotation = 0):Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const orientationChanged =
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
  if (orientationChanged) {
    // noinspection JSSuspiciousNameCombination
    canvas.width = image.height
    // noinspection JSSuspiciousNameCombination
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      // resolve(URL.createObjectURL(file))
      resolve(file)
    }, 'image/png')
  })
}