import sharp from "sharp"
import { s3 } from "../upload/s3.js"

export async function compressImageOnS3(key){
    
    try{
    const bucket = process.env.AWS_BUCKET_NAME

    console.error('oi bucket',bucket)
    const image = await s3.getObject({
        Bucket : bucket,
        Key: key
    }).promise()
    console.error('oi image',image.body)


    const optimized = await sharp(image.body)
    .resize(400, 400, {fit:'outside', withoutEnlargement:true})
    .toFormat('webp', {progressive:true})
    .toBuffer()


    console.error('oi optimized',optimized)

    const compressedImageUri = `compressed/${basename(key, extname(key))}.webp`


    console.error('oi compressedImageUri',compressedImageUri)


  const res =   await S3.putObject({
        Body:optimized,
        Bucket:bucket,
        ContentType:'image/webp',
        Key: compressedImageUri
    }).promise()


    console.error('oi res',res)


    return compressedImageUri
}catch (err){
console.error(err)
}
}