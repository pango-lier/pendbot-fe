export interface ILink {
  id?: number;
}

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  active?: boolean;
  rolesId?: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
 