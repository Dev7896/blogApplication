import React from "react";
// import {star_icon} from '../assets' ;
import { Star } from "lucide-react";
import { TextField, Button } from "@mui/material";
import image from '../../assets/gradientBackground.png' ;


function HomeWrapperOne() {
  return (
    <section className=" w-full h-max mt-12  ">
      <section className="relative  ">
        <article className="flex px-6 py-2 rounded-full bg-blue-100 border-2 border-blue-400 gap-4 md:text-xl items-center mx-auto w-max text-blue-500">
          <p className="text-primary">New: AI feature integrated</p>
          <Star />
        </article>
        <p className="w-max mx-auto text-5xl md:text-7xl font-bold text-center mt-10 text-slate-700">
          Your own <span className="text-blue-600 capitalize">blogging</span> <br />
          platform.
        </p>
        <p className="text-center text-slate-400 text-xl md:w-2/3 mx-auto mt-12">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <div className="flex gap-4  mx-auto mt-12 md:mt-12 md:w-2/4">
          <TextField fullWidth variant="outlined" placeholder="Search For Blogs"  />
          <Button variant="contained">search</Button>
        </div>
      </section>
      <img  className='absolute md:top-0 top-24 opacity-50 -z-50' src={image} alt='background'>

      </img>

    </section>
  );
}

export default HomeWrapperOne;
