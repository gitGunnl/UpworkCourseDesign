import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AICourseDetailPage = () => {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = () => {
    if (isLoggedIn) {
      setShowPaymentModal(true);
      toast({
        title: "Payment Required",
        description: "This is a demo. In a real app, a payment modal would open.",
      });
      // Simulate successful enrollment after payment
      setIsEnrolled(true);
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in this course.",
      });
      navigate("/auth");
    }
  };
  
  const handleStartLearning = () => {
    navigate("/course/ai/learn");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-2/3">
          <div className="flex gap-2 mb-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              Artificial Intelligence
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
              Most Popular
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Mastering Artificial Intelligence: From Basics to Advanced
          </h1>
          <p className="text-gray-600 mb-4">
            Learn the fundamentals of AI, machine learning algorithms, neural networks, and how to apply AI solutions to real-world problems.
          </p>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-1">
              <span className="material-icons text-primary-600">schedule</span>
              <span>12 weeks</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-icons text-primary-600">signal_cellular_alt</span>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-icons text-primary-600">star</span>
              <span>4.9 (378 ratings)</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Created by <span className="text-primary-600 font-medium">Dr. Alan Turing</span> and <span className="text-primary-600 font-medium">Dr. Ada Lovelace</span>
          </p>
          <div className="flex flex-wrap gap-4">
            {!isEnrolled ? (
              <>
                <Button size="lg" onClick={handleEnroll}>
                  Enroll Now - $79.99
                </Button>
                <Button variant="outline" size="lg">
                  Preview Course
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleStartLearning}
              >
                <span className="material-icons mr-2">play_circle</span>
                Start Learning
              </Button>
            )}
          </div>
        </div>
        <div className="md:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995" 
            alt="AI Course" 
            className="rounded-lg w-full h-auto object-cover shadow-md" 
          />
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Understand AI fundamentals and concepts</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Build and train neural networks</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Implement machine learning algorithms</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Create computer vision applications</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Develop natural language processing systems</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Design reinforcement learning agents</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Deploy AI models to production</span>
                </div>
                <div className="flex gap-2">
                  <span className="material-icons text-green-500">check_circle</span>
                  <span>Ethical considerations in AI development</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Course Description</h2>
              <p className="mb-4">
                This comprehensive course takes you from AI fundamentals to advanced techniques used in modern artificial intelligence systems. Whether you're a beginner or have some experience with programming, this course will provide you with the skills needed to understand and implement AI solutions.
              </p>
              <p className="mb-4">
                You'll start with the basics of machine learning and gradually progress to advanced topics like deep learning, natural language processing, and reinforcement learning. Through hands-on projects and real-world examples, you'll gain practical experience that will prepare you for a career in AI.
              </p>
              <p className="mb-8">
                By the end of this course, you'll have built your own AI applications and have a portfolio of projects to showcase your skills to potential employers or clients.
              </p>

              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-3 mb-8">
                {[
                  {
                    id: 1,
                    title: "Module 1: Introduction to AI",
                    info: "4 lectures • 45 min",
                    lectures: ["AI History", "Key Concepts", "AI Ethics", "Modern Applications"]
                  },
                  {
                    id: 2,
                    title: "Module 2: Machine Learning Basics",
                    info: "6 lectures • 1h 20min",
                    lectures: ["Supervised Learning", "Unsupervised Learning", "Linear Regression", "Decision Trees", "K-Means Clustering", "Evaluation Metrics"]
                  },
                  {
                    id: 3,
                    title: "Module 3: Neural Networks",
                    info: "8 lectures • 2h 10min",
                    lectures: ["Perceptron", "Backpropagation", "Activation Functions", "Optimizers", "Regularization", "CNN Basics", "RNN Basics", "Transformer Basics"]
                  },
                  {
                    id: 4,
                    title: "Module 4: Deep Learning",
                    info: "10 lectures • 3h 30min",
                    lectures: ["Advanced CNN", "Advanced RNN", "LSTM", "GRU", "Transfer Learning", "GANs", "Autoencoders", "Diffusion Models", "Model Deployment", "Optimization Techniques"]
                  },
                  {
                    id: 5,
                    title: "Module 5: Natural Language Processing",
                    info: "7 lectures • 2h 15min",
                    lectures: ["Text Processing", "Word Embeddings", "Language Models", "Sequence-to-Sequence", "Attention Mechanisms", "BERT", "GPT Models"]
                  }
                ].map((module) => {
                  const [isExpanded, setIsExpanded] = useState(false);
                  return (
                    <div key={module.id} className="rounded-md overflow-hidden">
                      <div 
                        className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        <div>
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.info}</p>
                        </div>
                        <span className="material-icons transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          expand_more
                        </span>
                      </div>
                      {isExpanded && (
                        <div className="p-3 border-t border-gray-200 bg-white">
                          <ul className="space-y-2">
                            {module.lectures.map((lecture, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="material-icons text-gray-400 text-sm">play_circle_outline</span>
                                <span className="text-sm">{lecture}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">This course includes:</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">videocam</span>
                  <span>35 hours of on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">article</span>
                  <span>25 articles and resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">terminal</span>
                  <span>15 coding exercises</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">cloud_download</span>
                  <span>Downloadable source code</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">phone_android</span>
                  <span>Mobile and TV access</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-gray-600">workspace_premium</span>
                  <span>Certificate of completion</span>
                </div>
              </div>
              <div className="mb-3">
                <Button className="w-full" size="lg" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              </div>
              <div className="mb-6">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  size="lg" 
                  onClick={handleStartLearning}
                >
                  <span className="material-icons mr-2">play_circle</span>
                  Start Learning
                </Button>
              </div>
              <p className="text-sm text-center text-gray-500">
                30-Day Money-Back Guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICourseDetailPage;