import React from 'react';
// @ts-ignore
import { AlertTriangle, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface RiskItem {
    clause: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    recommendation: string;
}

interface RiskCardProps {
    risk: RiskItem;
    expanded: boolean;
    onToggle: () => void;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk, expanded, onToggle }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-700 border-red-200';
            case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'High': return <AlertTriangle className="w-5 h-5" />;
            case 'Medium': return <AlertCircle className="w-5 h-5" />;
            case 'Low': return <AlertCircle className="w-5 h-5" />;
            default: return <CheckCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className={`border rounded-lg transition-all duration-200 overflow-hidden ${expanded ? 'shadow-md border-indigo-200 bg-white' : 'border-slate-200 bg-slate-50 hover:bg-white'}`}>
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full border ${getSeverityColor(risk.severity)}`}>
                        {getSeverityIcon(risk.severity)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">{risk.clause}</h4>
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${risk.severity === 'High' ? 'bg-red-200 text-red-800' :
                                risk.severity === 'Medium' ? 'bg-amber-200 text-amber-800' :
                                    'bg-blue-200 text-blue-800'
                            }`}>
                            {risk.severity} Risk
                        </span>
                    </div>
                </div>
                <div className="text-slate-400">
                    {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2 duration-200">
                    <div className="pl-[3.5rem] space-y-3">
                        <p className="text-slate-600 text-sm leading-relaxed">
                            <span className="font-semibold text-slate-900">Issue:</span> {risk.description}
                        </p>
                        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-md">
                            <p className="text-indigo-800 text-sm font-medium flex gap-2">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Recommendation: {risk.recommendation}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
