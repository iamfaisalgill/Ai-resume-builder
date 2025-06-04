import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import halley_template from "../assets/halley.png";
import iconic_template from "../assets/iconic.png";
import stalwart_template from "../assets/stalwart.png";
import {
  FileText,
  Bot,
  Download,
  LayoutPanelLeft,
  Palette,
  Monitor,
  CircleUserRound,
  Brush,
  HardDriveDownload,
} from "lucide-react";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-background px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Stunning Resumes <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Choose a template, customize it with smart features, and download a
            professional resume in minutes.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/resumebuild">Start Building</Link>
          </Button>
        </div>

        

        {/* <div className="mt-12 w-full max-w-5xl"> */}
        <Marquee autoFill className="mt-8 py-7">
          <img
            src={halley_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-md w-[250px] mx-5"
          />
          <img
            src={iconic_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-[250px] mx-5"
          />
          <img
            src={stalwart_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-[250px] mx-5"
          />
          <img
            src={halley_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-[250px] mx-5"
          />
          <img
            src={iconic_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-[250px] mx-5"
          />
          <img
            src={stalwart_template}
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-[250px] mx-5"
          />
        </Marquee>

        {/* </div> */}
      </section>

      {/* How it works */}
      <section class="px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center relative mb-16 pb-[15px] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80px] after:h-[4px] after:bg-primary after:rounded-[4px]">
          How It Works
        </h2>

        <div class="flex justify-between mb-[60px] flex-wrap gap-[20px] max-w-6xl mx-auto">
          <div class="flex-1 min-w-[250px] bg-card rounded-[16px] p-[30px] text-center shadow-md transition-all duration-300 relative border border-border">
            <div class="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-sm">
              1
            </div>
            <div class="flex justify-center my-5">
              {/* <CircleUserRound class="w-[40px] h-[40px] text-primary mb-[20px]" /> */}
              <svg
                className="text-primary size-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8 .4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                />
              </svg>
            </div>
            <h3 class="text-[20px] font-semibold mb-[10px]">
              Fill Your Details
            </h3>
            <p class="text-muted-foreground text-[15px]">
              Enter your personal information, work experience, education, and
              skills in our user-friendly form.
            </p>
          </div>

          <div class="flex-1 min-w-[250px] bg-card rounded-[16px] p-[30px] text-center shadow-md transition-all duration-300 relative border border-border">
            <div class="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-sm">
              2
            </div>
            <div class="flex justify-center my-5">
              {/* <Brush class="w-[40px] h-[40px] text-primary mb-[20px]" /> */}
              <svg
                className="text-primary size-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448L64 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"
                />
              </svg>
            </div>
            <h3 class="text-[20px] font-semibold mb-[10px]">
              Choose a Template
            </h3>
            <p class="text-muted-foreground text-[15px]">
              Select from our professionally designed templates and customize
              colors to match your style.
            </p>
          </div>

          <div class="flex-1 min-w-[250px] bg-card rounded-[16px] p-[30px] text-center shadow-md transition-all duration-300 relative border border-border">
            <div class="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-sm">
              3
            </div>
            <div class="flex justify-center my-5">
              {/* <HardDriveDownload class="w-[40px] h-[40px] text-primary mb-[20px]" /> */}
              <svg
                className="text-primary size-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                />
              </svg>
            </div>
            <h3 class="text-[20px] font-semibold mb-[10px]">
              Download &amp; Share
            </h3>
            <p class="text-muted-foreground text-[15px]">
              Get your resume as a PDF file ready to share with potential
              employers.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Packed With Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to craft the perfect resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-blue-500/20 rounded-sm text-white">
              <FileText size={24} className="text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Multiple Templates</h4>
            <p className="text-muted-foreground">
              Choose from a variety of modern, creative, and professional
              templates.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-purple-500/20 rounded-sm text-white">
              <Bot size={24} className="text-purple-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">AI-Generated Summary</h4>
            <p className="text-muted-foreground">
              Let AI help you craft a compelling professional summary that
              stands out.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-green-500/20 rounded-sm text-white">
              <Download size={24} className="text-green-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Download as Editable PDF
            </h4>
            <p className="text-muted-foreground">
              Export your resume in high-quality, editable PDF format — ready
              for submission.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-orange-500/20 rounded-sm text-white">
              <LayoutPanelLeft size={24} className="text-orange-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Customizable Sections
            </h4>
            <p className="text-muted-foreground">
              Add or remove sections like Projects, Certifications, or
              References as needed.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-pink-500/20 rounded-sm text-white">
              <Palette size={24} className="text-pink-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Theme Color Options</h4>
            <p className="text-muted-foreground">
              Easily change the resume's color scheme to match your style or
              industry.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-indigo-500/20 rounded-sm text-white">
              <Monitor size={24} className="text-indigo-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Live Preview</h4>
            <p className="text-muted-foreground">
              See updates in real-time as you customize your resume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Build a Resume That Gets You Hired
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Join hundreds of users who have landed interviews using our powerful
          and easy-to-use builder.
        </p>
        <Button asChild size="lg" variant={'outline'} className="text-lg px-8 py-6">
          <Link to="/resumebuild">Create Yours Now</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-[#27272a] text-gray-100 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold">ResumeBuilder</h3>
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/resumebuild" className="hover:underline">
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
