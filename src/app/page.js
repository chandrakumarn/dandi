"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleSignIn from "../components/GoogleSignIn";
import GoogleSignOut from "../components/GoogleSignOut";

export default function Home() {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Dandi Github Analyzer</span>
            </div>

            {/* Right Side - Navigation & User */}
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
                <Link href="/dashboards" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Dashboards
                </Link>
              </nav>

              {session ? (
                // User is signed in
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 font-medium">{session.user?.name}</span>
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <GoogleSignOut />
                </div>
              ) : (
                // User is not signed in
                <GoogleSignIn />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Unlock GitHub Insights with
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent text-6xl md:text-7xl">
              Dandi
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Get powerful insights, summaries, and analytics for open source GitHub repositories. 
            Discover trends, track important updates, and stay ahead of the curve.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {session ? (
              <Link 
                href="/dashboards" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Go to Dashboard
              </Link>
            ) : (
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
              </button>
            )}
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Repository Analytics</h3>
            <p className="text-gray-600">Deep insights into repository performance, trends, and metrics</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Summaries</h3>
            <p className="text-gray-600">AI-powered summaries of commits, issues, and pull requests</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trend Tracking</h3>
            <p className="text-gray-600">Monitor important updates and stay ahead of the curve</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Dandi Github Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
