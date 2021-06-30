import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: 250,
  },
});

const App = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      setPosts(res.data.data);
    };

    fetchUsers();
  }, [pageNumber]);

  console.log(posts);

  const apihandler = () => {
    setPageNumber(2);
  };
  const apihandlerprev = () => {
    setPageNumber(1);
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      {posts.map((post) => {
        return (
          <Card key={post.id} className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={post.avatar}
                title={post.first_name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h1'>
                  {post.first_name} {post.last_name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {post.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <br />
          </Card>
        );
      })}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <button onClick={apihandlerprev}>Prev Page</button>
        <button onClick={apihandler}>NextPage</button>
      </div>
    </div>
  );
};
export default App;
