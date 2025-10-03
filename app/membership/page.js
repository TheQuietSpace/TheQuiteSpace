import MembershipForm from "../components/membershipform";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="relative h-[55vh] sm:h-[70vh] lg:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-100 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('/Desktop - 29(1).png')`,
            }}
          />
          <div className="absolute inset-0" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl text-center font-semibold mb-4">
            Membership Sign-Up Form
          </h2>
        </div>
        <MembershipForm />
        <h2 className="text-3xl mx-auto max-w-4xl mt-8 md:mt-16 text-center font-semibold mb-4">
          Join Our Yoga Membership
        </h2>
        {/* Membership details copied from provided image */}
        <div className="max-w-5xl mx-auto px-4 prose prose-lg">
          <p>
            Discover the power of consistent practice, guided by expert teachers in a supportive community. With our flexible Yoga Membership, you can attend up to 4 classes per week—choosing the times and styles that fit your lifestyle.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Why Become a Member?</h3>
          <ol className="list-decimal ml-6 space-y-2 mt-3 marker:text-[#c1a050]">
            <li><strong>Flexibility:</strong> Choose any 4 classes per week, mix and match styles, and attend at times that work best for you.</li>
            <li><strong>Consistency:</strong> A regular rhythm of practice that supports both your body and mind.</li>
            <li><strong>Variety:</strong> Explore Hatha, Vinyasa Flow, Kundalini, Yin, Restorative, Meditation, and more.</li>
            <li><strong>Community:</strong> Practice in a safe, inspiring space with like-minded seekers.</li>
          </ol>

          <h3 className="mt-8 text-xl font-semibold">Membership benefit</h3>
          <ol className="list-decimal ml-6 space-y-2 mt-3 marker:text-[#c1a050]">
            <li><strong>Personalized Guidance</strong> – Our teachers ensure your practice aligns with your body’s needs.</li>
            <li><strong>Holistic Wellbeing</strong> – Improve flexibility, strength, breath, focus, and emotional balance.</li>
            <li><strong>Stress Relief</strong> – Learn practical techniques for relaxation and inner calm.</li>
            <li><strong>Spiritual Growth</strong> – Deepen your self-awareness through meditation, pranayama, and philosophy.</li>
            <li><strong>Flexibility of Choice</strong> – Select classes based on energy levels—active one day, restorative the next.</li>
            <li><strong>Affordable Wellness</strong> – Multiple classes at one simple membership fee.</li>
          </ol>

          <h3 className="mt-8 text-xl font-semibold">What You Take Home</h3>
          <ul className="list-disc ml-6 space-y-2 mt-3 marker:text-[#c1a050]">
            <li>A stronger, healthier body</li>
            <li>A calmer, clearer mind</li>
            <li>Tools to manage stress in daily life</li>
            <li>A deeper connection to your breath and inner self</li>
            <li>A supportive yoga community that grows with you</li>
            <li>Confidence to carry yoga practice into your home and life</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold">Membership Plans</h3>
          <p className="mt-3">Choose the option that works for you:</p>
          <ul className="ml-6 mt-3 space-y-2 marker:text-[#c1a050]">
            <li><strong>Monthly Membership</strong> – Best for starting your journey</li>
            <li><strong>Quarterly Membership</strong> – Stay committed and save</li>
            <li><strong>Half-Yearly Membership</strong> – Build lasting change</li>
            <li><strong>Yearly Membership</strong> – Transform your lifestyle with consistency</li>
          </ul>
        </div>

        {/* Continuation: How It Works & CTA (from image) */}
        <div className="max-w-5xl mx-auto px-4 mt-10 prose prose-lg">
          <h3 className="text-xl font-semibold mt-6">How It Works</h3>
          <ul className="ml-6 mt-3 space-y-2 marker:text-[#c1a050]">
            <li><strong>Sign up online</strong> through our secure form</li>
            <li><strong>Choose your 4 classes/week</strong> from our schedule (in-studio, online, or hybrid)</li>
            <li><strong>Show up, practice, transform</strong></li>
            <li><strong>Take your practice home</strong> with simple techniques and resources we share</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8">Ready to Begin?</h3>
          <p className="ml-6 mt-3 space-y-2 marker:text-[#c1a050]">Invest in your health, your peace, and your spirit.</p>
          <p className="ml-6 mt-3 space-y-2 marker:text-[#c1a050]">Click below to sign up and step onto the mat with us.</p>
          <div className="flex mt-8 md:mt-16 justify-center mb-12">
            <a href=""
               className="w-full rounded-md bg-[#c1a050] text-center py-2 text-lg text-white transition-colors hover:bg-[#a88d42]">
              Become A Member Today
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
