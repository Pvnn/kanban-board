import express from 'express'
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
}))
const PORT = process.env.PORT || 5000;

app.get('/api/health', (request, response)=>{
  return response.status(200).send({status:"healthy"})
});

app.listen(PORT, ()=>{
  console.log(`Server listening on PORT ${PORT}`);
})