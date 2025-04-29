import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import back from "../assets/back.avif";
import mens from "../assets/mensCollection.webp";
import womens from "../assets/womensCollection.png";
import kids from "../assets/kidsCollection.webp";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16">
        <img
          src={back}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Container>
          <div className="text-center h-[60vh] relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Lucky Footwear
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Wear your Luck
            </p>
            <Link
              to="/sale"
              className="bg-primary text-primary-content px-8 py-3 rounded-md hover:bg-primary-focus transition"
            >
              Shop Now
            </Link>
          </div>
        </Container>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-surface-900 text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/men" className="group">
              <div className="relative h-96 bg-surface-200 rounded-lg overflow-hidden">
                <img
                  src={mens}
                  alt="Mens Colllection Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  <span className="text-2xl font-bold group-hover:text-primary-content ">
                    Men
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/women" className="group">
              <div className="relative h-96 bg-surface-200 rounded-lg overflow-hidden">
                <img
                  src={womens}
                  alt="Womens Colllection Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  <span className="text-2xl font-bold group-hover:text-primary-content ">
                    Women
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/kids" className="group">
              <div className="relative h-96 bg-surface-200 rounded-lg overflow-hidden">
                <img
                  src={kids}
                  alt="Kids Colllection Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  <span className="text-2xl font-bold group-hover:text-primary-content ">
                    Kids
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>

      {/* Featured Section */}
      <div className="bg-surface-100 py-16">
        <Container>
          <h2 className="text-3xl font-bold text-surface-900 text-center mb-12">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-primary-content rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-surface-200"></div>
                <div className="p-4 bg-secondary-content">
                  <h3 className="text-lg font-semibold text-primary">
                    Product Name
                  </h3>
                  <p className="text-primary">$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
