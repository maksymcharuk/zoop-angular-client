import { User } from '.';

export interface AuthResponseDto {
  user: User;
  token: string;
}
