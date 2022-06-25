import React, { Component, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import CreatePost from "./CreatePost";
import CardActions from '@mui/material/CardActions';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import {Grid} from "@mui/material";
import { CardMedia } from "@mui/material";
import {List, ListItem}  from "@mui/material";
import CustomizedDialogs from "./PostDialog";



const SingleRestaurant = () => {
  const { businesses: restaurants } = useSelector(
    ({ restaurants }) => restaurants
  );
  const posts = useSelector(({ posts }) => posts);
  const auth = useSelector(({ auth }) => auth.username);

  const { alias } = useParams();

  if (!restaurants || !posts) {
    return null;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurant = restaurants.filter((place) => place.alias === alias)[0];
  const specificPosts = posts.filter(
    (post) => post.restaurantName === restaurant.alias
  );

  const [open, setOpen] = React.useState(false)

  return (

    <div className="singlerestpage" style={{ marginTop: "100px" }}>
      <AnimatedPage>
       
        <Link className="backlink" to="/">
          <i className="backlink" class="fa-solid fa-circle-arrow-left fa-2x"></i>{" "}
        </Link>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          >
        <Grid 
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          >
        <CustomizedDialogs open={open} setOpen={setOpen} >
          <CreatePost restaurant={restaurant} open={open} setOpen={setOpen}/>
        </CustomizedDialogs>
        </Grid >
        <Grid 
          container spacing={11}
          direction="row"
          justifyContent="center"
          alignItems="center"
          >
        <Grid item s={4}>
        <Card sx={{ ml: 1, borderRadius: 10, boxShadow: 3, variant: "outlined" }}>
        <CardHeader sx={{ m: 3, fontStyle: 'bold'}} style={{ textAlign: 'center'}} 
          titleTypographyProps={{variant:'h3'}}
          title= {restaurant.name}
        />
        <CardMedia 
        sx={{ borderRadius: 100 , mb: 7}}
        component="img"
        image={restaurant.image_url}
        id="singleImage" 
         />
         <Typography
           sx={{ p: 2, m: 3, textAlign: "center" }}
           variant="body1"
           color="text.secondary"
         >
        <div className="info">
        <span> <i class="fa-solid fa-magnifying-glass-dollar fa-1x"></i> {restaurant.price} </span>
        <span> <i class="fa-solid fa-map-location-dot fa-1x"></i> {restaurant.location["display_address"][0]}
        &nbsp;
        {restaurant.location["display_address"][1]}</span>
        </div>
        </Typography>

        </Card>
        </Grid>
        <Grid item xs={5}>
        <List>
          {specificPosts.map((post) => {
            return (
            <ListItem>
              <Card
                sx={{ borderRadius: 10, maxWidth: 600, maxHeight: 275, m: 2, boxShadow: 3, variant: "outlined" }}
              >
                <CardHeader
                  sx={{ mb: -1 }}
                  style={{ backgroundColor: "#b3e5fc" }}
                  avatar={<Avatar sx={{ bgcolor: "#009688" }}>C</Avatar>}
                  titleTypographyProps={{variant:'h5', fontStyle: 'oblique'}}
                  title={post.title}
                  subheader={post.createdAt.slice(0, 10)}

                />
                <CardContent>
                  <div key={post.id}>
                    {/* <Typography
                      sx={{ mb: -2, ml: 2, mt: -3, fontStyle: "oblique" }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      <h4> {post.title} </h4>
                    </Typography> */}
                    <Typography sx={{ m: 1, ml: 2 }} variant="subtitle2">
                      <div>
                        <i class="fa-solid fa-location-dot"></i> {post.restaurantName}
                      </div>
                      <div>
                        <i class="fa-solid fa-wifi"></i> {post.wifi}
                      </div>
                    </Typography>
                    <Typography
                      sx={{ p: 2 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      <div> {post.review} </div>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              </ListItem>
            );
          })}
        </List>
        </Grid>
        </Grid>
        </Grid>
      </AnimatedPage>

    </div>
  );
};

export default SingleRestaurant;
