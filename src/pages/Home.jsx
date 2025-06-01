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
} from "lucide-react";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen bg-background text-foreground px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Stunning Resumes Effortlessly
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
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-blue-500 rounded-sm text-white">
              <FileText size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Multiple Templates</h4>
            <p className="text-muted-foreground">
              Choose from a variety of modern, creative, and professional
              templates.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-purple-500 rounded-sm text-white">
              <Bot size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">AI-Generated Summary</h4>
            <p className="text-muted-foreground">
              Let AI help you craft a compelling professional summary that
              stands out.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-green-500 rounded-sm text-white">
              <Download size={24} />
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
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-orange-500 rounded-sm text-white">
              <LayoutPanelLeft size={24} />
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
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-pink-500 rounded-sm text-white">
              <Palette size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Theme Color Options</h4>
            <p className="text-muted-foreground">
              Easily change the resume's color scheme to match your style or
              industry.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-indigo-500 rounded-sm text-white">
              <Monitor size={24} />
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
        <Button asChild size="lg" className="text-lg px-8 py-6">
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

const FeatureCard = ({ title, description, image }) => (
  <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
    <img src={image} alt={title} className="w-20 h-20 mx-auto mb-4" />
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Home;
