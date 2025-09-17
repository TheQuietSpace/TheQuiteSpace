import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white py-12 px-4 lg:px-8" style={{backgroundColor: '#C8A961'}}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          
          {/* Left Side - Contact and Social */}
          <div className="flex-shrink-0 space-y-6">
            {/* Logo */}
            <div className="text-lg font-semibold">
              Logo
            </div>
            
            {/* Contact Us */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div>Wisconsin Ave, Suite 700</div>
                    <div>Chevy Chase, Maryland 20815</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span>abc@figma.com</span>
                </div>
              </div>
            </div>
            
            {/* Follow Us */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Follow us</h4>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Newsletter */}
          <div className="flex-1 max-w-lg">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Get Still, Stay Connected
              </h3>
              <p className="text-sm lg:text-base opacity-90 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris,nec turpis orci lectus maecenas. Suspendisses sed magna eget nibh inturpis.
              </p>
              
              {/* Email Signup */}
              <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 px-4 lg:px-6 py-3 text-sm lg:text-base text-gray-800 outline-none placeholder-gray-500"
                />
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 lg:px-8 py-3 text-sm lg:text-base font-semibold transition-colors duration-200">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
            <a href="/privacy" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Terms of Use
            </a>
            <a href="/legal" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Legal
            </a>
            <a href="/sitemap" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;