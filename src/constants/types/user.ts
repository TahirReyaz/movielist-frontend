export type UserFav = {
  movie: string[];
  tv: string[];
  staff: string[];
  prod_companies: string[];
};

export type TRoleType =
  | "admin"
  | "community mod"
  | "developer"
  | "social media mod";

export type TRole = {
  role: TRoleType;
  lead: boolean;
  retired: boolean;
};

export type TMod = {
  roles: TRole[];
  username: string;
  avatar?: string;
};
