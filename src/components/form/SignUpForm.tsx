'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserRequestSchema } from '@/db/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

// import GoogleSignInButton from '../GoogleSignInButton';

const FormSchema = UserRequestSchema.merge(
  z.object({
    confirmPassword: z.string().min(1, '请输入确认密码'),
  })
).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: '两次密码输入不一致',
});

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { confirmPassword, ...postValues } = values;
    console.log(values);

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(postValues),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.replace('/sign-in');
    } else {
      console.error('error');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入邮箱" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入密码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>再次输入</FormLabel>
                <FormControl>
                  <Input placeholder="请再次输入密码" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          注册
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      <p className="mt-2 text-center text-sm text-gray-600">
        如果你已有账号，请
        <Link className="text-blue-500 hover:underline" href="/sign-in" replace>
          登录
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
