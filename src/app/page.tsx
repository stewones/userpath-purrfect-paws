import Image from "next/image";
import Link from "next/link";
import { Cat } from "@/lib/types";
import { fetchFeaturedCats } from "@/lib/cats";
import { FaHeart, FaHome, FaHandsHelping, FaArrowRight, FaStar, FaShieldAlt } from 'react-icons/fa';
import { HomeClient } from './home-client';

export default async function Home() {
  const featuredCats = await fetchFeaturedCats();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/50 via-pink-50/30 to-orange-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="heading-font text-5xl md:text-7xl font-bold text-gray-900 text-balance leading-tight">
                Find Your
                <span className="text-orange-500"> Purrfect </span>
                Companion
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover adorable cats and kittens looking for their forever homes. 
                Each one is waiting to fill your life with love and purrs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cats"
                  className="btn-primary text-center inline-flex items-center justify-center space-x-2"
                >
                  <span>Browse All Cats</span>
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  href="/about"
                  className="btn-secondary text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-full shadow-soft-lg overflow-hidden">
                <Image
                  src="https://cataas.com/cat?width=500&height=500"
                  alt="Happy cat"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-3xl font-semibold shadow-soft transform rotate-12 flex items-center space-x-2">
                <FaStar className="text-sm" />
                <span>New Arrivals!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cats Section */}
      <section className="py-32 bg-gray-50/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="heading-font text-4xl md:text-5xl font-bold text-gray-900 text-balance">
              Featured Friends
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet some of our special cats who are ready to bring joy to your home
            </p>
          </div>

          <HomeClient featuredCats={featuredCats} />

          <div className="text-center mt-16">
            <Link
              href="/cats"
              className="inline-flex items-center space-x-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors text-lg"
            >
              <span>View All Available Cats</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="heading-font text-4xl md:text-5xl font-bold text-gray-900 text-balance">
              Why Choose Purrfect Paws?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FaShieldAlt,
                title: 'Health Guaranteed',
                description: 'All our cats are fully vaccinated, health-checked, and come with medical records.'
              },
              {
                icon: FaHeart,
                title: 'Perfect Matching',
                description: 'We help you find the perfect companion based on your lifestyle and preferences.'
              },
              {
                icon: FaHandsHelping,
                title: 'Ongoing Support',
                description: 'Lifetime support and advice to ensure a happy home for you and your new friend.'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 bg-orange-100 rounded-3xl">
                      <IconComponent className="text-3xl text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="heading-font text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Meet Your New Best Friend?
          </h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Start your journey to finding the perfect feline companion today
          </p>
          <Link
            href="/cats"
            className="inline-flex items-center space-x-2 bg-white text-orange-500 px-8 py-4 rounded-3xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-soft-lg"
          >
            <span>Start Your Journey</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
}
