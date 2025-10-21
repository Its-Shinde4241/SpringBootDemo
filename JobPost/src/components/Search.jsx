import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    Card,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate("/edit", { state: { id } });
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            alert('Please enter a search keyword');
            return;
        }

        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`http://localhost:8080/jobPosts/keyword/${keyword}`, {
                auth: {
                    username: "shubham",
                    password: "shinde"
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error searching posts:', error);
            alert('Error searching posts. Please try again.');
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/jobPost/${id}`, {
                auth: {
                    username: "shubham",
                    password: "shinde"
                }
            });
            // Remove the deleted post from the current results
            setPosts(posts.filter(p => p.postId !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post. Please try again.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <Box sx={{ margin: "2%", display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Search by keyword"
                    variant="outlined"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter keyword to search job posts..."
                    sx={{
                        maxWidth: '600px',
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading}
                    startIcon={<SearchIcon />}
                    sx={{ minWidth: '120px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Search'}
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ margin: "2%" }}>
                {loading && (
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: 'white' }} />
                    </Grid>
                )}

                {!loading && searched && posts.length === 0 && (
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            No job posts found for "{keyword}"
                        </Typography>
                    </Grid>
                )}

                {!loading && posts.length > 0 &&
                    posts.map((p) => {
                        return (
                            <Grid key={p.postId} item xs={12} md={6} lg={4}>
                                <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor: "#ADD8E6" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: "2rem", fontWeight: "600", fontFamily: "sans-serif" }}
                                    >
                                        {p.postProfile}
                                    </Typography>
                                    <Typography sx={{ color: "#585858", marginTop: "2%", fontFamily: "cursive" }} variant="body">
                                        Description: {p.postDesc}
                                    </Typography>
                                    <br />
                                    <br />
                                    <Typography variant="h6" sx={{ fontFamily: "unset", fontSize: "400" }}>
                                        Experience: {p.reqExperience} years
                                    </Typography>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "400" }} gutterBottom variant="body">
                                        Skills:
                                    </Typography>
                                    {p.postTechStack && p.postTechStack.map((s, i) => {
                                        return (
                                            <Typography variant="body" gutterBottom key={i}>
                                                {s}.
                                                {` `}
                                            </Typography>
                                        );
                                    })}
                                    <br />
                                    <DeleteIcon
                                        onClick={() => handleDelete(p.postId)}
                                        sx={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                    <EditIcon
                                        onClick={() => handleEdit(p.postId)}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    );
};

export default Search;