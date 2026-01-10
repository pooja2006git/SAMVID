interface DemoUser {
  id: string;
  email: string;
  fullName: string;
  bankName: string;
}

const DEMO_USERS_KEY = 'samvid_demo_users';
const DEMO_SESSION_KEY = 'samvid_demo_session';

export const demoAuth = {
  signUp: (email: string, password: string, fullName: string, bankName: string) => {
    const users = JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]') as DemoUser[];

    const userExists = users.some(u => u.email === email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser: DemoUser = {
      id: `user_${Date.now()}`,
      email,
      fullName,
      bankName,
    };

    users.push(newUser);
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));

    return newUser;
  },

  signIn: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]') as DemoUser[];

    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const session = {
      user,
      token: `demo_token_${Date.now()}`,
    };

    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    return session;
  },

  signOut: () => {
    localStorage.removeItem(DEMO_SESSION_KEY);
  },

  getSession: () => {
    const session = localStorage.getItem(DEMO_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  getCurrentUser: () => {
    const session = demoAuth.getSession();
    return session?.user || null;
  },
};
