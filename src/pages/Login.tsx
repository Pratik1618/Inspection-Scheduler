import { Button, Input, Link } from '@mui/material';
import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react"
import LoginForm from '../components/Login-Form';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-100 flex items-center justify-center p-4">
        <div className="absolute top-6 left-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-500 font-semibold">R</span>
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
       
      
    );
  };

export default Login;
