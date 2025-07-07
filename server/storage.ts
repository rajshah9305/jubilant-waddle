import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, projects, chatMessages, type User, type Project, type ChatMessage, type InsertUser, type InsertProject, type InsertChatMessage } from '../shared/schema';
import { eq, desc } from 'drizzle-orm';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserApiKey(userId: number, apiKey: string): Promise<User | undefined>;
  
  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Chat message methods
  getChatMessages(projectId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Health check
  healthCheck(): Promise<boolean>;
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMessageId = 1;

    // Create a default user
    const defaultUser: User = {
      id: 1,
      username: 'demo_user',
      password: 'password123',
      apiKey: 'demo-api-key',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(1, defaultUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { 
      id: ++this.currentUserId,
      ...insertUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUserApiKey(userId: number, apiKey: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.apiKey = apiKey;
      user.updatedAt = new Date();
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      id: ++this.currentProjectId,
      ...insertProject,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(project.id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      Object.assign(project, updates, { updatedAt: new Date() });
      this.projects.set(id, project);
      return project;
    }
    return undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getChatMessages(projectId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.projectId === projectId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: ++this.currentMessageId,
      ...insertMessage,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.chatMessages.set(message.id, message);
    return message;
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

// PostgreSQL Database Implementation
export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUserApiKey(userId: number, apiKey: string): Promise<User | undefined> {
    const result = await this.db
      .update(users)
      .set({ apiKey })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return await this.db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.updatedAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await this.db
      .update(projects)
      .set(updates)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await this.db.delete(projects).where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  async getChatMessages(projectId: number): Promise<ChatMessage[]> {
    return await this.db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.projectId, projectId))
      .orderBy(chatMessages.id);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const result = await this.db.insert(chatMessages).values(message).returning();
    return result[0];
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.db.select().from(users).limit(1);
      return true;
    } catch {
      return false;
    }
  }
}

// Use PostgreSQL storage for production, fallback to memory for development
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();