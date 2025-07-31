export interface Community {
  _id: string;
  name: string;
  author: {
    _id: string;
    fullname: string;
    email: string;
  };
  createdAt: string;
}
