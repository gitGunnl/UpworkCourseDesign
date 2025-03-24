import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  icon: string;
  title: string;
  courseCount: number;
}

const CategoryCard = ({ icon, title, courseCount }: CategoryCardProps) => {
  return (
    <Card className="p-6 flex flex-col items-center text-center hover:border-primary-300 hover:border-2 cursor-pointer">
      <span className="material-icons text-4xl text-primary-600 mb-3">
        {icon}
      </span>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{courseCount} courses</p>
    </Card>
  );
};

export default CategoryCard;
