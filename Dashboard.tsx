import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
// @ts-ignore
import { Upload, FileText, CheckCircle, AlertTriangle, AlertCircle, Loader2, ShieldAlert, BadgeInfo } from 'lucide-react';
import { RiskCard } from '../components/RiskCard';

interface RiskItem {
    clause: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    recommendation: string;
}

interface AnalysisResult {
    fileName: string;
    isSafe: boolean;
    score: number;
    verdict: 'Safe' | 'Caution' | 'High Risk';
    riskLevel: 'Low' | 'Medium' | 'High';
    summary: string;
    risks: RiskItem[];
}

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [analyzing, setAnalyzing] = useState(false);
    const [scanStep, setScanStep] = useState<string>('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setAnalyzing(true);
        setResult(null);

        // Detailed Simulation Steps
        const steps = [
            "Extracting text from document...",
            "Identifying legal clauses...",
            "Checking compliance with Rent Control Act...",
            "Analyzing liability and indemnity terms...",
            "Generating risk report..."
        ];

        let currentStep = 0;
        setScanStep(steps[0]);

        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < steps.length) {
                setScanStep(steps[currentStep]);
            } else {
                clearInterval(interval);
                finalizeAnalysis(files[0]);
            }
        }, 800);
    };

    const finalizeAnalysis = (file: File) => {
        setAnalyzing(false);

        // Deterministic simulation based on filename length (odd=risky, even=safe) for consistent demos
        const isRisky = file.name.length % 2 !== 0;

        if (isRisky) {
            setResult({
                fileName: file.name,
                isSafe: false,
                score: 45,
                verdict: 'High Risk',
                riskLevel: 'High',
                summary: "This agreement contains several critical risks. The landlord retains excessive rights to enter the premises without notice, and the indemnity clauses are heavily biased against the tenant. We strongly recommend renegotiating these terms.",
                risks: [
                    {
                        clause: "Clause 4.2: Right of Entry",
                        severity: "High",
                        description: "Allows the landlord to enter the premises at any time without prior notice.",
                        recommendation: "Request a modification to require at least 24 hours written notice for non-emergency entry."
                    },
                    {
                        clause: "Clause 8.1: Indemnity",
                        severity: "High",
                        description: "Tenant indemnifies landlord for all damages, even those caused by building structural faults.",
                        recommendation: "Limit indemnity to damages caused by tenant's negligence only."
                    },
                    {
                        clause: "Clause 12: Security Deposit",
                        severity: "Medium",
                        description: "No timeline specified for the refund of the security deposit.",
                        recommendation: "Add a specific timeline (e.g., within 30 days of vacating) for the refund."
                    }
                ]
            });
        } else {
            setResult({
                fileName: file.name,
                isSafe: true,
                score: 92,
                verdict: 'Safe',
                riskLevel: 'Low',
                summary: "This agreement is generally balanced and compliant with standard rental laws. Most clauses are standard, though minor clarifications on maintenance responsibilities could be beneficial.",
                risks: [
                    {
                        clause: "Clause 5: Maintenance",
                        severity: "Low",
                        description: "Vague definition of 'minor repairs' to be borne by tenant.",
                        recommendation: "Define a monetary cap (e.g., repairs under ₹1000) for tenant responsibility."
                    }
                ]
            });
        }
    };

    const onDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="space-y-8 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-teal-700">
                        Dashboard
                    </h1>
                    <p className="text-slate-500">Welcome back, {user?.displayName || 'Guest'}.</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} icon={<Upload className="w-4 h-4" />}>
                    Upload New Agreement
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Upload Area */}
            {!result && !analyzing && (
                <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer
            ${dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="bg-white p-4 rounded-full shadow-sm inline-flex mb-4">
                        <Upload className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Drop your rental agreement here</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        Supports PDF, DOC, DOCX. Our AI will analyze it for safety and hidden clauses instantly.
                    </p>
                </div>
            )}

            {/* Loading State */}
            {analyzing && (
                <Card className="flex flex-col items-center justify-center py-16">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 animate-pulse">
                        {scanStep}
                    </h3>
                    <div className="w-64 h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
                        <div className="h-full bg-blue-500 animate-progress-indeterminate"></div>
                    </div>
                </Card>
            )}

            {/* Analysis Result */}
            {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <Card className={`border-l-4 ${result.isSafe ? 'border-l-emerald-500 shadow-emerald-50' : 'border-l-red-500 shadow-red-50'}`}>
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-100 pb-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-full ${result.isSafe ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} ring-4 ring-white shadow-lg`}>
                                    {result.isSafe ? <CheckCircle className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                        {result.verdict}
                                        <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wide ${result.isSafe ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {result.riskLevel} Severity
                                        </span>
                                    </h2>
                                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Analysis for: <span className="font-medium text-slate-700">{result.fileName}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                                <div className="text-right">
                                    <div className={`text-4xl font-black ${result.score > 80 ? 'text-emerald-600' : result.score > 50 ? 'text-amber-500' : 'text-red-600'}`}>
                                        {result.score}/100
                                    </div>
                                    <div className="text-xs uppercase tracking-wider font-bold text-slate-400">Safety Score</div>
                                </div>
                                <div className="h-10 w-px bg-slate-300"></div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-slate-700">{result.risks.length}</div>
                                    <div className="text-xs uppercase tracking-wider font-bold text-slate-400">Issues Found</div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                                <BadgeInfo className="w-5 h-5 text-blue-500" />
                                Executive Summary
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                {result.summary}
                            </p>
                        </div>

                        {/* Risks List */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Detailed Risk Analysis
                            </h4>
                            <div className="space-y-3">
                                {result.risks.map((risk, idx) => (
                                    <RiskCard
                                        key={idx}
                                        risk={risk}
                                        expanded={expandedRisk === idx}
                                        onToggle={() => setExpandedRisk(expandedRisk === idx ? null : idx)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                            <Button variant="secondary" onClick={() => setResult(null)}>Analyze Another File</Button>
                            <Button className={`${result.isSafe ? 'bg-blue-600' : 'bg-red-600 hover:bg-red-700'}`}>
                                Download PDF Report
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
