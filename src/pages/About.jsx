import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-8 px-6 bg-gray-50">
      <Helmet>
        <title>About Us - Medi'Blogs</title>
        <meta name="description" content="Join our platform to create, share, and connect with other bloggers." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-left text-gray-800 mb-6">About Us</h1>

        <p className="text-xl text-gray-700 mb-6">
          Welcome to <strong>Medi'Blogs</strong> — a community-driven platform for writers, bloggers, and creators. Our mission is simple: provide a space where everyone can express their ideas, share stories, and inspire others. Whether you’re an experienced blogger or just starting out, this is your platform to grow.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 flex flex-col gap-y-2">
          <li><strong>Freedom to Create:</strong> Write about anything that inspires you, from lifestyle to technology.</li>
          <li><strong>Easy-to-Use Platform:</strong> Our intuitive editor and customizable themes let you focus on what matters most — your content.</li>
          <li><strong>Build Your Audience:</strong> Engage with readers, share your posts on social media, and grow your blog.</li>
          <li><strong>Monetize Your Passion:</strong> Take advantage of affiliate programs and sponsored posts to earn from your blog.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 mb-6  flex flex-col gap-y-2">
          <li>Sign up and create your profile.</li>
          <li>Write and publish your first blog post.</li>
          <li>Share it with the world and start building your audience.</li>
          <li>Engage with fellow bloggers and readers.</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">Join Us Today</h2>
        <p className="text-lg text-gray-700 mb-6">
          Ready to share your thoughts with the world? Sign up today and start publishing your blog posts. The world is waiting to hear your voice!
        </p>

        <div className="text-left">
            <Link to='/signup'>
            <button className="bg-text-purple hover:bg-text-purple/50 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Get Started
          </button>
            </Link>
       
        </div>
      </div>
    </div>
  );
};

export default About;
