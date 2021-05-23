const express = require('express')
const fs = require('fs')
const app = express()
const port = 3055
const filePath1 = '/Users/bytedance/Desktop/flowPdf.pdf'
const filePath2 = '/Users/bytedance/Desktop/flowPdf.pdf'

const readUserAsync = ()=>{

    fs.readFile(filePath1, (err, content) => {
        if (err){} // handle error
            // otherwise do something with the content
    })

    fs.readFile(filePath2, (err, content) => { /* same story */ })

    console.log('Will happen before any of the reads is finished')
}
const readUserSync = ()=>{
    fs.readFileSync(filePath1)
    fs.readFileSync(filePath2)
    console.log('Logging after both reads are finished')
}
app.get('/async', async (req, res) => {
    const user = await readUserAsync()
    res.send(user)
})

app.get('/sync', (req, res) => {
    const user = readUserSync()
    res.send(user)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))