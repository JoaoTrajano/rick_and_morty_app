export interface ApiResponse {
  metadata?: {
    count: number;
    pages: number;
    next: string | null;
  };
  statusCode: number;
  value: any;
}
