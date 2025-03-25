import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";

interface EnrolledCourseCardProps {
  course: Course;
  onContinue: (courseId: number) => void;
}

const EnrolledCourseCard = ({ course, onContinue }: EnrolledCourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="aspect-video bg-gray-200 relative">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.isPopular && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            POPULAR
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="material-icons text-sm">schedule</span>
          <span>{course.duration}</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <span className="material-icons text-sm">bar_chart</span>
          <span>{course.level}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-500 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: Math.floor(Number(course.rating)) }).map((_, i) => (
                <span key={i} className="material-icons text-orange-500">
                  star
                </span>
              ))}
              {Number(course.rating) % 1 !== 0 && (
                <span className="material-icons text-orange-500">star_half</span>
              )}
              {Array.from({ length: 5 - Math.ceil(Number(course.rating)) }).map((_, i) => (
                <span key={i} className="material-icons text-gray-300">
                  star
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({course.ratingCount})
            </span>
          </div>
          <div className="text-lg font-bold text-primary-600">
            ${course.price}
          </div>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => onContinue(course.id)}
        >
          Continue Course
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnrolledCourseCard;