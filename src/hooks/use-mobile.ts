import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialiser à undefined pour éviter les problèmes d'hydratation
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Fonction pour vérifier si on est en mobile
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT

    // Media query pour écouter les changements
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Fonction de callback pour les changements
    const onChange = () => {
      setIsMobile(checkIsMobile())
    }

    // Initialiser la valeur immédiatement
    setIsMobile(checkIsMobile())

    // Écouter les changements de viewport
    mql.addEventListener("change", onChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Retourner undefined pendant le SSR, puis la vraie valeur après l'hydratation
  return isMobile
}
