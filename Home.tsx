import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Shield, File, Activity } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import backgroundSigning from '../assets/background_signing.png';

export const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-kenburns"
                    style={{ backgroundImage: `url(${backgroundSigning})` }}
                ></div>
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-20 pt-10">
                {/* Hero Section */}
                <section className="text-center space-y-8 py-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-4 fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                        Now powered by Advanced Legal AI
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 pb-2 fade-in">
                        Rental Agreements, <br />
                        <span className="text-blue-600">Simplified & Safe.</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed fade-in">
                        Upload your tenant agreement for instant AI analysis or generate legally robust documents in seconds. Protect yourself with LexAgree.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 fade-in">
                        <Link to="/dashboard">
                            <Button size="lg" icon={<Shield className="w-5 h-5" />}>Analyze Agreement</Button>
                        </Link>
                        <Link to="/generator">
                            <Button variant="secondary" size="lg" icon={<File className="w-5 h-5" />}>Generate Document</Button>
                        </Link>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="grid md:grid-cols-3 gap-8">
                    <Card className="hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Safety First</h3>
                        <p className="text-slate-500">
                            Our AI scans for hidden clauses, unfair terms, and missing legal protections to ensure you're covered.
                        </p>
                    </Card>

                    <Card className="hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6 text-teal-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Powered</h3>
                        <p className="text-slate-500">
                            Get instant feedback on your documents. Understand complex legal jargon in plain English.
                        </p>
                    </Card>

                    <Card className="hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                            <File className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Custom Generator</h3>
                        <p className="text-slate-500">
                            Generate state-specific rental agreements, notices, and addendums with a simple prompt.
                        </p>
                    </Card>
                </section>
            </div>
        </div>
    );
};
