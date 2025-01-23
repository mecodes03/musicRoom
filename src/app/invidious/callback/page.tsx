"use client";

import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("invidious_token: ", token);
  }, []);

  return <div>gettting token.... or maybe we got it.</div>;
};

export default Page;
