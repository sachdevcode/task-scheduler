import http from 'http';
import app from './app';
import mongoose from 'mongoose';

const server = http.createServer(app);
const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI!).then(()=> {
    server.listen(port,()=> {
        console.log(`server is listening on port ${port}`);
    });
}).catch((err)=> {
    console.log(`could not connect to db due to ${err}`);
    process.exit(1);
})