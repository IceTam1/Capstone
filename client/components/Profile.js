import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Posts from "./Posts";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AnimatedPage from "./AnimatedPage";

const Profile = () => {
  const auth = useSelector(({ auth }) => auth);
  console.log("this is auth id", auth.id);
  const posts = useSelector(({ posts }) => {
    return posts.filter((post) => post.userId === auth.id);
  });
  console.log("this is posts on profile", posts);
  const [data, setData] = useState({});

  if (!posts) {
    return null;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${auth.city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
      await axios.get(url).then((response) => {
        setData(response.data);
      });
    };
    fetchData();
  }, []);

  let today = new Date();
  let time = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let hours = today.getHours();
  let month = today.getMonth();
  let day = today.getUTCDate();
  let year = today.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const displayGreeting = () => {
    if (hours < 11) {
      return "Good morning";
    }
    if (hours > 17) {
      return "Good evening";
    } else {
      return "Good afternoon";
    }
  };
  return (
    <div style={{ marginTop: "90px" }}>
      <AnimatedPage>
        <div className="greeting">
          {auth.username === "cody" || auth.username === "murphy" ? (
            <img
              alt={`${auth.username}`}
              src={`./photos/${auth.username}.jpeg`}
              sx={{ width: 350, height: 350 }}
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "#37515F" }}
              alt={`${auth.username}`}
              sx={{ width: 350, height: 350 }}
              variant="rounded"
            />
          )}
          <p>Welcome, {auth.username},</p>
          <p>
            {months[month]} {day}, {year}
          </p>
          <p>
            {displayGreeting()}, {auth.username.toUpperCase()}
          </p>
          <p>{time}</p>
        </div>
        <div className="weather">
          <p>
            Weather in {auth.city}, {auth.state}:
          </p>
          <p>{data.main ? <span>{data.main.temp.toFixed()}°F</span> : null}</p>
          <div>
            <p>{data.weather ? <span>{data.weather[0].main}</span> : null}</p>
          </div>
        </div>

        <h2>My Reviews</h2>
        <div>
          {posts.map((post) => {
            return (
              <Card
                sx={{
                  maxWidth: 800,
                  p: 3,
                  m: 2,
                  boxShadow: 3,
                  variant: "outlined",
                }}
              >
                <div>
                  <div>
                    <Link to={`/posts/${post.id}`}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </div>
                  <CardContent>
                    <Typography
                      sx={{ mb: -2, ml: 2, mt: -3, fontStyle: "oblique" }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      <h4> {post.title} </h4>
                    </Typography>

                    <Typography sx={{ mb: 0, ml: 2 }} variant="subtitle2">
                      <div>
                        <i class="fa-solid fa-location-dot"></i> {post.location}
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
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Profile;
