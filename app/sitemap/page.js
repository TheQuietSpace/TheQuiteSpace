"use client";
import React from 'react';
import Link from 'next/link';

const sitemapData = [
	{
		title: "Retreats",
		links: [
			{ label: "Upcoming Retreats", href: "/retreat" },
			{ label: "Retreat Details", href: "/retreat" },
			{ label: "Membership", href: "/membership" },
			{ label: "Instructors", href: "/instructors" },
			{ label: "Contact Retreat Team", href: "/contact" },
		],
	},
	{
		title: "Learning & Blogs",
		links: [
			{ label: "Workshops", href: "/workshop" },
			{ label: "Learning Resources", href: "/learning" },
			{ label: "Latest Blogs", href: "/learning#latest-blogs" },
			{ label: "Featured Articles", href: "/learning#featured-articles" },
		],
	},
	{
		title: "Support",
		links: [
			{ label: "FAQs", href: "/faq" },
			{ label: "Privacy Policy", href: "/privacy-policy" },
			{ label: "Terms of Use", href: "/terms-of-use" },
			{ label: "Contact Us", href: "/contact" },
		],
	},
	{
		title: "Account",
		links: [
			{ label: "Sign In / Register", href: "/auth" },
			{ label: "Manage Membership", href: "/membership" },
			{ label: "Profile Settings", href: "/account" },
		],
	},
];

const SitemapPage = () => {
	return (
			<div className="bg-[#faf8f5] min-h-screen py-16 flex items-center justify-center">
				<div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Sitemap</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-center">
						{sitemapData.map((section, idx) => (
							<div key={section.title} className="flex flex-col items-center">
								<h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{section.title}</h2>
								<ul className="space-y-4">
									{section.links.map((link) => (
										<li key={link.label} className="text-center">
											<Link href={link.href} className="text-[#c8a961] hover:underline text-lg">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
	);
};

export default SitemapPage;
