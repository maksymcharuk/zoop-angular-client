import { User } from './user.interface';

export interface AuthResponseDto {
  user: User;
  token: string;
}
