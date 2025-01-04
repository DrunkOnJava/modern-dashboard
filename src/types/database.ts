export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          user_id: string
          theme: string
          notifications_enabled: boolean
          email_frequency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: string
          notifications_enabled?: boolean
          email_frequency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: string
          notifications_enabled?: boolean
          email_frequency?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}