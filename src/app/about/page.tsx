'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaHome, FaStar, FaArrowRight, FaClipboardList, FaHandshake, FaUsers } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/50 via-pink-50/30 to-orange-50/50 py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h1 className="heading-font text-5xl md:text-7xl font-bold text-gray-900 text-balance">
            Our Mission: Every Cat Deserves Love
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At Purrfect Paws, we're dedicated to connecting loving families with cats in need of forever homes.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32" data-section="story">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="heading-font text-4xl font-bold text-gray-900">
                How It All Started
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2018 by cat lover Sarah Mitchell, Purrfect Paws began as a small rescue operation 
                  in her apartment. After volunteering at local shelters for years, Sarah realized there was 
                  a need for a more personalized approach to cat adoption.
                </p>
                <p>
                  What started with helping just a few cats find homes has grown into a thriving organization 
                  that has facilitated over 2,500 successful adoptions. We work with local shelters, veterinarians, 
                  and foster families to ensure every cat receives the care and attention they deserve.
                </p>
                <p>
                  Our unique approach focuses on personality matching - we believe the right cat for the right 
                  family creates bonds that last a lifetime.
                </p>
              </div>
              <button
                className="inline-flex items-center space-x-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors text-lg"
                data-action="read-story"
                data-content-type="story"
              >
                <span>Read Our Full Story</span>
                <FaArrowRight className="text-sm" />
              </button>
            </div>
            <div className="relative">
              <Image
                src="https://cataas.com/cat?width=600&height=400"
                alt="Sarah with rescued cats"
                width={600}
                height={400}
                className="rounded-3xl shadow-soft-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-3xl shadow-soft-lg">
                <div className="text-3xl font-bold">2,500+</div>
                <div className="text-sm opacity-90">Happy Adoptions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gray-50/90" data-section="values">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="heading-font text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              Everything we do is guided by these principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FaHeart,
                title: 'Compassionate Care',
                description: 'Every cat receives individualized attention, medical care, and socialization to prepare them for their forever home.',
                id: 'compassion'
              },
              {
                icon: FaHome,
                title: 'Perfect Matches',
                description: 'We take time to understand both our cats and families to create lasting, happy relationships.',
                id: 'matching'
              },
              {
                icon: FaStar,
                title: 'Lifelong Support',
                description: 'Our commitment doesn\'t end at adoption. We provide ongoing support and resources for all our families.',
                id: 'support'
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={value.id} 
                  className="card p-10 text-center space-y-6 hover:shadow-soft-lg transition-all duration-300"
                  data-value={value.id}
                >
                  <div className="flex justify-center">
                    <div className="p-6 bg-orange-100 rounded-3xl">
                      <IconComponent className="text-3xl text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32" data-section="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="heading-font text-4xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind Purrfect Paws
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Founder & Director',
                image: 'https://cataas.com/cat?width=300&height=300&t=301',
                bio: 'Cat lover and rescue advocate with 15+ years of experience.',
                id: 'sarah'
              },
              {
                name: 'Dr. Emily Chen',
                role: 'Veterinary Consultant',
                image: 'https://cataas.com/cat?width=300&height=300&t=302',
                bio: 'Ensures all our cats receive the best medical care and health screenings.',
                id: 'emily'
              },
              {
                name: 'Mike Rodriguez',
                role: 'Adoption Coordinator',
                image: 'https://cataas.com/cat?width=300&height=300&t=303',
                bio: 'Specializes in matching families with their perfect feline companions.',
                id: 'mike'
              }
            ].map((member) => (
              <div 
                key={member.id} 
                className="card p-8 text-center space-y-6 hover:shadow-soft-lg transition-all duration-300"
                data-team-member={member.id}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-soft"
                />
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-orange-500 font-medium text-lg">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 bg-gradient-to-r from-orange-500 to-orange-600 text-white" data-section="stats">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="heading-font text-4xl font-bold">
              Our Impact
            </h2>
            <p className="text-xl opacity-90">
              Numbers that show our commitment to feline welfare
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: '2,500+', label: 'Successful Adoptions', id: 'adoptions' },
              { number: '150+', label: 'Volunteer Hours/Month', id: 'volunteers' },
              { number: '98%', label: 'Adoption Success Rate', id: 'success-rate' },
              { number: '24/7', label: 'Emergency Support', id: 'support-hours' }
            ].map((stat) => (
              <div key={stat.id} data-statistic={stat.id} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                <div className="text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gray-50/90" data-section="cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="heading-font text-4xl font-bold text-gray-900">
              Ready to Find Your Purrfect Match?
            </h2>
            <p className="text-xl text-gray-600">
              Browse our available cats or learn more about the adoption process
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cats"
              className="btn-primary"
              data-cta="browse-cats"
              data-action="primary"
            >
              Browse Available Cats
            </Link>
            <button
              className="btn-secondary"
              data-cta="learn-more"
              data-action="secondary"
            >
              Learn About Adoption
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="card p-8 space-y-4" data-info-card="process">
              <div className="flex justify-center lg:justify-start">
                <div className="p-4 bg-orange-100 rounded-2xl">
                  <FaClipboardList className="text-2xl text-orange-500" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Simple Process</h3>
              <p className="text-gray-600">
                Our streamlined adoption process makes finding your new companion easy and stress-free.
              </p>
            </div>
            <div className="card p-8 space-y-4" data-info-card="support">
              <div className="flex justify-center lg:justify-start">
                <div className="p-4 bg-orange-100 rounded-2xl">
                  <FaHandshake className="text-2xl text-orange-500" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Ongoing Support</h3>
              <p className="text-gray-600">
                We're here to help before, during, and after adoption with resources and guidance.
              </p>
            </div>
            <div className="card p-8 space-y-4" data-info-card="community">
              <div className="flex justify-center lg:justify-start">
                <div className="p-4 bg-orange-100 rounded-2xl">
                  <FaUsers className="text-2xl text-orange-500" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Join Our Community</h3>
              <p className="text-gray-600">
                Become part of our extended family of cat lovers and adoption advocates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 