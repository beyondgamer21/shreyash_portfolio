import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Create contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact message received",
        data: contactMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Error processing your request"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
