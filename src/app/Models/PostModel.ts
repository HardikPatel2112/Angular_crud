export interface PostModel {
    id: number;
    title: string;
    body: string;
    time? : Date,
    likes? : number, 
    share? : number, 
    userId: number;
  }