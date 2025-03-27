import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock course data (in a real app, this would come from an API)
const courseModules = [
  {
    id: 1,
    title: "Introduction to AI",
    lessons: [
      { 
        id: 1, 
        title: "What is Artificial Intelligence?", 
        duration: "10 min read", 
        completed: true,
        hasVideo: true,
        videoPosition: "top",
        hasImages: true 
      },
      { 
        id: 2, 
        title: "History of AI Development", 
        duration: "15 min read", 
        completed: true,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 3, 
        title: "Types of AI Systems", 
        duration: "12 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true  
      },
      { 
        id: 4, 
        title: "Current AI Landscape", 
        duration: "8 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: false 
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    lessons: [
      { 
        id: 5, 
        title: "Introduction to Machine Learning", 
        duration: "20 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "top",
        hasImages: true 
      },
      { 
        id: 6, 
        title: "Supervised Learning", 
        duration: "18 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 7, 
        title: "Unsupervised Learning", 
        duration: "15 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 8, 
        title: "Semi-supervised Learning", 
        duration: "12 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 9, 
        title: "Reinforcement Learning", 
        duration: "17 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "bottom",
        hasImages: true 
      },
      { 
        id: 10, 
        title: "Evaluation Metrics", 
        duration: "14 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
    ],
  },
  {
    id: 3,
    title: "Neural Networks",
    lessons: [
      { 
        id: 11, 
        title: "Introduction to Neural Networks", 
        duration: "15 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "bottom",
        hasImages: true 
      },
      { 
        id: 12, 
        title: "Perceptrons and Activation Functions", 
        duration: "20 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 13, 
        title: "Backpropagation Algorithm", 
        duration: "25 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true
      },
      { 
        id: 14, 
        title: "Training Neural Networks", 
        duration: "18 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 15, 
        title: "Convolutional Neural Networks", 
        duration: "22 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "top",
        hasImages: true 
      },
      { 
        id: 16, 
        title: "Recurrent Neural Networks", 
        duration: "20 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 17, 
        title: "LSTM and GRU", 
        duration: "18 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 18, 
        title: "Neural Network Architectures", 
        duration: "15 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true 
      },
    ],
  },
  {
    id: 4,
    title: "Deep Learning",
    lessons: [
      { 
        id: 19, 
        title: "Introduction to Deep Learning", 
        duration: "14 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "top",
        hasImages: false 
      },
      { 
        id: 20, 
        title: "Deep Neural Networks", 
        duration: "25 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 21, 
        title: "Training Deep Networks", 
        duration: "22 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 22, 
        title: "Regularization Techniques", 
        duration: "18 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 23, 
        title: "Optimization Algorithms", 
        duration: "20 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 24, 
        title: "Transfer Learning", 
        duration: "15 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "bottom",
        hasImages: true 
      },
      { 
        id: 25, 
        title: "GANs - Generative Adversarial Networks", 
        duration: "25 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true 
      },
      { 
        id: 26, 
        title: "Autoencoders", 
        duration: "18 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 27, 
        title: "Implementing Deep Learning Models", 
        duration: "30 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true 
      },
      { 
        id: 28, 
        title: "Deep Learning Applications", 
        duration: "20 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "bottom",
        hasImages: true 
      },
    ],
  },
  {
    id: 5,
    title: "Natural Language Processing",
    lessons: [
      { 
        id: 29, 
        title: "Introduction to NLP", 
        duration: "12 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "top",
        hasImages: false 
      },
      { 
        id: 30, 
        title: "Text Preprocessing", 
        duration: "15 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 31, 
        title: "Word Embeddings", 
        duration: "20 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 32, 
        title: "Sentiment Analysis", 
        duration: "18 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true 
      },
      { 
        id: 33, 
        title: "Named Entity Recognition", 
        duration: "15 min read", 
        completed: false,
        hasVideo: false,
        hasImages: true 
      },
      { 
        id: 34, 
        title: "Machine Translation", 
        duration: "18 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "middle",
        hasImages: true 
      },
      { 
        id: 35, 
        title: "Transformer Models and BERT", 
        duration: "25 min read", 
        completed: false,
        hasVideo: true,
        videoPosition: "bottom",
        hasImages: true 
      },
    ],
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

  // Calculate total completed lessons
  const totalLessons = courseModules.reduce((total, module) => total + module.lessons.length, 0);
  const completedLessons = courseModules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.completed).length, 0);

  // Mark lesson as completed
  const markAsCompleted = () => {
    // In a real app, this would send a request to the server
    const newModules = [...courseModules];
    const moduleIndex = newModules.findIndex(module => module.id === activeModuleId);
    const lessonIndex = newModules[moduleIndex].lessons.findIndex(lesson => lesson.id === activeLessonId);

    if (!newModules[moduleIndex].lessons[lessonIndex].completed) {
      newModules[moduleIndex].lessons[lessonIndex].completed = true;
      // Update progress percentage
      const newCompletedLessons = completedLessons + 1;
      const newProgress = Math.round((newCompletedLessons / totalLessons) * 100);
      setProgress(newProgress);

      toast({
        title: "Progress Updated",
        description: "Lesson marked as completed!",
      });
    }

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
      <div className="mb-6 ml-14 lg:ml-4">
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

      <div className={`grid grid-cols-1 ${isSidebarOpen ? 'lg:grid-cols-[250px_1fr]' : 'lg:grid-cols-1'} gap-6 relative`}>
        {/* Sidebar - Course Navigation */}
        <div 
          className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            fixed lg:relative 
            z-20 
            top-0 bottom-0 left-0 right-0 
            bg-black/20 lg:bg-transparent
            transition-all duration-300
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
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold">Course Content</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
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

        {/* Sidebar toggle button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`
            fixed 
            top-20 
            ${isSidebarOpen ? 'hidden' : 'left-0'}
            z-30
            flex items-center justify-center
            bg-white/80
            text-gray-600
            hover:bg-white hover:text-gray-900
            focus:outline-none
            border-y border-r
            shadow-sm
            backdrop-blur-sm
            transition-all duration-200
            rounded-r-lg
            w-8 h-20
          `}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="course-sidebar"
        >
          <span className="material-icons text-lg">
            {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>

        {/* Main Content Area */}
        <div 
          className="transition-all duration-300"
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{currentLesson?.title}</h2>
                <div className="text-sm text-gray-500">
                  Duration: {currentLesson?.duration}
                </div>
              </div>

              {/* Lesson content with conditional video placement */}
              <div className="prose max-w-none mb-6">
                {/* Top video placement */}
                {currentLesson?.hasVideo && currentLesson.videoPosition === "top" && (
                  <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-white text-center">
                      <span className="material-icons text-6xl mb-2">smart_display</span>
                      <p>Video: {currentLesson.title}</p>
                      <p className="text-sm text-gray-400 mt-1">In a real application, a video player would be embedded here</p>
                    </div>
                  </div>
                )}

                <h3>Lesson Overview</h3>
                <p>
                  In this lesson, we explore the fundamental concepts behind {currentLesson?.title}. 
                  This is a critical topic in the field of artificial intelligence that forms the foundation 
                  for many advanced techniques and applications.
                </p>

                {/* Image example 1 - conditional based on lesson */}
                {currentLesson?.hasImages && (
                  <div className="my-4 border rounded-md overflow-hidden">
                    <div className="bg-gray-100 aspect-video flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <span className="material-icons text-4xl mb-2">image</span>
                        <p className="text-sm">Diagram: {currentLesson.title} Conceptual Overview</p>
                      </div>
                    </div>
                    <div className="p-2 text-xs text-center text-gray-500">
                      Figure 1: Conceptual overview of {currentLesson.title}
                    </div>
                  </div>
                )}

                <h3>Key Concepts</h3>
                <ul>
                  <li>Understanding the theoretical foundations</li>
                  <li>Practical implementation approaches</li>
                  <li>Common challenges and solutions</li>
                  <li>Real-world applications and case studies</li>
                </ul>

                {/* Middle video placement */}
                {currentLesson?.hasVideo && currentLesson.videoPosition === "middle" && (
                  <div className="aspect-video bg-gray-900 rounded-lg my-6 flex items-center justify-center">
                    <div className="text-white text-center">
                      <span className="material-icons text-6xl mb-2">smart_display</span>
                      <p>Video Demonstration: {currentLesson.title}</p>
                      <p className="text-sm text-gray-400 mt-1">In a real application, a video player would be embedded here</p>
                    </div>
                  </div>
                )}

                <h3>Practical Applications</h3>
                <p>
                  The concepts covered in this lesson are applied in various domains including:
                </p>
                <ul>
                  <li>Healthcare diagnostics</li>
                  <li>Financial forecasting</li>
                  <li>Autonomous vehicles</li>
                  <li>Natural language understanding</li>
                </ul>

                {/* Image example 2 - conditional based on lesson */}
                {currentLesson?.hasImages && (
                  <div className="my-4 border rounded-md overflow-hidden">
                    <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <span className="material-icons text-4xl mb-2">bar_chart</span>
                        <p className="text-sm">Chart: Performance Metrics for {currentLesson.title}</p>
                      </div>
                    </div>
                    <div className="p-2 text-xs text-center text-gray-500">
                      Figure 2: Example performance metrics for different approaches
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-md border-l-4 border-primary-500 my-4">
                  <h4 className="font-bold">Important Note</h4>
                  <p className="text-sm">
                    Make sure to review the supplementary materials and complete the practice exercises 
                    to reinforce your understanding of these concepts.
                  </p>
                </div>

                {/* Bottom video placement */}
                {currentLesson?.hasVideo && currentLesson.videoPosition === "bottom" && (
                  <div className="aspect-video bg-gray-900 rounded-lg mt-6 flex items-center justify-center">
                    <div className="text-white text-center">
                      <span className="material-icons text-6xl mb-2">smart_display</span>
                      <p>Advanced Video: {currentLesson.title} In Practice</p>
                      <p className="text-sm text-gray-400 mt-1">In a real application, a video player would be embedded here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Next/Complete buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={activeLessonId === 1 && activeModuleId === 1}
                  onClick={() => {
                    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === activeLessonId) || 0;
                    if (currentLessonIndex > 0) {
                      // Previous lesson in same module
                      setActiveLessonId(currentModule?.lessons[currentLessonIndex - 1].id || 1);
                    } else {
                      // Go to previous module's last lesson
                      const currentModuleIndex = courseModules.findIndex(m => m.id === activeModuleId);
                      if (currentModuleIndex > 0) {
                        const prevModule = courseModules[currentModuleIndex - 1];
                        setActiveModuleId(prevModule.id);
                        setActiveLessonId(prevModule.lessons[prevModule.lessons.length - 1].id);
                      }
                    }
                  }}
                >
                  <span className="material-icons mr-1">arrow_back</span> Previous
                </Button>
                <Button onClick={markAsCompleted}>
                  {currentLesson?.completed ? 'Next Lesson' : 'Mark as Completed'}
                  <span className="material-icons ml-1">arrow_forward</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;