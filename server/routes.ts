import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get("/api/courses", async (req: Request, res: Response) => {
    try {
      const courses = await storage.getCourses();
      return res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get a specific course
  app.get("/api/courses/:id", async (req: Request, res: Response) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      return res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Create a new course (admin function)
  app.post("/api/courses", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const newCourse = await storage.createCourse(validatedData);
      return res.status(201).json(newCourse);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating course:", error);
      return res.status(500).json({ message: "Failed to create course" });
    }
  });

  // User registration
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(validatedData);
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Login (dummy route that doesn't actually authenticate)
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Note: In a real app, you would verify credentials
      // This is a dummy implementation
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Always return success in this dummy implementation
      return res.json({ 
        success: true,
        message: "Login successful",
        user: { 
          id: 1,
          username
        }
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
