const assert = require('node:assert/strict')
require('./test-content.cjs')
const {imageDimensions,optimizeImage}=require('../src/content/images.ts')
assert.deepEqual(imageDimensions(4800,3200),{width:2400,height:1600})
assert.deepEqual(imageDimensions(1200,3600),{width:800,height:2400})
assert.deepEqual(imageDimensions(200,100),{width:200,height:100})
assert.throws(()=>imageDimensions(0,100))
let closed=0, drawn=false, encodedType='image/webp'
global.createImageBitmap=async (_file,options)=>{assert.equal(options.imageOrientation,'from-image');return{width:4800,height:3200,close(){closed++}}}
global.document={createElement(tag){assert.equal(tag,'canvas');return{width:0,height:0,getContext(type,options){assert.equal(type,'2d');assert.equal(options.alpha,true);return{drawImage(_bitmap,x,y,width,height){assert.deepEqual([x,y,width,height],[0,0,2400,1600]);drawn=true}}},toBlob(callback,type,quality){assert.equal(type,'image/webp');assert.equal(quality,.82);callback(new Blob(['webp'],{type:encodedType}))}}}}
global.FileReader=class{readAsDataURL(blob){assert.equal(blob.type,'image/webp');this.result='data:image/webp;base64,d2VicA==';this.onload()}}
async function run(){
 const result=await optimizeImage({name:'photo.png',type:'image/png',size:1000})
 assert.equal(result.src,'data:image/webp;base64,d2VicA==')
 assert.equal(result.originalBytes,1000)
 assert.equal(result.optimizedBytes,4)
 assert.ok(drawn)
 assert.equal(closed,1)
 encodedType='image/png'
 await assert.rejects(optimizeImage({name:'photo.png',type:'image/png',size:1000}),/cannot create WebP/)
 assert.equal(closed,2,'Bitmap must be released on encoder failure')
 await assert.rejects(optimizeImage({name:'huge.png',type:'image/png',size:9*1024*1024}),/8 MB/)
 await assert.rejects(optimizeImage({name:'file.txt',type:'text/plain',size:10}),/Choose a/)
 console.log('Image optimization: proportional resizing, no upscaling, alpha, orientation, WebP encoding, resource cleanup, and error handling passed.')
}
run().catch(error=>{console.error(error);process.exitCode=1})
