import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertChatMessageSchema, type StudioType } from "@shared/schema";
import { z } from "zod";

// Mock AI responses for different studios
const mockResponses = {
  text: [
    "I'd be happy to help you create compelling content! I can assist with blog posts, articles, marketing copy, social media content, and more. What type of content would you like to work on, and do you have any specific topics or requirements in mind?",
    "Great! Let me help you craft engaging content. Based on your request, I'll create something that captures your audience's attention and delivers your message effectively.",
    "Excellent topic choice! I'll help you develop this into compelling content that resonates with your target audience."
  ],
  code: [
    "I'm ready to help with your coding needs! I can assist with writing new code, debugging existing code, code reviews, optimization, and explaining complex programming concepts. What programming language are you working with, and what specific challenge can I help you solve?",
    "Perfect! Let me help you write clean, efficient code. I'll ensure it follows best practices and is well-documented.",
    "Great question! Here's a solution that addresses your requirements while maintaining code quality and performance."
  ],
  document: [
    "I can help you analyze and extract insights from your documents! I can summarize content, extract key information, answer questions about the document, and provide detailed analysis. Please upload your document or paste the text you'd like me to analyze.",
    "I've analyzed your document and found several key insights. Let me break down the main points and provide you with a comprehensive summary.",
    "Based on the document content, here are the extracted insights and recommendations for your review."
  ],
  creative: [
    "Let's unleash your creativity! I can help you craft stories, write poetry, develop characters, create dialogue, brainstorm plot ideas, and much more. What type of creative writing project are you working on? Do you have a genre, theme, or specific idea in mind?",
    "Wonderful concept! Let me help you develop this creative idea into something truly engaging and memorable.",
    "What an interesting creative direction! I'll help you expand on this idea and bring it to life with vivid detail and compelling narrative."
  ]
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get('/api/health', async (req, res) => {
    try {
      const isHealthy = await storage.healthCheck();
      res.json({ status: isHealthy ? 'healthy' : 'unhealthy' });
    } catch (error) {
      res.status(500).json({ message: 'Health check failed' });
    }
  });

  // AI Generation endpoints
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { message, studioType, projectId } = req.body;
      
      if (!message || !studioType) {
        return res.status(400).json({ message: 'Message and studio type are required' });
      }

      // Get random response for the studio type
      const responses = mockResponses[studioType as StudioType] || mockResponses.text;
      const response = responses[Math.floor(Math.random() * responses.length)];

      // Simulate streaming response
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
      });

      // Split response into chunks for streaming effect
      const words = response.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = {
          content: words[i] + (i < words.length - 1 ? ' ' : ''),
          done: i === words.length - 1
        };
        res.write(JSON.stringify(chunk) + '\n');
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
      }

      res.end();
    } catch (error) {
      res.status(500).json({ message: 'AI generation failed' });
    }
  });

  app.post('/api/ai/generate-simple', async (req, res) => {
    try {
      const { message, studioType } = req.body;
      
      if (!message || !studioType) {
        return res.status(400).json({ message: 'Message and studio type are required' });
      }

      const responses = mockResponses[studioType as StudioType] || mockResponses.text;
      const response = responses[Math.floor(Math.random() * responses.length)];

      res.json({ 
        content: response,
        tokensUsed: Math.floor(Math.random() * 500) + 100,
        processingTime: Math.floor(Math.random() * 200) + 50
      });
    } catch (error) {
      res.status(500).json({ message: 'AI generation failed' });
    }
  });

  // Project management
  app.get('/api/projects', async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects' });
    }
  });

  app.post('/api/projects', async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject({
        ...projectData,
        userId: 1 // Demo user ID
      });
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid project data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create project' });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch project' });
    }
  });

  app.put('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertProjectSchema.partial().parse(req.body);
      
      const project = await storage.updateProject(id, updates);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid update data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update project' });
    }
  });

  app.delete('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete project' });
    }
  });

  // Chat messages
  app.get('/api/projects/:id/messages', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const messages = await storage.getChatMessages(projectId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
  });

  app.post('/api/projects/:id/messages', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        projectId
      });
      
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid message data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create message' });
    }
  });

  // User API key management
  app.put('/api/user/api-key', async (req, res) => {
    try {
      const { apiKey } = req.body;
      const userId = 1; // Demo user ID
      
      if (!apiKey) {
        return res.status(400).json({ message: 'API key is required' });
      }
      
      const user = await storage.updateUserApiKey(userId, apiKey);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ message: 'API key updated successfully', valid: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update API key' });
    }
  });

  app.get('/api/user/api-key/validate', async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const user = await storage.getUser(userId);
      
      const hasValidKey = user?.apiKey && user.apiKey.length > 0;
      res.json({ valid: hasValidKey });
    } catch (error) {
      res.status(500).json({ message: 'Failed to validate API key' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
