import { users, type User, type InsertUser, courses, type Course, type InsertCourse } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private userCurrentId: number;
  private courseCurrentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.userCurrentId = 1;
    this.courseCurrentId = 1;

    // Initialize with some sample courses
    const sampleCourses: Course[] = [
      {
        id: this.courseCurrentId++,
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
        id: this.courseCurrentId++,
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
        id: this.courseCurrentId++,
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

    sampleCourses.forEach(course => {
      this.courses.set(course.id, course);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.courseCurrentId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      isPopular: insertCourse.isPopular ?? false
    };
    this.courses.set(id, course);
    return course;
  }
}

export const storage = new MemStorage();
