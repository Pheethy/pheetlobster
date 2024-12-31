export default function Signin() {
  return (
    <>
      <div className="h-screen w-screen bg-surface">
        <div className="container flex justify-center items-center mx-auto w-full min-h-full">
          <form className="flex flex-col justify-center items-center bg-black rounded-lg gap-y-4 p-4">
            <h2>SignIn</h2>
            <div className="flex flex-col gap-y-2 pl-2">
              <label className="text-sm font-thin">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Type your email..."
                className="w-96 bg-black text-white py-3 text-sm focus:outline-none rounded-lg"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password...."
                className="w-96 bg-black text-white py-3 pl-2 text-sm focus:outline-none rounded-lg"
              />
            </div>
            <div>
              <button className="bg-purple_dark_mode hover:bg-blue_dark_mode text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Sign In
              </button>
            </div>
            <div>
              <button className="bg-purple_dark_mode hover:bg-blue_dark_mode text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
