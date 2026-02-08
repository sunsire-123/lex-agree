import React, { useState } from 'react';
import LegalDocPreview from '../components/LegalDocPreview';
import html2pdf from 'html2pdf.js';

const Generator: React.FC = () => {
    const [formData, setFormData] = useState({
        state: '',
        date: '',
        sellerName: '',
        buyerName: '',
        propertyValue: '',
        apartmentCost: '',
        apartmentName: '',
        panCard: '',
        focusedField: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, focusedField: e.target.name }));
    };

    const handleDownload = () => {
        const element = document.getElementById('legal-document');
        if (element) {
            const opt = {
                margin: [10, 10, 10, 10] as [number, number, number, number],
                filename: 'Rental_Agreement.pdf',
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
            };
            html2pdf().set(opt).from(element).save();
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#d1d5db]">
            <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex justify-between items-center shadow-md z-20">
                <span className="font-bold tracking-tighter text-xl">LexAgree</span>
                <button
                    onClick={handleDownload}
                    className="bg-emerald-600 px-6 py-2 rounded font-bold text-sm hover:bg-emerald-700 shadow-lg border border-emerald-400 z-50 text-white"
                >
                    DOWNLOAD PDF
                </button>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Form Sidebar */}
                <div className="w-[400px] bg-white p-8 overflow-y-auto border-r shadow-xl z-10">
                    <h2 className="text-xl font-bold mb-6 text-slate-800">Agreement Details</h2>
                    <div className="space-y-6">
                        {/* Property Details */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">State/District</label>
                            <input name="state" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Chennai" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Agreement Date</label>
                            <input name="date" type="date" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        {/* Party Details */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Landowner (Seller)</label>
                            <input name="sellerName" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Company/Person Name" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Allottee (Buyer)</label>
                            <input name="buyerName" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Buyer Name" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Buyer PAN</label>
                            <input name="panCard" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ABCDE1234F" />
                        </div>

                        {/* Asset Details */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Apartment Name/No.</label>
                            <input name="apartmentName" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Apartment No. J1005" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Property Value (Rs.)</label>
                            <input name="propertyValue" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Market Value" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sale Cost (Rs.)</label>
                            <input name="apartmentCost" onChange={handleChange} onFocus={handleFocus} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Sale Consideration" />
                        </div>
                    </div>
                </div>

                {/* Document Preview Area */}
                <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-gray-300">
                    <div className="shadow-2xl">
                        <LegalDocPreview data={formData} focusedField={formData.focusedField} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Generator;