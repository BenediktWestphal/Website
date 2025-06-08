import React from 'react';

function HomePage() {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center my-8">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/600x300.png?text=Placeholder+Image"
            alt="Placeholder Hero Image"
            className="rounded-lg mb-6 w-full max-w-2xl"
          />
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            I am Iron Man
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Welcome to my portfolio. Explore my projects and get in touch!
          </p>
        </div>
      </section>

      {/* Other content can go here */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center mb-4">About This Site</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
          This is a sample application to demonstrate various web development techniques.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
