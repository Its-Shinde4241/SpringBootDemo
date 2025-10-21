import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  }

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/jobPosts`, {
        auth: {
          username: "shubham",
          password: "shinde"
        }
      });
      setPosts(response.data);
    }
    fetchInitialPosts();
  }, []);

  const handleDelete = (id) => {
    async function deletePost() {
      await axios.delete(`http://localhost:8080/jobPost/${id}`, {
        auth: {
          username: "shubham",
          password: "shinde"
        }
      });
      setPosts(response.data);
    }
    deletePost();
    window.location.reload();
  }

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
        <Grid item xs={12} sx={12} md={12} lg={12}>
        </Grid>
        {posts &&
          posts.map((post) => {
            return (
              <Grid key={post.postId} item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor: "#ADD8E6" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "2rem", fontWeight: "600", fontFamily: "sans-serif" }}
                  >
                    {post.postProfile}
                  </Typography>
                  <Typography sx={{ color: "#585858", marginTop: "2%", fontFamily: "cursive" }} variant="body" >
                    Description: {post.postDesc}
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="h6" sx={{ fontFamily: "unset", fontSize: "400" }}>
                    Experience: {post.reqExperience} years
                  </Typography>
                  <Typography sx={{ fontFamily: "serif", fontSize: "400" }} gutterBottom variant="body">Skills : </Typography>
                  {post.postTechStack.map((s, i) => {
                    return (
                      <Typography variant="body" gutterBottom key={i}>
                        {s} .
                        {` `}
                      </Typography>
                    );
                  })}
                  <DeleteIcon onClick={() => handleDelete(post.postId)} />
                  <EditIcon onClick={() => handleEdit(post.postId)} />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>

  )
}

export default Search