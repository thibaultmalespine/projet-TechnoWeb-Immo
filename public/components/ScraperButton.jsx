"use client"

import { scrap } from "@/lib/api";
import { useState } from "react";


function ScraperButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle the URL submission here
    const response = await scrap(url);

    if (!response.ok) {
      throw new Error("Error during scraping");
    }

    const data = await response.json();
    console.log(data);
    
    setIsOpen(false)
    setUrl("")
  }

  return (
    <div>
      {/* Button that looks like shadcn/ui button */}
      <button
        className="m-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        scrap leboncoin
      </button>

      {/* Dialog that looks like shadcn/ui dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full">
              <div className="flex flex-col space-y-1.5 text-left">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Scraper URL</h3>
                <p className="text-sm text-muted-foreground">Entrez l'URL que vous souhaitez scraper.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="url" className="text-right text-sm font-medium">
                      URL
                    </label>
                    <input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.leboncoin.fr/..."
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Scraper
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScraperButton

