"use client";
import React, { useState } from 'react';

const faqData = [
	{
		section: "General retreat information",
		items: [
			{
				question: "Who can attend a retreat ?",
				answer: "Our retreats are open to adults of all backgrounds. We welcome everyone who is interested in yoga, wellness, and personal growth.",
			},
			{
				question: "Do I need a prior Yoga / meditation experience ?",
				answer: "No prior experience is required. Our programs are designed for all levels, from complete beginners to advanced practitioners.",
			},
			{
				question: "How many participants are there?",
				answer: "Retreats typically attract a wide range of adults, usually from 30 to 60 participants, depending on the program and location.",
			},
			{
				question: "Who can attend a retreat",
				answer: "Anyone interested in yoga, wellness, and self-discovery is welcome to join our retreats.",
			},
		],
	},
	{
		section: "Accommodation & Meals",
		items: [
			{
				question: "What's included in the retreat price?",
				answer: "The price includes lodging, all meals, daily yoga sessions, guided meditation, and specific workshops or excursions as listed in the program.",
			},
			{
				question: "Are meals vegetarian/vegan?",
				answer: "Yes, we offer nourishing vegetarian and vegan meals to support your wellness journey.",
			},
			{
				question: "Can I request a private room?",
				answer: "Private rooms are available for an additional fee, subject to availability. Please check the booking page for options.",
			},
		],
	},
	{
		section: "Travel & Logistics",
		items: [
			{
				question: "How do I get to the retreat location?",
				answer: "You are responsible for arranging your own travel. The nearest airport is [Airport Name]. We can assist with airport transfers for an additional fee.",
			},
			{
				question: "Is airport pickup available?",
				answer: "Yes, airport pickup can be arranged for an additional fee. Please contact us in advance to schedule your transfer.",
			},
			{
				question: "What should I bring with me?",
				answer: "We recommend bringing comfortable clothing, a yoga mat, water bottle, and any personal items you may need. A detailed packing list will be provided after registration.",
			},
		],
	},
	{
		section: "Booking & Payment",
		items: [
			{
				question: "What is the cancellation policy?",
				answer: "Cancellations made 30 days before the retreat start date will receive a full refund minus a processing fee. Please see our terms for details.",
			},
			{
				question: "Do you offer payment plans?",
				answer: "Yes, we offer a two-part payment plan. A 50% deposit is required at booking, with the balance due 60 days before the retreat.",
			},
			{
				question: "How far in advance should I book?",
				answer: "We recommend booking as early as possible to secure your spot, ideally 2-3 months in advance.",
			},
		],
	},
];


const tabList = [
	{ label: "General", sectionIdx: 0 },
	{ label: "Accomodation and meal", sectionIdx: 1 },
	{ label: "Travel and logistics", sectionIdx: 2 },
	{ label: "Booking and payment", sectionIdx: 3 },
];

const FAQPage = () => {
	const [open, setOpen] = useState({});
	const [activeTab, setActiveTab] = useState(0);

	const handleToggle = (itemIdx) => {
		setOpen((prev) => ({
			...prev,
			[`${activeTab}-${itemIdx}`]: !prev[`${activeTab}-${itemIdx}`],
		}));
	};

	return (
		<div className="bg-[#faf8f5] min-h-screen pb-16">
			{/* Hero Section */}
			<div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-200">
				<img src="/full-shot-women-meditating-nature.jpg" alt="Retreat group" className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: 1 }} />
				<div className="absolute inset-0 bg-black/30" style={{ zIndex: 2 }} />
						<div className="relative z-10 text-center w-full">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 mt-8">Have any question ?</h1>
							<p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">Find everything you need to know about our retreats, workshops, and community.</p>
						</div>
			</div>

			{/* Tabs */}
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
				<div className="flex space-x-6 border-b border-gray-100 mb-8">
					{tabList.map((tab, idx) => (
						<button
							key={tab.label}
							className={`pb-2 text-base font-medium focus:outline-none ${activeTab === tab.sectionIdx ? 'text-[#c8a961] border-b-2 border-[#c8a961]' : 'text-gray-700'}`}
							onClick={() => { setActiveTab(tab.sectionIdx); setOpen({}); }}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Section Content */}
				<div className="bg-[#f7f5f2] rounded-md p-6">
					<h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">{faqData[activeTab].section}</h2>
					<div className="divide-y divide-gray-200">
						{faqData[activeTab].items.map((item, itemIdx) => (
							<div key={item.question}>
								<button
									className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
									onClick={() => handleToggle(itemIdx)}
								>
									<span className="text-base sm:text-lg text-gray-800">{item.question}</span>
									<span className="ml-2 text-gray-400">{open[`${activeTab}-${itemIdx}`] ? '▾' : '▸'}</span>
								</button>
								{open[`${activeTab}-${itemIdx}`] && (
									<div className="py-3 px-2 text-gray-700 text-base sm:text-lg bg-gray-50 rounded-b">
										{item.answer}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FAQPage;
