import { useState, type FormEvent } from 'react'
import { SierraMark } from '../components/illustrations/SierraMark'
import { useSesionAdmin } from './useSesionAdmin'

export function Login({ onIngresar }: { onIngresar: () => void }) {
  const { ingresar, PIN_DEMO } = useSesionAdmin()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (ingresar(pin)) {
      onIngresar()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-piedra-100 px-4 py-12">
      <div className="w-full max-w-sm border-2 border-tinta-900 bg-piedra-50 p-7 shadow-[6px_6px_0_var(--color-tinta-900)]">
        <div className="flex items-center gap-2.5">
          <SierraMark className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-display text-lg text-sierra-800">Piedra Serrana</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-piedra-700">Panel del dueño</p>
          </div>
        </div>

        <h1 className="mt-6 font-display text-2xl text-tinta-900">Ingresá tu PIN</h1>
        <p className="mt-1 text-sm text-tinta-700/80">
          Acceso privado para administrar propiedades y datos del negocio.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="pin" className="text-sm font-medium text-tinta-800">
            PIN de 4 dígitos
          </label>
          <input
            id="pin"
            inputMode="numeric"
            autoFocus
            maxLength={4}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ''))
              setError(false)
            }}
            className="foco-visible mt-1.5 w-full border-2 border-piedra-300 bg-white px-3 py-3 text-center text-2xl tracking-[0.5em] text-tinta-900"
            placeholder="••••"
          />
          {error && (
            <p role="alert" className="mt-2 text-sm font-semibold text-brasa-600">
              PIN incorrecto. Probá de nuevo.
            </p>
          )}
          <button
            type="submit"
            className="foco-visible mt-5 min-h-[44px] w-full bg-sierra-700 py-3 text-sm font-semibold text-piedra-50 transition-colors hover:bg-sierra-600"
          >
            Entrar al panel
          </button>
        </form>

        <p className="mt-5 border-t border-dashed border-piedra-300 pt-4 text-xs text-tinta-700/70">
          PIN de demostración: <strong className="font-mono text-tinta-900">{PIN_DEMO}</strong>. En un
          sitio real el acceso sería con tu cuenta de Google (si los datos viven en una planilla) o con
          un usuario y contraseña propios (por ejemplo con Supabase), no con este PIN fijo.
        </p>
        <p className="mt-3 text-center text-xs">
          <a href="#/" className="foco-visible font-semibold text-sierra-700 underline underline-offset-4">
            Volver al sitio
          </a>
        </p>
      </div>
    </div>
  )
}
