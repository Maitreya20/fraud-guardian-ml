import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter } from "lucide-react"; // Changed GitHub to Github
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (type: 'signIn' | 'signUp') => {
    try {
      if (type === 'signIn') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Signed in successfully!');
          navigate('/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Signed up successfully! Check your email to verify.');
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.');
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'twitter') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(`Signing in with ${provider}..`);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="w-full flex justify-center py-20">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Authentication</CardTitle>
          <CardDescription>Sign in or create an account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={() => handleSignIn('signIn')}>
                Sign In with Email
              </Button>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('github')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('twitter')}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sign-up" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={() => handleSignIn('signUp')}>
                Sign Up with Email
              </Button>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('github')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('twitter')}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
