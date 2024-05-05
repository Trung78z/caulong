"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import "./Footer.scss";
import { usePathname } from "next/navigation";

export default function SimpleBottomNavigation() {
  const pathname = usePathname();
  return (
    pathname !== pathname.startsWith("/auth/") ||
    (pathname.startsWith("/giaoluu/") && (
      <div className="footer_container">
        <Box className="footer_box">
          <Grid container>
            <Grid lg={3} md={6} xs={12}>
              <div className="content">
                <h4>Contact</h4>
                <div className="content_url">
                  <p>
                    Find out all the ways to enjoy luxury residential life
                    around the world.
                  </p>
                  <p>A. SeeStrasse 21, Zurich, CH</p>
                  <p>M. +0 2256 035 34434</p>
                </div>
              </div>
            </Grid>
            <Grid lg={3} md={6} xs={12}>
              <div className="content">
                <h4>FAQs</h4>
                <div className="content_url">
                  <p>How long does the process take?</p>
                  <p>How long does the process take?</p>
                  <p>How long does the process take?</p>
                </div>
              </div>
            </Grid>
            <Grid lg={3} md={6} xs={12}>
              <div className="content">
                <h4>Useful Links</h4>
                <div className="content_url">
                  <p>Property</p> <p>Video Tour</p> <p>Blog</p>
                  <p>Terms of services</p>
                </div>
              </div>
            </Grid>
            <Grid lg={3} md={6} xs={12}>
              <div className="content">
                <h4>Contact</h4>
                <div className="content_url">
                  <p>
                    Find out all the ways to enjoy luxury residential life
                    around the world.
                  </p>
                  <p>A. SeeStrasse 21, Zurich, CH</p>
                  <p>M. +0 2256 035 34434</p>
                </div>
              </div>
            </Grid>
          </Grid>
          <hr />
          <p style={{ textAlign: "center" }}>
            &copy;
            {new Date().getFullYear()}.
            <span> All Rights For This Website Reserved.</span>
          </p>
        </Box>
      </div>
    ))
  );
}
