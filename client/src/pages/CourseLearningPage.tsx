import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Course resources
const courseResources = [
  { title: "AI Fundamentals Cheat Sheet", type: "PDF", size: "1.2 MB" },
  { title: "Neural Networks Diagrams", type: "ZIP", size: "4.5 MB" },
  { title: "Python Code Samples", type: "ZIP", size: "2.8 MB" },
  { title: "Machine Learning Algorithms Overview", type: "PDF", size: "3.1 MB" },
  { title: "Deep Learning Framework Comparison", type: "PDF", size: "1.7 MB" },
];

// Additional information content
const discussionContent = (
  <div className="space-y-4">
    <div className="border rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">JD</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium">John Doe</h4>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <p className="text-sm my-2">
            I'm having trouble understanding backpropagation. Can someone explain how the chain rule is applied here?
          </p>
          <div className="flex gap-4 text-sm">
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <span className="material-icons text-sm">thumb_up</span> 3
            </button>
            <button className="text-gray-500 hover:text-gray-700">Reply</button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border rounded-md p-4 ml-8">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">AS</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium">Alice Smith</h4>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <p className="text-sm my-2">
            Backpropagation uses the chain rule to calculate how each weight in the network contributes to the overall error. It works backwards from the output, calculating gradients at each layer.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <span className="material-icons text-sm">thumb_up</span> 5
            </button>
            <button className="text-gray-500 hover:text-gray-700">Reply</button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">MP</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium">Mike Peterson</h4>
            <span className="text-sm text-gray-500">12 hours ago</span>
          </div>
          <p className="text-sm my-2">
            Is anyone working on the neural network project from Module 3? I'd love to collaborate or compare approaches.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <span className="material-icons text-sm">thumb_up</span> 2
            </button>
            <button className="text-gray-500 hover:text-gray-700">Reply</button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-4">
      <textarea 
        className="w-full p-3 border rounded-md" 
        rows={3} 
        placeholder="Add to the discussion..."
      ></textarea>
      <Button className="mt-2">Post Comment</Button>
    </div>
  </div>
);

const notesContent = (
  <div className="space-y-4">
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2">Neural Networks - Key Points</h4>
      <p className="text-sm text-gray-700">
        • Inspired by biological neural networks<br />
        • Composed of layers: input, hidden, and output<br />
        • Each neuron applies weights, bias, and activation function<br />
        • Training involves adjusting weights to minimize error<br />
        • Common activation functions: ReLU, Sigmoid, Tanh
      </p>
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">Edited 3 days ago</span>
      </div>
    </div>
    
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2">Machine Learning Types</h4>
      <p className="text-sm text-gray-700">
        • Supervised: Training with labeled data<br />
        • Unsupervised: Finding patterns in unlabeled data<br />
        • Reinforcement: Learning through trial and error with rewards<br />
        • Semi-supervised: Mix of labeled and unlabeled data
      </p>
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">Edited 1 week ago</span>
      </div>
    </div>
    
    <div className="mt-4">
      <textarea 
        className="w-full p-3 border rounded-md" 
        rows={3} 
        placeholder="Add a new note..."
      ></textarea>
      <Button className="mt-2">Save Note</Button>
    </div>
  </div>
);

const CourseLearningPage = () => {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [progress, setProgress] = useState(8); // 8% initial progress (2 out of 35 lessons completed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Course Navigation */}
        <div className={`lg:col-span-1 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-24 bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold">Course Content</h2>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
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
                          onClick={() => setActiveLessonId(lesson.id)}
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
        
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`lg:hidden fixed bottom-6 left-6 z-10 bg-primary-600 text-white p-3 rounded-full shadow-lg ${isSidebarOpen ? 'hidden' : 'flex'}`}
        >
          <span className="material-icons">menu</span>
        </button>
        
        {/* Main Content Area */}
        <div className="lg:col-span-3">
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
          
          {/* Additional Content Tabs */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="resources">
                <TabsList className="mb-4">
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resources">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Lesson Resources</h3>
                    <div className="space-y-3">
                      {courseResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <span className="material-icons text-gray-500">
                              {resource.type === "PDF" ? "picture_as_pdf" : "folder_zip"}
                            </span>
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <span className="material-icons text-sm mr-1">download</span>
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion">
                  {discussionContent}
                </TabsContent>
                
                <TabsContent value="notes">
                  {notesContent}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;