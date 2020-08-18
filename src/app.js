const express = require("express");
const cors = require("cors");
// const uuid = require('uuidv4')
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body

  const repo = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0 }
   
    repositories.push(repo)

   return response.json(repo)
 
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

 

  const repoIndex = repositories.findIndex(repo => id == repo.id)

  if (repoIndex < 0){
    return response.status(400).json({ error: "project not found"})
  }

  const {likes} = repositories[repoIndex]

  const newRepo = {
    title,
    url,
    techs
  }
  // console.log('repo', newRepo)
  repositories[repoIndex] = {
      id,
      title, 
      url, 
      techs, 
      likes
  }

  return response.json(repositories[repoIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id == id)

  if( repoIndex < 0) {
    return response.status(400).json({ error: "project not found"})
  }

  repositories.splice(repoIndex, 1) 

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
 
  const repoIndex = repositories.findIndex(repo => repo.id == id)
  
  if( repoIndex < 0) {
    return response.status(400).json({ error: "project not found"})
  }
  repositories[repoIndex].likes += 1
  const newRepo = repositories[repoIndex]
  
  repositories[repoIndex] = newRepo


  return response.json(newRepo)
});

module.exports = app;
