export interface Iuser {
  user: {
    email: string,
    is_active: boolean,
    user_id: number,
  },
  token: {
    access_token: string
  }
}
