"use client"

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M9 13h6" />
            <path d="M12 10v6" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>

        <p className="mb-8 text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Retour à l&apos;accueil
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Page précédente
          </a>
        </div>
      </div>
    </div>
  )
}

export default Error404

