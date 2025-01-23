export type CurrentUser = {
  youtube: {
    accessToken: string;
  } | null;
  spotify: {
    accessToken: string;
  } | null;
  id: number;
  createdAt: Date;
};
