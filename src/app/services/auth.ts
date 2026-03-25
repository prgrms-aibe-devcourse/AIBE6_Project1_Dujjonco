export interface User {
  id: string;
  email: string;
  name: string;
  accessibilityType: string;
  createdAt: string;
}

class AuthService {
  private readonly USERS_KEY = 'barrierplace_users';
  private readonly CURRENT_USER_KEY = 'barrierplace_current_user';

  constructor() {
    this.initializeTestAccount();
  }

  private initializeTestAccount() {
    const users = this.getUsers();
    if (users.length === 0) {
      // 테스트 계정 추가
      const testUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: '테스트 사용자',
        accessibilityType: '일반',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(this.USERS_KEY, JSON.stringify([testUser]));
    }
  }

  register(email: string, password: string, name: string, accessibilityType: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: '이미 등록된 이메일입니다.' };
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      password,
      name,
      accessibilityType,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return { success: true, message: '회원가입이 완료되었습니다.' };
  }

  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { success: true, message: '로그인되었습니다.', user: userWithoutPassword };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  updateUser(userId: string, updates: Partial<User>): { success: boolean; message: string } {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const { password: _, ...userWithoutPassword } = users[userIndex];
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    }

    return { success: true, message: '프로필이 업데이트되었습니다.' };
  }

  private getUsers(): (User & { password: string })[] {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }
}

export const authService = new AuthService();