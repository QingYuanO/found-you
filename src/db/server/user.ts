import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';

import db from '..';
import { TypeUserRequest, UserRequestSchema } from '../dto';
import { userTable } from '../schema';

export const createUser = async (body: TypeUserRequest) => {
  try {
    const { username, email, password } = UserRequestSchema.parse(body);
    const existingUserByEmail = await db.query.userTable.findFirst({ where: eq(userTable.email, email) });
    const existingUserByUsername = await db.query.userTable.findFirst({ where: eq(userTable.username, username) });
    if (existingUserByEmail) {
      return { message: '使用此邮箱的用户已存在', user: null, status: 409 };
    }
    if (existingUserByUsername) {
      return { message: '使用此名称的用户已存在', user: null, status: 409 };
    }

    const hashPassword = await hash(password, 10);
    const newUser = (await db.insert(userTable).values({ username, email, password: hashPassword }).returning())[0];

    const { password: newPassword, ...rest } = newUser;

    return { status: 201, user: rest, message: '注册成功' };
  } catch (error: any) {
    return { status: 500, user: null, message: 'error:' + error.message || '未知错误' };
  }
};
