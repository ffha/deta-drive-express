import { Drive } from 'deta';
import express from 'express';
import cors from 'cors';
const app = express();
const drive = Drive('simple_drive');
const port = process.env.PORT || 8080;

app.use(cors())
app.get('/:file', async function(req, res){
    const buf = await (await drive.get(req.params.file)).arrayBuffer();
    const content = Buffer.from(buf)
    res.send(content)
})

app.post('/:file', async function(req, res){
 try {
    await drive.put(req.params.file, {
        data: req.body,
        contentType: req.headers['content-type']
      })
 } catch (error) {
    res.status(500).send(error)
 }
})

app.listen(port, () =>{
    console.log(`App is listening on port ${port}`)
})