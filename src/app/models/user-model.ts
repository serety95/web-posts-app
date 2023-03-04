import { PostModel } from './post-model';
import { Address } from './address';
import { Company } from './company';
export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  posts?:PostModel[]
}
