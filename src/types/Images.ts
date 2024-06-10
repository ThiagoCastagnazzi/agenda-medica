export interface ImagePOST {
  image: any;
  description: string;
  exam_type: string;
}

export interface ImageGET {
  data: {
    id: string;
    type: string;
    attributes: {
      image_url: string;
      description: string;
      exam_type: string;
      created_at: string;
    };
  }[];
  meta: {
    per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
  };
}
