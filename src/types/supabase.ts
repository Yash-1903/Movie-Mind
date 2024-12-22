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
      user_preferences: {
        Row: {
          id: string
          user_id: string
          preferred_genres: string[]
          preferred_actors: string[]
          preferred_directors: string[]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          preferred_genres?: string[]
          preferred_actors?: string[]
          preferred_directors?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          preferred_genres?: string[]
          preferred_actors?: string[]
          preferred_directors?: string[]
          created_at?: string
        }
      }
      watch_history: {
        Row: {
          id: string
          user_id: string
          movie_id: string
          rating: number | null
          watched_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          movie_id: string
          rating?: number | null
          watched_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          movie_id?: string
          rating?: number | null
          watched_at?: string
          created_at?: string
        }
      }
      watchlist: {
        Row: {
          id: string
          user_id: string
          movie_id: string
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          movie_id: string
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          movie_id?: string
          added_at?: string
        }
      }
    }
  }
}