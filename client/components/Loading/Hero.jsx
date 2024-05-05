"use client";
import { Box, Card, CardContent, Grid } from "@mui/material";
import "./Hero.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function Hero() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://45.118.144.160:8080/posts").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "1080px",
        margin: "40px  auto",
      }}
    >
      <Grid container spacing={6} sx={{ padding: "0 10px" }}>
        {data.slice(0, 3).map((data, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Link href={`/giaoluu/${data.url}`}>
              <Card sx={{ position: "relative", height: "250px" }}>
                <CardContent>
                  <div className="content">
                    <Image src={data.image} alt="" fill={true} />
                    <p className="text-content">{data.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Hero;
