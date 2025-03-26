import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

// Mock course data
const courseModules = [
  {
    id: 1,
    title: "Getting Started",
    lessons: [
      { id: 1, title: "Introduction to the Course", duration: "5:20", completed: true },
      { id: 2, title: "Setting Up Your Environment", duration: "8:44", completed: true },
      { id: 3, title: "Understanding the Basics", duration: "10:15", completed: false },
    ]
  },
  {
    id: 2,
    title: "Core Concepts",
    lessons: [
      { id: 4, title: "Fundamental Principles", duration: "12:30", completed: false },
      { id: 5, title: "Building Blocks", duration: "9:15", completed: false },
      { id: 6, title: "Advanced Techniques", duration: "15:20", completed: false },
    ]
  },
  {
    id: 3,
    title: "Practical Applications",
    lessons: [
      { id: 7, title: "Real-world Examples", duration: "14:18", completed: false },
      { id: 8, title: "Case Studies", duration: "11:52", completed: false },
      { id: 9, title: "Project Implementation", duration: "18:40", completed: false },
    ]
  }
];

const CourseLearningPage = () => {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [progress, setProgress] = useState(8); // 8% initial progress (2 out of 35 lessons completed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check for screen size to set initial sidebar state
  useEffect(() => {
    const handleResize = () => {
      // On narrow screens, default to closed sidebar
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // For demo purposes, we'll allow access even when not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Demo Mode",
        description: "You're viewing the course in demo mode.",
      });
    }
  }, [isLoggedIn, toast]);

  // Get current lesson details
  const currentModule = courseModules.find(module => module.id === activeModuleId);
  const currentLesson = currentModule?.lessons.find(lesson => lesson.id === activeLessonId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course title and progress */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold">Web Development Fundamentals</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <span className="material-icons mr-1 text-sm">forum</span>
              Discussion
            </Button>
            <Button variant="outline" size="sm">
              <span className="material-icons mr-1 text-sm">help_outline</span>
              Help
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2" />
          <span className="text-sm font-medium">{progress}% complete</span>
        </div>
      </div>

      {/* Main learning interface with sidebar and content */}
      <div className="min-h-[500px]">
        <div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative"
          style={{ gridTemplateColumns: isSidebarOpen ? '1fr 3fr' : '0fr 1fr' }}
        >
          {/* Sidebar - Course Navigation */}
          <div
            className={`
              ${isSidebarOpen ? 'block' : 'hidden'} 
              lg:block
              fixed lg:static 
              z-20 
              top-0 bottom-0 left-0 right-0 
              bg-black/20 lg:bg-transparent
              lg:transition-all lg:duration-300
            `}
            onClick={(e) => {
              // Close sidebar when clicking overlay (mobile only)
              if (window.innerWidth < 1024 && e.target === e.currentTarget) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <div className={`
              h-full lg:h-auto
              max-w-xs w-4/5 lg:w-full lg:max-w-none
              ml-auto lg:ml-0
              bg-white 
              lg:sticky lg:top-24 
              border rounded-lg overflow-hidden shadow-sm
              transition-transform duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold">Course Content</h2>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700 lg:hidden"
                  aria-label="Close sidebar"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                {courseModules.map(module => (
                  <div key={module.id} className="border-b last:border-b-0">
                    <div 
                      className={`
                        p-4 font-medium cursor-pointer flex justify-between items-center
                        ${activeModuleId === module.id ? 'text-primary-600' : 'hover:bg-gray-50'}
                      `}
                      onClick={() => setActiveModuleId(moduleId => moduleId === module.id ? 0 : module.id)}
                    >
                      <span>{module.title}</span>
                      <span className="material-icons text-gray-400">
                        {activeModuleId === module.id ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>

                    {activeModuleId === module.id && (
                      <div className="ml-4 mt-1 space-y-1">
                        {module.lessons.map(lesson => (
                          <div 
                            key={lesson.id}
                            className={`p-2 text-sm rounded-md cursor-pointer flex items-center gap-2
                              ${activeLessonId === lesson.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}
                            `}
                            onClick={() => {
                              setActiveLessonId(lesson.id);
                              // Close sidebar on mobile when a lesson is selected
                              if (window.innerWidth < 1024) {
                                setIsSidebarOpen(false);
                              }
                            }}
                          >
                            {lesson.completed ? (
                              <span className="material-icons text-green-500 text-sm">check_circle</span>
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-gray-300"></span>
                            )}
                            <span className="flex-1 truncate">{lesson.title}</span>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar toggle button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`
              fixed lg:absolute 
              bottom-6 lg:bottom-auto
              left-6 lg:left-0
              z-10 
              bg-primary-600 lg:bg-primary-100 
              text-white lg:text-primary-600
              p-3 lg:p-2
              rounded-full lg:rounded-r-full lg:rounded-l-none
              shadow-lg
              transition-all
              ${isSidebarOpen ? 'lg:translate-x-full' : ''}
            `}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <span className="material-icons">
              {isSidebarOpen ? 'chevron_left' : 'menu'}
            </span>
          </button>

          {/* Main Content Area */}
          <div className="transition-all duration-300">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{currentLesson?.title}</h2>
                  <div className="text-sm text-gray-500">
                    Duration: {currentLesson?.duration}
                  </div>
                </div>

                {/* Video player placeholder */}
                <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <span className="material-icons text-gray-400 text-5xl">play_circle</span>
                </div>

                {/* Lesson content */}
                <div className="prose max-w-none">
                  <p>This is lesson content for {currentLesson?.title}. In this lesson, we'll explore the key concepts and practical applications.</p>

                  <h3>Key Concepts</h3>
                  <ul>
                    <li>Understanding the fundamental principles</li>
                    <li>Applying best practices in real-world scenarios</li>
                    <li>Optimizing performance and efficiency</li>
                  </ul>

                  <h3>Code Example</h3>
                  <pre className="bg-gray-50 p-4 rounded-md">
                    <code>
                      {`function example() {
  console.log("This is a sample code block");
  return true;
}`}
                    </code>
                  </pre>

                  <p>Let's analyze this code and understand how it works in different contexts.</p>
                </div>
              </CardContent>
            </Card>

            {/* Lesson navigation */}
            <div className="flex justify-between">
              <Button variant="outline" disabled={activeLessonId === 1}>
                <span className="material-icons mr-1">arrow_back</span>
                Previous Lesson
              </Button>
              <Button>
                Next Lesson
                <span className="material-icons ml-1">arrow_forward</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;