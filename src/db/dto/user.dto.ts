import { z } from 'zod';

import { BaseSchema } from './base';

export const UserSchema = z
  .object({
    id: z.number().min(1),
    username: z.string().min(1, '请填写用户名').max(100),
    email: z.string().min(1, '请填写邮箱').email('邮箱格式不正确'),
    password: z.string().min(1, '请填写密码').min(6, '密码长度不能小于6'),
  })
  .merge(BaseSchema);

export const UserRequestSchema = UserSchema.pick({ email: true, username: true, password: true });
