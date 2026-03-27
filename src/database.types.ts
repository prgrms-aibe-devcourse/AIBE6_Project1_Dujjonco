export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: '14.4'
    }
    public: {
        Tables: {
            bookmarks: {
                Row: {
                    created_at: string | null
                    id: string
                    place_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    place_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    place_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'bookmarks_place_id_fkey'
                        columns: ['place_id']
                        isOneToOne: false
                        referencedRelation: 'places'
                        referencedColumns: ['content_id']
                    },
                ]
            }
            places: {
                Row: {
                    addr2: string | null
                    address: string | null
                    area_code: string | null
                    audioguide: string | null
                    auditorium: string | null
                    babysparechair: string | null
                    bigprint: string | null
                    blindhandicapetc: string | null
                    braileblock: string | null
                    brailepromotion: string | null
                    content_id: string
                    content_type: string | null
                    created_at: string | null
                    elevator: string | null
                    exit: string | null
                    guidehuman: string | null
                    guidesystem: string | null
                    handicapetc: string | null
                    hearinghandicapetc: string | null
                    hearingroom: string | null
                    helpdog: string | null
                    image_url: string | null
                    image_url2: string | null
                    infantsfamilyetc: string | null
                    lactationroom: string | null
                    lat: number | null
                    lng: number | null
                    parking: string | null
                    promotion: string | null
                    publictransport: string | null
                    restroom: string | null
                    room: string | null
                    route: string | null
                    signguide: string | null
                    stroller: string | null
                    tel: string | null
                    ticketoffice: string | null
                    title: string | null
                    videoguide: string | null
                    wheelchair: string | null
                }
                Insert: {
                    addr2?: string | null
                    address?: string | null
                    area_code?: string | null
                    audioguide?: string | null
                    auditorium?: string | null
                    babysparechair?: string | null
                    bigprint?: string | null
                    blindhandicapetc?: string | null
                    braileblock?: string | null
                    brailepromotion?: string | null
                    content_id: string
                    content_type?: string | null
                    created_at?: string | null
                    elevator?: string | null
                    exit?: string | null
                    guidehuman?: string | null
                    guidesystem?: string | null
                    handicapetc?: string | null
                    hearinghandicapetc?: string | null
                    hearingroom?: string | null
                    helpdog?: string | null
                    image_url?: string | null
                    image_url2?: string | null
                    infantsfamilyetc?: string | null
                    lactationroom?: string | null
                    lat?: number | null
                    lng?: number | null
                    parking?: string | null
                    promotion?: string | null
                    publictransport?: string | null
                    restroom?: string | null
                    room?: string | null
                    route?: string | null
                    signguide?: string | null
                    stroller?: string | null
                    tel?: string | null
                    ticketoffice?: string | null
                    title?: string | null
                    videoguide?: string | null
                    wheelchair?: string | null
                }
                Update: {
                    addr2?: string | null
                    address?: string | null
                    area_code?: string | null
                    audioguide?: string | null
                    auditorium?: string | null
                    babysparechair?: string | null
                    bigprint?: string | null
                    blindhandicapetc?: string | null
                    braileblock?: string | null
                    brailepromotion?: string | null
                    content_id?: string
                    content_type?: string | null
                    created_at?: string | null
                    elevator?: string | null
                    exit?: string | null
                    guidehuman?: string | null
                    guidesystem?: string | null
                    handicapetc?: string | null
                    hearinghandicapetc?: string | null
                    hearingroom?: string | null
                    helpdog?: string | null
                    image_url?: string | null
                    image_url2?: string | null
                    infantsfamilyetc?: string | null
                    lactationroom?: string | null
                    lat?: number | null
                    lng?: number | null
                    parking?: string | null
                    promotion?: string | null
                    publictransport?: string | null
                    restroom?: string | null
                    room?: string | null
                    route?: string | null
                    signguide?: string | null
                    stroller?: string | null
                    tel?: string | null
                    ticketoffice?: string | null
                    title?: string | null
                    videoguide?: string | null
                    wheelchair?: string | null
                }
                Relationships: []
            }
            post: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    title: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    title: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    title?: string
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            post_comments: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    post_id: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    post_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    post_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'post_comments_post_id_fkey'
                        columns: ['post_id']
                        isOneToOne: false
                        referencedRelation: 'post'
                        referencedColumns: ['id']
                    },
                ]
            }
            post_images: {
                Row: {
                    created_at: string | null
                    id: string
                    image_url: string[] | null
                    post_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    image_url?: string[] | null
                    post_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    image_url?: string[] | null
                    post_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'post_images_post_id_fkey'
                        columns: ['post_id']
                        isOneToOne: false
                        referencedRelation: 'post'
                        referencedColumns: ['id']
                    },
                ]
            }
            post_likes: {
                Row: {
                    created_at: string | null
                    id: string
                    like_count: number
                    post_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    like_count?: number
                    post_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    like_count?: number
                    post_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'post_likes_post_id_fkey'
                        columns: ['post_id']
                        isOneToOne: false
                        referencedRelation: 'post'
                        referencedColumns: ['id']
                    },
                ]
            }
            review_comments: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    review_id: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    review_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    review_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'review_comments_review_id_fkey'
                        columns: ['review_id']
                        isOneToOne: false
                        referencedRelation: 'reviews'
                        referencedColumns: ['id']
                    },
                ]
            }
            review_images: {
                Row: {
                    created_at: string | null
                    id: string
                    image_url: string
                    review_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    image_url: string
                    review_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    image_url?: string
                    review_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'review_images_review_id_fkey'
                        columns: ['review_id']
                        isOneToOne: false
                        referencedRelation: 'reviews'
                        referencedColumns: ['id']
                    },
                ]
            }
            review_likes: {
                Row: {
                    created_at: string | null
                    id: string
                    review_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    review_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    review_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'review_likes_review_id_fkey'
                        columns: ['review_id']
                        isOneToOne: false
                        referencedRelation: 'reviews'
                        referencedColumns: ['id']
                    },
                ]
            }
            reviews: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    place_id: string | null
                    score_entrance: number | null
                    score_facility: number | null
                    score_interior: number | null
                    user_id: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    place_id?: string | null
                    score_entrance?: number | null
                    score_facility?: number | null
                    score_interior?: number | null
                    user_id?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    place_id?: string | null
                    score_entrance?: number | null
                    score_facility?: number | null
                    score_interior?: number | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'reviews_place_id_fkey'
                        columns: ['place_id']
                        isOneToOne: false
                        referencedRelation: 'places'
                        referencedColumns: ['content_id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            toggle_post_like: {
                Args: { p_post_id: string; p_user_id: string }
                Returns: boolean
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema['CompositeTypes']
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
