import { useState } from "react";
import { Link } from "wouter"; 
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import CategoryCard from "@/components/CategoryCard";
import TestimonialCard from "@/components/TestimonialCard";
import PaymentModal from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import { Course } from "@shared/schema";

const featuredCourses: Course[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript basics to build responsive websites from scratch.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.5,
    ratingCount: 256,
    isPopular: true,
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning with Python libraries.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.0,
    ratingCount: 189,
    isPopular: false,
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Learn user-centered design processes and create stunning interfaces that users love.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "All levels",
    rating: 5.0,
    ratingCount: 312,
    isPopular: false,
  }
];

const categories = [
  { icon: "code", title: "Programming", courseCount: 42 },
  { icon: "brush", title: "Design", courseCount: 38 },
  { icon: "analytics", title: "Data Science", courseCount: 29 },
  { icon: "business", title: "Business", courseCount: 51 },
  { icon: "photo_camera", title: "Photography", courseCount: 24 },
  { icon: "music_note", title: "Music", courseCount: 36 }
];

const testimonials = [
  {
    rating: 5,
    text: "The Web Development course completely changed my career trajectory. I went from knowing nothing about coding to landing a junior developer position in just 3 months!",
    name: "Sarah J.",
    role: "Web Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    rating: 5,
    text: "The Data Science course was challenging but incredibly rewarding. The instructor was knowledgeable and the projects were practical. Worth every penny!",
    name: "Michael T.",
    role: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    rating: 4.5,
    text: "As a UX designer with 5+ years experience, I was skeptical about what I'd learn, but the UX/UI course provided fresh perspectives and advanced techniques I hadn't considered.",
    name: "Priya K.",
    role: "Senior UX Designer",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  }
];

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnroll = (courseId: number) => {
    const course = featuredCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setPaymentModalOpen(true);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn Skills for Your Future
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access high-quality courses taught by industry experts and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-16 container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Courses
          </h2>
          <p className="text-gray-600">
            Explore our most popular learning opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEnroll={handleEnroll} 
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline">View All Courses</Button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Explore by Category
            </h2>
            <p className="text-gray-600">
              Find the perfect course in your area of interest
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                courseCount={category.courseCount}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What Our Students Say
          </h2>
          <p className="text-gray-600">Join thousands of satisfied learners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              text={testimonial.text}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-primary-100 mb-8">
              Join our community of learners and unlock your potential today.
            </p>
            <Button
              className="bg-white text-primary-600 hover:bg-primary-50"
              size="lg"
              asChild
            >
              <Link href="/auth">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default HomePage;
