export default function SignInForm() {
  return (
  <div className="flex flex-col mt-3 gap-2">
    <h4 className="font-semibold mt-2">
        first Name
    </h4>
    <input type="text" 
    placeholder="firstName" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    <h4 className="font-semibold mt-2">
        last Name
    </h4>
    <input type="text" 
    placeholder="lastName" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    
    <h4 className="font-semibold mt-2">
        Email
    </h4>
    <input type="email" 
    placeholder="you@example.com" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    <h4 className="font-semibold mt-2">
        Password
    </h4>
    <input type="password" 
    placeholder="Your password"
    className="bg-white p-2 rounded-lg focus:border-none focus:border-amber-800 focus:ring-1"/>
    <button className="bg-amber-600 cursor-pointer text-white p-2 rounded-lg mt-3 w-full hover:bg-amber-500">
        create account
    </button>
    
  </div>)
}