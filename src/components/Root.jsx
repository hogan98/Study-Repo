import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import NavigationBar from "./NavigationBar";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Contact from "./Pages/Contact";
import NoMatch from "./Pages/NoMatch";

export default function Root() {
  return (
    <Router>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:id" element={<BlogPost />} />
            <Route exact path="*" element={<NoMatch />} />

            {/* <About /> */}
            {/* </Route> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
