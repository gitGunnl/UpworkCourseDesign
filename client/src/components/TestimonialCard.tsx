import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  rating: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({
  rating,
  text,
  name,
  role,
  avatar,
}: TestimonialCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <span key={i} className="material-icons text-orange-500">
              star
            </span>
          ))}
          {rating % 1 !== 0 && (
            <span className="material-icons text-orange-500">star_half</span>
          )}
        </div>
        <p className="text-gray-500 mb-6">{text}</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
