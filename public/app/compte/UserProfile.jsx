export default function UserProfile({ nom = "Dupont", prenom = "Jean", email = "jean.dupont@example.com" }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-600">
              {prenom.charAt(0)}
              {nom.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-xl font-medium text-gray-900">
              {prenom} {nom}
            </div>
            <div className="text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {email}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
