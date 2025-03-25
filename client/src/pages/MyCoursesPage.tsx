
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "wouter";

const MyCoursesPage = () => {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to auth page if not logged in
  if (!isLoggedIn) {
    navigate("/auth");
    return null;
  }

  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Sarah Johnson",
      imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      progress: 65,
      nextLesson: "CSS Flexbox Layout",
    },
    {
      id: 2,
      title: "Data Science Essentials",
      instructor: "Michael Chen",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      progress: 32,
      nextLesson: "Introduction to Pandas",
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      instructor: "Jessica Williams",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
      progress: 78,
      nextLesson: "Building Custom Components",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
      
      {enrolledCourses.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl text-gray-700 mb-4">You haven't enrolled in any courses yet.</h2>
          <Button asChild>
            <Link href="/">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">Instructor: {course.instructor}</p>
                
                <div className="mt-3 mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <div className="mt-3 text-sm text-gray-700">
                  <span className="font-medium">Next Lesson:</span> {course.nextLesson}
                </div>
                
                <div className="mt-auto pt-4">
                  <Button className="w-full">Continue Learning</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
