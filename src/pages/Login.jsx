import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from "../api/auth.service"
import useAuthStore from '../store/authStore';
import '../css/login.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const { login } = useAuthStore()

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        console.log('====================================');
        console.log(username, password);
        console.log('====================================');

        try {
            
            const res = await apiService.login(username, password)
    
            console.log(res);
            if (res.token) {
                login(res)
                setIsLoading(false)
                navigate('/transactions')
            }
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }

    }
        return (
            <div className="login-container">
                <div className="login-box">
                    <div className="login-form">
                        <div className="login-header">
                            <div className="login-logo">
                                <svg viewBox="0 0 24 24" className="login-logo-icon" fill="currentColor">
                                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <path d="M12 4 L12 1 M12 23 L12 20 M4 12 L1 12 M23 12 L20 12 M6 6 L3 3 M18 18 L21 21 M6 18 L3 21 M18 6 L21 3" strokeWidth="2" stroke="currentColor" />
                                </svg>
                                <span className="login-logo-text">eTranzact</span>
                            </div>
                        </div>

                        <h1 className="login-title">Welcome back</h1>
                        <p className="login-subtitle">Please enter your details.</p>

                        <form >
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-remember">
                                <div className="form-checkbox">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="checkbox-input"
                                    />
                                    <label htmlFor="remember" className="checkbox-label">
                                        Remember for 30 days
                                    </label>
                                </div>

                                <a href="#" className="forgot-password">
                                    Forgot password
                                </a>
                            </div>

                            <button
                                className="submit-button"
                                onClick={(e) => handleSubmit(e)}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        {error && <p style={{ color: 'red' }}>{error.message}</p>}

                        <div className="signup-link">
                            <p>
                                Don't have an account?{' '}
                                <a href="#" className="signup-text">
                                    Sign up
                                </a>
                            </p>
                        </div>

                        <div className="footer">
                            <p>© eTranzact 2025</p>
                        </div>
                    </div>

                    <div className="login-illustration">
                        <div className="illustration-svg">
                            <svg viewBox="0 0 400 400" className="illustration-path">
                                <path
                                    d="M50,200 Q125,100 200,200 T350,200"
                                    fill="none"
                                    stroke="#D1D9D3"
                                    strokeWidth="30"
                                    strokeLinecap="round"
                                />
                                <circle cx="350" cy="200" r="15" fill="#FFFFFF" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default LoginPage;
