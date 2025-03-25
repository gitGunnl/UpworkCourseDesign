import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@shared/schema";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/context/AuthContext";

const MyCoursesPage = () => {
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  
  // Mock user ID for demonstration
  const userId = 1;

  // Query to fetch enrolled courses
  const { data: enrolledCourses, isLoading, error } = useQuery({
    queryKey: ['/api/users', userId, 'enrollments'],
    queryFn: async () => {
      // If not logged in, return empty array
      if (!isLoggedIn) return [];
      
      const response = await fetch(`/api/users/${userId}/enrollments`);
      if (!response.ok) {
        throw new Error('Failed to fetch enrolled courses');
      }
      return response.json() as Promise<Course[]>;
    },
    enabled: isLoggedIn
  });

  // Dummy courses for demonstration (when there's no backend data yet)
  const dummyEnrolledCourses: Course[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics to build responsive websites from scratch.",
      price: "49.99",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "8 weeks",
      level: "Beginner",
      rating: "4.5",
      ratingCount: 256,
      isPopular: true,
    },
    {
      id: 2,
      title: "Data Science with Python",
      description: "Master data analysis, visualization, and machine learning with Python libraries.",
      price: "69.99",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "12 weeks",
      level: "Intermediate",
      rating: "4.0",
      ratingCount: 189,
      isPopular: false,
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      description: "Learn user-centered design processes and create stunning interfaces that users love.",
      price: "59.99",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "10 weeks",
      level: "All levels",
      rating: "5.0",
      ratingCount: 312,
      isPopular: false,
    }
  ];

  // Handle course continuation (for demonstration purposes)
  const handleContinue = (courseId: number) => {
    toast({
      title: "Course Continued",
      description: `You're continuing course #${courseId}`,
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        <p className="text-xl">Please log in to view your enrolled courses.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading courses. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Use either real data or dummy data */}
          {(enrolledCourses?.length ? enrolledCourses : dummyEnrolledCourses).map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEnroll={() => handleContinue(course.id)} 
            />
          ))}
        </div>
      )}
      
      {enrolledCourses && enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">You haven't enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;