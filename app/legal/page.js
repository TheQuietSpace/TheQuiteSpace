"use client";
import React from 'react';

const LegalPage = () => {
	return (
		<div className="bg-[#FAF8F5] min-h-screen">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-br from-[#C7A961] to-[#b8985a] py-20 lg:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
						Legal Information
					</h1>
					<p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
						Please review our legal policies and responsibilities before registering for any program.
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
				<div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 space-y-12">
					<section>
						<h2 className="text-3xl font-semibold text-gray-900 mb-8 font-serif text-center">Legal Information</h2>
						<p className="text-gray-700 leading-relaxed mb-8">
							At <strong>The Quiet Space Limited</strong>, we are committed to maintaining the highest standards of integrity, transparency, and responsibility in all our programs and services. By registering for any of our retreats, workshops, or teacher training courses, you are entering into a legally binding agreement with us under the terms outlined in our Terms & Conditions and Privacy Policy.
						</p>
						<div className="space-y-8">
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">Compliance & Responsibility</h3>
								<ul className="space-y-2 list-disc pl-6">
									<li className="text-gray-700">All participants are required to provide accurate and truthful information during registration.</li>
									<li className="text-gray-700">By registering, you confirm that you are legally competent to enter into this agreement and comply with the rules and guidelines of our programs.</li>
									<li className="text-gray-700">Participants are responsible for ensuring that they meet any health, visa, or travel requirements necessary to attend our retreats and trainings.</li>
								</ul>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">Liability Disclaimer</h3>
								<ul className="space-y-2 list-disc pl-6">
									<li className="text-gray-700">While our programs are designed to promote wellness, yoga, and holistic living, participation is at your own risk.</li>
									<li className="text-gray-700">The Quiet Space Limited and its facilitators are not liable for any injury, loss, or damages (physical, emotional, or financial) incurred during your participation.</li>
									<li className="text-gray-700">We strongly recommend that participants consult with a qualified healthcare provider before engaging in any retreats, workshop, or wellness activities.</li>
								</ul>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h3>
								<ul className="space-y-2 list-disc pl-6">
									<li className="text-gray-700">All course materials, manuals, and online resources provided by The Quiet Space Limited are protected by copyright.</li>
									<li className="text-gray-700">These may not be copied, reproduced, distributed, or used for commercial purposes without prior written consent.</li>
								</ul>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">Jurisdiction</h3>
								<p className="text-gray-700">
									This agreement is governed by the laws of Mauritius. Any disputes arising from the use of our services or participation in our programs will be subject to the exclusive jurisdiction of the courts in Mauritius.
								</p>
							</div>
						</div>
					</section>
					{/* Last Updated */}
					<div className="text-center pt-8 border-t border-gray-200">
						<p className="text-gray-500 text-sm">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LegalPage;
