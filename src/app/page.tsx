// "use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import HomePage from "@/containers/Home";

export default function Home({ ...props }) {
  console.log(props, "home");

  return <HomePage route={{ userIsAuth: true }} location={{ search: "" }} />;
}
