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
