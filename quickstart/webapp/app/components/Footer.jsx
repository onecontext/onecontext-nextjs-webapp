const navigation = {
  support: [
    { name: 'Documentation', href: 'https://docs.onecontext.ai' },
  ],
  company: [
    { name: 'About', href: 'https://docs.onecontext.ai' },
  ],
  legal: [
    { name: 'Privacy', href: '/opp.pdf' },
  ],
  address: [
    { name: '2261 Market Street, #5626, San Francisco, CA 94114, United States.', href: 'https://maps.app.goo.gl/Ts7ETKmkymBtk4jJ7'},
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/OneContextApp',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/onecontext/ts_sdk',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="z-50 bg-ddark-500" aria-labelledby="footer-heading">
      <div className="z-50 mx-auto max-w-7xl pb-8 px-8 sm:px-2 lg:px-8 md:px-8 xl:px-8 lg:pt-8">
        <div className="grid grid-cols-10 xl:gap-8">
            <div className="col-span-10 xs:col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-6 xl:col-span-6 xs:mt-3 sm:mt-4 text-center sm:text-center md:text-center lg:text-left xl:text-left">
            <p className="justify-center flex flex-items text-sm pt-2 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0 leading-6 text-slate-100 xs:justify-center xs:flex xs:flex-items sm:justify-center sm:flex sm:flex-items md:justify-center md:flex md:flex-items lg:justify-start xl:justify-start">
              {`Compose, Deploy, and Evaluate RAG Pipelines, Blazingly Fast.`}
            </p>
            <div className="flex space-x-2 mt-4 justify-center sm:justify-center md:justify-center lg:justify-start xl:justify-start">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-200 hover:text-gray-100">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-10 mt-2 xs:mt-4 sm:mt-4 md:mt-4 lg:grid lg:gap-2 lg:grid-cols-4 xl:grid xl:gap-2 xl:grid-cols-4 xs:col-span-10 sm:col-span-10 md:col-span-10  xl:mt-0 text-center sm:text-center md:text-center lg:text-left xl:text-left">
            <div className="col-span-10 xs:col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-1 xl:col-span-1 xs:mt-3 sm:mt-4">
            <div className="text-sm text-slate-100 mt-4 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-1 xl:mt-1">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-1 xs:mt-1 sm:mt-1 md:mt-1 space-y-4 xs:space-y-1 sm:space-y-1 md:space-y-1">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
            </div>
            <div className="col-span-10 xs:col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-1 xl:col-span-1 xs:mt-3 sm:mt-4">
            <div className="text-sm text-slate-100 mt-4 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-1 xl:mt-1">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-1 xs:mt-1 sm:mt-1 md:mt-1 space-y-4 xs:space-y-1 sm:space-y-1 md:space-y-1">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            <div className="col-span-10 xs:col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-1 xl:col-span-1 xs:mt-3 sm:mt-4">
            <div className="text-sm text-slate-100 mt-4 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-1 xl:mt-1">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-1 xs:mt-1 sm:mt-1 md:mt-1 space-y-4 xs:space-y-1 sm:space-y-1 md:space-y-1">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
            </div>
            <div className="col-span-10 xs:col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-1 xl:col-span-1 xs:mt-3 sm:mt-4">
            <div className="text-sm text-slate-100 mt-4 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-1 xl:mt-1">
                <h3 className="text-sm font-semibold leading-6 text-white">Location</h3>
                <ul role="list" className="mt-1 xs:mt-1 sm:mt-1 md:mt-1 space-y-4 xs:space-y-1 sm:space-y-1 md:space-y-1">
              {navigation.address.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-200 hover:text-gray-100">
                  <span className="text-sm text-gray-300 hover:text-white">{item.name}</span>
                </a>
              ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 sm:mt-12 lg:mt-12 text-center sm:text-center md:text-center lg:text-left xl:text-left">
          <p className="text-xs leading-5 text-gray-200">&copy; 2024 OneContext, Inc. trading as OneContext. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

