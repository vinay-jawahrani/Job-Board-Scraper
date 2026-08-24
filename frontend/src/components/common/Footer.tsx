export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Job Board Scraper. All rights reserved.</p>
          <p className="mt-1">Built with React, TypeScript, and FastAPI</p>
        </div>
      </div>
    </footer>
  )
}