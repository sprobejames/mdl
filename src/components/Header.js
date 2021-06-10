export default function Header () {
  return (
    <header className="flex items-center bg-blue-900 justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-4 border-r border-gray-100 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <h2 className="text-white">Template Name</h2>
      </div> 

      <div>
        <button className="py-4 px-6 border-l border-gray-100 text-white flex justify-end">Save</button>
      </div>
    </header>
  )
}
