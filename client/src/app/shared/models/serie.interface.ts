export interface Serie {
    id: string; 
    name: string;
    description: string;
    img_url: string;

    external_story_link: string;
    publisher_id: string;
    publisher: string;
    explicit: boolean;
    
    create_at: number;
    type: number;
} 