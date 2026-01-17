import express from 'express'

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/health', (request, response)=>{
  return response.status(200).send({status:"healthy"})
});

app.listen(PORT, ()=>{
  console.log(`Server listening on PORT ${PORT}`);
})