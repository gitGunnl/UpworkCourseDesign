import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

// Course data (would typically come from an API)
const courseModules = [
  {
    id: 1,
    title: "Module 1: AI Fundamentals",
    lessons: [
      { id: 1, title: "Introduction to AI", duration: "15 min", completed: true },
      { id: 2, title: "History of AI Development", duration: "22 min", completed: true },
      { id: 3, title: "Types of AI Systems", duration: "18 min", completed: false },
      { id: 4, title: "Ethical Considerations in AI", duration: "25 min", completed: false },
    ]
  },
  {
    id: 2,
    title: "Module 2: Machine Learning Basics",
    lessons: [
      { id: 5, title: "Introduction to Machine Learning", duration: "20 min", completed: false },
      { id: 6, title: "Supervised Learning", duration: "28 min", completed: false },
      { id: 7, title: "Unsupervised Learning", duration: "25 min", completed: false },
      { id: 8, title: "Reinforcement Learning", duration: "30 min", completed: false },
    ]
  },
  {
    id: 3,
    title: "Module 3: Neural Networks",
    lessons: [
      { id: 9, title: "Neuron and Perceptron Models", duration: "23 min", completed: false },
      { id: 10, title: "Activation Functions", duration: "15 min", completed: false },
      { id: 11, title: "Feedforward Neural Networks", duration: "28 min", completed: false },
      { id: 12, title: "Backpropagation Algorithm", duration: "35 min", completed: false },
    ]
  },
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

  const handleComplete = () => {
    // Mark current lesson as completed
    const updatedModules = courseModules.map(module => {
      if (module.id === activeModuleId) {
        const updatedLessons = module.lessons.map(lesson => {
          if (lesson.id === activeLessonId) {
            return { ...lesson, completed: true };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });

    // Calculate new progress
    const totalLessons = updatedModules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = updatedModules.reduce(
      (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length, 
      0
    );
    const newProgress = Math.round((completedLessons / totalLessons) * 100);

    // Update state
    setProgress(newProgress);

    // Show success message
    toast({
      title: "Lesson Completed",
      description: "Moving to next lesson...",
    });

    // Move to next lesson if available
    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === activeLessonId) || 0;
    if (currentModule && currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      setActiveLessonId(currentModule.lessons[currentLessonIndex + 1].id);
    } else {
      // Move to next module if available
      const currentModuleIndex = courseModules.findIndex(m => m.id === activeModuleId);
      if (currentModuleIndex < courseModules.length - 1) {
        const nextModule = courseModules[currentModuleIndex + 1];
        setActiveModuleId(nextModule.id);
        setActiveLessonId(nextModule.lessons[0].id);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Course Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/course/ai" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
            <span className="material-icons text-sm">arrow_back</span>
            <span>Back to Course</span>
          </Link>
          <h1 className="text-2xl font-bold">Mastering Artificial Intelligence</h1>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm font-medium">{progress}% complete</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Sidebar toggle button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`
            fixed lg:absolute 
            top-28 z-30
            ${isSidebarOpen ? 'left-[270px]' : 'left-4'} 
            lg:left-0 lg:ml-2
            p-2 rounded-full 
            bg-white shadow 
            hover:bg-gray-100
            transition-all duration-300
          `}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span className="material-icons text-gray-700">
            {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>

        {/* Sidebar - Course Navigation */}
        <div 
          className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            lg:block
            fixed lg:static 
            z-20 
            top-0 bottom-0 left-0 right-0 
            bg-black/20 lg:bg-transparent
            transition-all duration-300
          `}
          style={{
            width: isSidebarOpen ? 'auto' : '0',
            flex: isSidebarOpen ? '0 0 280px' : '0 0 0px',
            overflow: 'hidden'
          }}
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
            <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {courseModules.map(module => (
                <div key={module.id} className="mb-2">
                  <div 
                    className={`p-2 rounded-md cursor-pointer ${activeModuleId === module.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveModuleId(module.id)}
                  >
                    <h3 className="font-medium text-sm">{module.title}</h3>
                    <p className="text-xs text-gray-500">
                      {module.lessons.length} lessons • 
                      {module.lessons.filter(lesson => lesson.completed).length} completed
                    </p>
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

        {/* Main Content Area */}
        <div 
          className="flex-1 transition-all duration-300"
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{currentLesson?.title}</h2>
                <div className="text-sm text-gray-500">
                  Duration: {currentLesson?.duration}
                </div>
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-icons text-6xl text-gray-400">play_circle</span>
                  <p className="text-gray-500 mt-2">Video Lesson</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3>Lesson Overview</h3>
                <p>
                  In this lesson, we will explore the fundamentals of artificial intelligence and its applications
                  in modern technology. You will learn about the different approaches to AI and how they have
                  evolved over time.
                </p>

                <h3>Key Concepts</h3>
                <ul>
                  <li>Definition and scope of artificial intelligence</li>
                  <li>Distinction between narrow AI and general AI</li>
                  <li>Major milestones in the development of AI technology</li>
                  <li>Current applications of AI in various industries</li>
                </ul>

                <h3>Practice Exercise</h3>
                <p>
                  After watching the video, try to identify three examples of AI that you interact with in your
                  daily life. For each example, consider:
                </p>
                <ol>
                  <li>What task is the AI performing?</li>
                  <li>What type of AI approach is being used?</li>
                  <li>How does it benefit users?</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline">
              <span className="material-icons mr-2">arrow_back</span>
              Previous Lesson
            </Button>
            <Button onClick={handleComplete}>
              <span className="material-icons mr-2">check</span>
              Complete & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;