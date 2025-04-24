// lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          profile_image_url: string | null;
          resume_url: string | null;
          phone: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          email: string;
          name?: string;
          profile_image_url?: string | null;
          resume_url?: string | null;
          phone?: string | null;
          website?: string | null;
        };
        Update: {
          name?: string;
          profile_image_url?: string | null;
          resume_url?: string | null;
          phone?: string | null;
          website?: string | null;
        };
      };
      interviews: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          type: string;
          duration: number;
          created_at: string;
          finalized: boolean;
          description: string | null;
          transcript: string | null;
          source_id: string | null;
          feedback_status: string | null;
          feedback_id: string | null;
        };
        Insert: {
          user_id: string;
          role: string;
          type: string;
          duration: number;
          created_at?: string;
          finalized?: boolean;
          description?: string | null;
          transcript?: string | null;
          source_id?: string | null;
          feedback_status?: string | null;
          feedback_id?: string | null;
        };
        Update: {
          role?: string;
          type?: string;
          duration?: number;
          finalized?: boolean;
          description?: string | null;
          transcript?: string | null;
          source_id?: string | null;
          feedback_status?: string | null;
          feedback_id?: string | null;
        };
      };
      interview_questions: {
        Row: {
          id: string;
          interview_id: string;
          question: string;
          order: number;
        };
        Insert: {
          interview_id: string;
          question: string;
          order: number;
        };
        Update: {
          question?: string;
          order?: number;
        };
      };
      feedback: {
        Row: {
          id: string;
          interview_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          interview_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
    };
  };
}
