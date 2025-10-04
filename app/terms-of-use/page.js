"use client";
import React from 'react';

const TermsOfUsePage = () => {
	// Add a memoized formatted date to avoid raw quotes inside JSX
	const formattedDate = React.useMemo(
		() =>
			new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		[]
	);

	return (
		<div className="bg-[#FAF8F5] min-h-screen">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-br from-[#C7A961] to-[#b8985a] py-20 lg:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
						Terms of Use
					</h1>
					<p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
						Please read our terms and conditions carefully before using our website or registering for our programs.
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
				<div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 space-y-12">
					<section>
						<h2 className="text-4xl font-semibold text-gray-900 mb-8 font-serif text-center">Terms of Use</h2>
						<div className="space-y-8">
							<div>
								<p className="text-gray-700 leading-relaxed">
									These Terms and Conditions constitute a legally binding agreement between you (&quot;you&quot;) and The Quiet Space Limited (&quot;We&quot; or &quot;Us&quot;) for your registration to participate in our wellness retreats, workshops, or any related services. By accessing our website <strong>www.thequietspace.org</strong> (&quot;Site&quot;) or providing personal information through this Site, you agree to the collection, storage, use, and disclosure of your information as outlined in our Privacy Policy.
								</p>
							</div>

							{/* Personal Information */}
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Personal Information</h3>
								<p className="text-gray-700 leading-relaxed mb-4">
									&quot;Personal Information&quot; includes any data that can identify you, such as your name, email address, telephone number, shipping/billing address, credit card information, or any other relevant details. We collect personal information voluntarily provided by individuals seeking our services and ensure it remains confidential and protected from unauthorised access.
								</p>
								<p className="text-gray-700">
									Before registering, please ensure all provided information is accurate, up-to-date, and complete. By registering or using our website, you confirm that you have read, understood, and agreed to these Terms and Conditions.
								</p>
							</div>

							{/* Use and Retention */}
							<div>
												<h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Use and Retention of Personal Information</h3>
												<p className="text-gray-700 leading-relaxed mb-4">The personal information you provide will be used to:</p>
												<div className="space-y-2">
													{["Respond to your inquiries or requests","Complete transactions and registration processes","Maintain and improve website functionality","Enhance your experience with The Quiet Space Limited","Communicate regarding registration, payments, certification","Verify identity and account details","Conduct research, analysis, and program development"].map((item, index) => (
														<div key={index} className="flex items-start space-x-2">
															<div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
															<p className="text-gray-700">{item}</p>
														</div>
													))}
												</div>
							</div>

							{/* Registration Policies */}
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">3. User Registration Policies</h3>
								<div className="space-y-4">
									<p className="text-gray-700"><strong>a)</strong> The Quiet Space Limited programs are open to individuals 18 years or older. Participants under 18 must provide consent from a parent or legal guardian.</p>
									<p className="text-gray-700"><strong>b)</strong> Registration requires complete and accurate details as requested on the registration form.</p>
									<p className="text-gray-700"><strong>c)</strong> Your registration is complete only after receiving a confirmation email.</p>
									<p className="text-gray-700"><strong>d)</strong> Program participation is subject to availability.</p>
								</div>
							</div>

							{/* Payment Policies */}
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Policies</h3>
								<div className="space-y-4">
									<p className="text-gray-700 leading-relaxed">
										Payment for wellness programs must be made in <strong>Mauritian Rupees</strong> before the start of the program. Only digital transactions are accepted. Cash payments are not accepted.
									</p>
									<div>
										<h4 className="font-semibold text-gray-900 mb-3">Accepted Payment Methods:</h4>
										<div className="space-y-2">
											{["Debit cards","Credit cards","Mobile payment options","Electronic bank transfers"].map((method, index) => (
												<div key={index} className="flex items-start space-x-2">
													<div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
													<p className="text-gray-700">{method}</p>
												</div>
											))}
										</div>
									</div>
                                    <div className="space-y-4">
									<p className="text-gray-700 leading-relaxed">
										If registration requirements are not met, <strong>we reserve the right to cancel your registration</strong>, and refunds will be processed according to our <strong>Cancellation & Refund Policy</strong>.
									</p>
									</div>
								</div>
							</div>
                            {/*Amendments */}
							<div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Amendments</h3>
								<div className="space-y-4">
									<p className="text-gray-700 leading-relaxed">
										We may update these Terms and Conditions at any time. Continued use of the Site or participation in our programs constitutes your acceptance of any changes.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Last Updated */}
					<div className="text-center pt-8 border-t border-gray-200">
						<p className="text-gray-500 text-sm">
							Last updated: {formattedDate}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermsOfUsePage;
