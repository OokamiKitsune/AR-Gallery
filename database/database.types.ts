export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: { 
      images: {
        Row: {               // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          name: string       // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
    // Private tables are not exposed to the client, but can be used by the server.
    private: {
        Tables: {
        users: {
            Row: {
            id: number
            name: string
            email: string
            password: string
            }
            Insert: {
            id?: never
            name: string
            email: string
            password: string
            }
            Update: {
            id?: never
            name?: string
            email?: string
            password?: string
            }
        }
        }
    }
}