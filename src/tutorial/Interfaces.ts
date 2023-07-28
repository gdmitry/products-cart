// Let it be db data object from mongo
interface UserType {
  readonly dbId: number;
  email: string;
  userId: number;
  googleId?: string;
  startTrial(): string;
  getCoupon(couponName: string, value: number): number;
};

// This is called re-openning of the interface
interface UserType {
  githubToken: string;
}

const user: UserType = {
  
};
